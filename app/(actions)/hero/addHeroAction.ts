"use server";

import { rateLimit } from "@/lib/rate-limit";
import { createClient } from "@/lib/supabase/server";
import {
  AddHeroActionInput,
  heroSlideCreateSchema,
} from "@/schemas/heroSlideSchema";
import { ActionResponse } from "@/types/ActionResponseType";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function addHeroAction(
  formData: AddHeroActionInput,
): Promise<ActionResponse> {
  const headerList = await headers();
  const ip = headerList.get("x-forwarded-for") || "unknow";

  const { isRateLimited } = rateLimit.check(5, ip);

  if (isRateLimited) {
    return {
      success: false,
      error: "Too many requests. Please try again in a minute.",
    };
  }

  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { success: false, error: "Unauthorized access" };
  }

  const result = heroSlideCreateSchema.safeParse(formData);

  if (!result.success) {
    const errorMessage = result.error.issues.map((e) => e.message).join(", ");
    return { success: false, error: `Validation failed: ${errorMessage}` };
  }

  const { error: dbError } = await supabase
    .from("hero_slides")
    .insert(result.data);

  if (dbError) {
    console.error("Database Insert Error:", dbError);
    return { success: false, error: dbError.message };
  }
  revalidatePath("/admin/hero");

  return { success: true };
}
