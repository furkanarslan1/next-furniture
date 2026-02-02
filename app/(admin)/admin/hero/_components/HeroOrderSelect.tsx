"use client";
import { updateHeroOrderAction } from "@/app/(actions)/hero/updateHeroOrderAction";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

interface HeroOrderSelectProps {
  heroId: string;
  oldOrder: number;
  totalCount: number;
}

export default function HeroOrderSelect({
  heroId,
  oldOrder,
  totalCount,
}: HeroOrderSelectProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleValueChange = async (newValue: string) => {
    const newOrder = parseInt(newValue);
    if (newOrder === oldOrder) return;

    setIsLoading(true);
    const result = await updateHeroOrderAction(heroId, oldOrder, newOrder);

    if (result.success) {
      toast.success("Order updated");
    } else {
      toast.error("Order cannot update");
    }

    setIsLoading(false);
  };
  return (
    <div className="flex items-center gap-2">
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Select
          key={`${heroId}-${oldOrder}`}
          defaultValue={oldOrder.toString()}
          onValueChange={handleValueChange}
          disabled={isLoading}
        >
          <SelectTrigger className="w-17.5">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: totalCount }, (_, i) => i + 1).map((num) => (
              <SelectItem key={num} value={num.toString()}>
                {num}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
}
