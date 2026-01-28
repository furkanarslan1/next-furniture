import { FurnitureFormInput } from "@/app/(admin)/admin/furnitures/add/_components/FurnitureAddForm";
import { UseFormReturn } from "react-hook-form";

export interface StepProps {
  form: UseFormReturn<FurnitureFormInput>;
}
