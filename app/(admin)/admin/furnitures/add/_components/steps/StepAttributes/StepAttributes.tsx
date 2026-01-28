import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form";
import { StepProps } from "@/types/StepPropsType";
import React from "react";
import { useFieldArray } from "react-hook-form";
import AttributeRow from "./AttributeRow";

export type ValueType = "text" | "number" | "multi";

export default function StepAttributes({ form }: StepProps) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "attributes",
  });
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h3>Attributes</h3>
        <Button
          type="button"
          variant="outline"
          onClick={() =>
            append({
              key: "",
              value: "",
            })
          }
        >
          Add Attribute
        </Button>
      </div>
      {fields.length === 0 && (
        <p className="text-sm text-muted-foreground">
          No attributes added yet.
        </p>
      )}
      {fields.map((field, index) => (
        <AttributeRow
          key={field.id}
          form={form}
          index={index}
          onRemove={() => remove(index)}
        />
      ))}
    </div>
  );
}
