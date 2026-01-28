import { UseFormReturn } from "react-hook-form";
import { FurnitureFormInput } from "../../FurnitureAddForm";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export default function AttributeRow({
  form,
  index,
  onRemove,
}: {
  form: UseFormReturn<FurnitureFormInput>;
  index: number;
  onRemove: () => void;
}) {
  return (
    <div className="group flex flex-col md:flex-row gap-3 p-3 border rounded-lg bg-background hover:border-primary/50 transition-colors">
      {/* KEY LEFT SIDE */}
      <FormField
        control={form.control}
        name={`attributes.${index}.key`}
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormLabel>Key</FormLabel>
            <FormControl>
              <Input
                id="attribute-key"
                placeholder="e.g material"
                className="h-9 focus-visible:ring-primary"
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />

      {/* VALUE  RIGHT SIDE*/}
      <FormField
        control={form.control}
        name={`attributes.${index}.value`}
        render={({ field }) => (
          <FormItem className="flex-[1.5]">
            <FormLabel>Value</FormLabel>
            <FormControl>
              <Input
                id="attribute-value"
                placeholder="120 X 50"
                className="h-9 focus-visible:ring-primary"
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />

      {/* REMOVE */}
      <div className="flex items-end">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-9 w-9 p-0 text-muted-foreground hover:text-destructive shrink-0"
          onClick={onRemove}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
