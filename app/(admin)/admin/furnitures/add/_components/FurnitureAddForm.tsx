"use client";
import { Button } from "@/components/ui/button";
import { ProductSchema } from "@/schemas/productSchema";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { Form, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

type FurnitureFormInput = z.input<typeof ProductSchema>;
type FurnitureValues = z.infer<typeof ProductSchema>;

export default function FurnitureAddForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const step = Number(searchParams.get("step") ?? 1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FurnitureFormInput>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      price: 0,
      discountRate: 0,
      categorySlug: "",
      typeSlug: "",
      isActive: true,
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

    try {
      setIsSubmitting(true);

      console.log(values);

      toast.success("Product created successfully");
    } catch (error) {
      toast.error("Something went wrong");
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
        "discountRate",
        "categorySlug",
        "typeSlug",
        "isActive",
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
    <div className="space-y-8 max-w-6xl mx-auto p-6">
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
          {/* {step === 1 && <StepBasicInfo form={form} />} */}

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
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {step === 3 ? "Complete and Publish" : "Next Step"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
