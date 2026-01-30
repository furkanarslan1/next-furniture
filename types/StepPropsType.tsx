import { FurnitureFormInput } from "@/app/(admin)/admin/furnitures/add/_components/FurnitureAddForm";
import { HeroSlideFormInput } from "@/schemas/heroSlideSchema";
import { UseFormReturn } from "react-hook-form";

export interface StepProps {
  form: UseFormReturn<FurnitureFormInput>;
}

export interface StepHeroProps {
  form: UseFormReturn<HeroSlideFormInput>;
}
