"use client";
import { Button } from "@/components/ui/button";
import { ProductSchema } from "@/schemas/productSchema";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z, { file } from "zod";
import StepBasicInfo from "./steps/StepBasicInfo";
import { Form } from "@/components/ui/form";
import StepAttributes from "./steps/StepAttributes/StepAttributes";
import StepImages from "./steps/StepImages";
import { ImageFile } from "@/types/ImageFileType";
import { createClient } from "@/lib/supabase/client";
import { addProductAction } from "@/app/(actions)/product/addProductAction";

export type FurnitureFormInput = z.input<typeof ProductSchema>;
export type FurnitureValues = z.infer<typeof ProductSchema>;

export default function FurnitureAddForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const step = Number(searchParams.get("step") ?? 1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [capturedImages, setCapturedImages] = useState<ImageFile[]>([]);
  const [coverImage, setCoverImage] = useState<string>("");
  const form = useForm<FurnitureFormInput>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      price: 0,
      discount_rate: 0,
      categorySlug: "",
      type_slug: "",
      is_active: true,
      attributes: [],
      images: [],
    },
  });

  const setStep = (newStep: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("step", newStep.toString());
    router.push(`?${params.toString()}`);
  };

  const onSubmit = async (values: FurnitureValues) => {
    const validationResult = ProductSchema.safeParse(values);
    if (!validationResult.success) {
      console.log("Zod Validation Errors:", validationResult.error.format());
      toast.error("Please check the form for errors.");
      return;
    }

    const cleanValues = validationResult.data;
    const successfulUploads: string[] = [];

    try {
      setIsSubmitting(true);

      const supabase = await createClient();

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError || !user) {
        throw new Error("Session not found, please log in again.");
      }

      const uploadPromises = capturedImages.map(async (imgObj) => {
        const fileExt = imgObj.file.name.split(".").pop();
        const fileName = `${crypto.randomUUID()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("products")
          .upload(filePath, imgObj.file);

        if (uploadError) {
          console.error(`Upload failed for ${imgObj.file.name}:`, uploadError);
          throw new Error(`Failed to upload: ${imgObj.file.name}`);
        }

        successfulUploads.push(filePath);

        const {
          data: { publicUrl },
        } = supabase.storage.from("products").getPublicUrl(filePath);
        return publicUrl;
      });

      const uploadedUrls = await Promise.all(uploadPromises);

      // 2. Preview URL'lerini Public URL'lerle eşleştir (Harita oluştur)
      // 2. Match Preview URLs with Public URLs (Create Map)
      const previewToPublicMap = capturedImages.reduce(
        (acc, imgObj, index) => {
          acc[imgObj.preview] = uploadedUrls[index];
          return acc;
        },
        {} as Record<string, string>,
      );

      // 3. Kapak fotoğrafını güvenli bir şekilde bul
      // 3. Securely locate the cover photo

      let finalCoverImageUrl = "";
      if (coverImage) {
        // Eğer coverImage bir blob (yeni yüklenen) ise haritadan bul
        // If coverImage is a blob (newly uploaded), find it on the map.
        finalCoverImageUrl = previewToPublicMap[coverImage] || coverImage;
      }

      // 4. Diziyi oluştur (Kapak en başa, diğerleri arkaya)
      // 4. Create the array (Cover first, others last)
      const finalImageUrls = [
        finalCoverImageUrl,
        ...uploadedUrls.filter((url) => url !== finalCoverImageUrl),
      ].filter(Boolean); // Boş olanları (null/undefined) temizle // Remove empty (null/undefined) entries

      const dataForDb = {
        ...cleanValues,
        images: finalImageUrls.map((url) => ({
          url: url,
          alt: cleanValues.title,
        })),
      };

      const result = await addProductAction(dataForDb);

      if (!result.success) {
        throw new Error(result.error);
      }

      router.push("/admin/furnitures?message=ProductCreated");
    } catch (error: any) {
      console.error("Submit Error ", error);

      if (successfulUploads.length > 0) {
        const supabase = await createClient();
        await supabase.storage.from("products").remove(successfulUploads);

        console.log("Cleanup complete: Orphaned files removed");
      }
      toast.error(error.message || "An error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = async () => {
    const stepFields: Record<number, Array<keyof FurnitureFormInput>> = {
      1: [
        "title",
        "description",
        "price",
        "discount_rate",
        "categorySlug",
        "type_slug",
        "is_active",
      ],
      2: ["attributes"],
      3: ["images"],
    };

    const isValid = await form.trigger(stepFields[step]);
    if (!isValid) return;

    if (step < 3) {
      setStep(step + 1);
    } else {
      // Final Zod check before calling onSubmit
      // onSubmit'i çağırmadan önce son Zod kontrolü
      const values = form.getValues() as FurnitureValues;
      await onSubmit(values);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto p-6 mb-12">
      <div className="flex items-center gap-2 mb-4">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`h-2 flex-1 rounded-full ${
              s <= step ? "bg-primary" : "bg-muted"
            }`}
          />
        ))}
      </div>

      <Form {...form}>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          {step === 1 && <StepBasicInfo form={form} />}
          {step === 2 && <StepAttributes form={form} />}
          {step === 3 && (
            <StepImages
              form={form}
              onImagesChange={setCapturedImages}
              coverImage={coverImage}
              onSetCover={setCoverImage}
            />
          )}

          <div className="flex justify-between pt-6 border-t ">
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep(step - 1)}
              disabled={step === 1 || isSubmitting}
            >
              Previous
            </Button>
            <Button type="button" onClick={handleNext} disabled={isSubmitting}>
              <div className="flex items-center justify-center">
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                <span>{step === 3 ? "Complete and Publish" : "Next Step"}</span>
              </div>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
