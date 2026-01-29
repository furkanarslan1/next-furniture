"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { success } from "zod";

export async function deleteProductAction(
  id: string,
  imageUrls: string[] | null,
) {
  const supabase = await createClient();

  try {
    if (imageUrls && imageUrls.length > 0) {
      const filePaths = imageUrls.map((url) => {
        const parts = url.split("/");
        return parts[parts.length - 1];
      });

      const { error: storageError } = await supabase.storage
        .from("products")
        .remove(filePaths);

      if (storageError) {
        console.error("Storage delete error:", storageError);
      }

      const { error: dbError } = await supabase
        .from("products")
        .delete()
        .eq("id", id);

      if (dbError) {
        throw dbError;
      }

      revalidatePath("/admin/furnitures");

      return { success: true };
    }
  } catch (error: any) {
    console.error("Delete Action Error :", error);
    return {
      success: false,
      error: error.message || "An unexpected error occurred",
    };
  }
}
