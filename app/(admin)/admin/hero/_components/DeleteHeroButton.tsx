"use client";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { deleteHeroAction } from "@/app/(actions)/hero/deleteHeroAction";
import { toast } from "sonner";

export default function DeleteHeroButton({ heroId }: { heroId: string }) {
  const handleDelete = async () => {
    if (confirm("Are you sure?")) {
      const res = await deleteHeroAction(heroId);
      if (res.success) toast.success("Deleted");
      else toast.error("Error");
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleDelete}
      className="text-destructive hover:text-destructive hover:bg-destructive/10"
    >
      <Trash2 size={16} />
    </Button>
  );
}
