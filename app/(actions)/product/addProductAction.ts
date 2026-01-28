"use server";

import { FurnitureFormInput } from "@/app/(admin)/admin/furnitures/add/_components/FurnitureAddForm";
import { rateLimit } from "@/lib/rate-limit";
import { createClient } from "@/lib/supabase/server";
import { ProductSchema } from "@/schemas/productSchema";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import slugify from "slugify";
interface ActionResponse {
  success: boolean;
  error?: string;
}

export async function addProductAction(
  formData: FurnitureFormInput,
): Promise<ActionResponse> {
  // Get IP address / IP adresini al
  const headerList = await headers();
  const ip = headerList.get("x-forwarded-for") || "unknow";

  // Check rate limit / İstek sınırını kontrol et
  const { isRateLimited } = rateLimit.check(5, ip);
  if (isRateLimited) {
    return {
      success: false,
      error: "Too many requests. Please try again in a minute.",
    };
  }

  const supabase = await createClient();

  // Re-verify auth on server side / Sunucu tarafında yetkiyi tekrar doğrula

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError || !user) {
    return { success: false, error: "Unauthorized access" };
  }

  // 1. Server-side validation with Zod (Returns clean PropertyValues)
  // 1. Zod ile sunucu tarafı doğrulaması (Temizlenmiş PropertyValues döner)

  const result = ProductSchema.safeParse(formData);
  if (!result.success) {
    // Format Zod errors into a readable string
    // Zod hatalarını okunabilir bir metne dönüştür
    const errorMessage = result.error.issues.map((e) => e.message).join(", ");
    return { success: false, error: `Validation failed: ${errorMessage}` };
  }

  // Slug oluşturma
  const generatedSlug = slugify(result.data.title, {
    lower: true,
    strict: true,
    locale: "tr",
  });

  // 2. Insert validated data into Supabase
  // 2. Doğrulanmış veriyi Supabase'e ekle
  const { error: dbError } = await supabase.from("products").insert({
    title: result.data.title,
    description: result.data.description,
    price: result.data.price,
    slug: generatedSlug,
    user_id: user.id,

    // SOL TARAF: Veritabanı sütun ismi (snake_case)
    // SAĞ TARAF: Zod/Form verisi (camelCase)
    discount_rate: result.data.discountRate,
    category_slug: result.data.categorySlug,
    type_slug: result.data.typeSlug,
    is_active: result.data.isActive,

    attributes: result.data.attributes,
    images: result.data.images,
  });

  if (dbError) {
    console.error("Database Insert Error:", dbError);
    return { success: false, error: dbError.message };
  }
  revalidatePath("/admin/furnitures");

  return { success: true };
}
