"use client";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import {
  HeroSlideFormInput,
  heroSlideFormSchema,
} from "@/schemas/heroSlideSchema";
import { HeroImage } from "@/types/HeroFileType";
import { ImageFile } from "@/types/ImageFileType";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { Form, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function AddHeroForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const step = Number(searchParams.get("step") ?? 1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [capturedImage, setCapturedImage] = useState<HeroImage | null>(null);

  const form = useForm<HeroSlideFormInput>({
    resolver: zodResolver(heroSlideFormSchema),
    defaultValues: {
      title: "",
      subtitle: "",
      target_url: "",
      order_index: 1,
      is_active: true,
      image: undefined,
    },
  });

  const setStep = (newStep: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("step", newStep.toString());
    router.push(`?${params.toString()}`);
  };

  const onSubmit = async (values: HeroSlideFormInput) => {
    const validationResult = heroSlideFormSchema.safeParse(values);
    if (!validationResult.success) {
      console.log("Zod Validation Errors:", validationResult.error.format());
      toast.error("Please check the form for errors.");
      return;
    }

    const cleanValue = validationResult.data;

    const successfulUploads: string[] = [];

    try {
      setIsSubmitting(true);
      const supabase = await createClient();
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError || !user) {
        throw new Error("Session not found,please log in again");
      }

      if (!capturedImage) {
        toast.error("Please upload an image.");
        return;
      }

      const fileExt = capturedImage?.file.name.split(".").pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("hero-images")
        .upload(filePath, capturedImage.file);

      if (uploadError) {
        console.error(
          `Upload failed for ${capturedImage.file.name}:`,
          uploadError,
        );
        throw new Error(`Failed to upload:${capturedImage.file.name}`);
      }

      successfulUploads.push(filePath);

      const {
        data: { publicUrl },
      } = supabase.storage.from("hero-images").getPublicUrl(filePath);

      const imageUrl = publicUrl;

      const dataForDB = {
        title: cleanValue.title,
        subtitle: cleanValue.subtitle || null,
        target_url: cleanValue.target_url || null,
        order_index: cleanValue.order_index,
        is_active: cleanValue.is_active,
        image_url: imageUrl,
      };

      const result = await addHeroSliderAction(dataForDB);

      if (!result.success) {
        throw new Error(result.error);
      }

      router.push("admin/hero?message=HeroCreated");
    } catch (error: any) {
      console.error("Submit Error", error);

      if (successfulUploads.length > 0) {
        const supabase = await createClient();
        await supabase.storage.from("hero-images").remove(successfulUploads);
        console.log("Cleanup complete: Orphaned files removed");
      }
      toast.error(error.message || "An error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = async () => {
    const stepFields: Record<number, Array<keyof HeroSlideFormInput>> = {
      1: ["title", "subtitle", "target_url", "order_index", "is_active"],
      2: ["image"],
    };

    const isValid = await form.trigger(stepFields[step]);
    if (!isValid) return;
    if (step < 2) {
      setStep(step + 1);
    } else {
      const values = form.getValues();
      await onSubmit(values);
    }
  };
  return (
    <div className="space-y-8 max-w-6xl mx-auto p-6 mb-12">
      <div className="flex items-center gap-2 mb-4">
        {[1, 2].map((s) => (
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
          {/* {step ===1 && < StepHeroInfos form={form} />}
            {step ===2 && < StepHeroImage form={form} onImageChange={setCapturedImage} />} */}

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
