"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function deleteHeroAction(heroId: string) {
  const supabase = await createClient();
  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      throw new Error("Invalid Authorization");
    }

    const { data: heroData, error: fetchError } = await supabase
      .from("hero_list")
      .select("image_url")
      .eq("id", heroId)
      .single();

    if (fetchError || !heroData) {
      throw new Error("No records were found to be deleted.");
    }

    const { error: deleteError } = await supabase
      .from("hero_list")
      .delete()
      .eq("id", heroId);

    if (deleteError) {
      throw deleteError;
    }

    const fileName = heroData.image_url.split("/").pop();
    if (fileName) {
      await supabase.storage.from("hero-images").remove([fileName]);
    }

    revalidatePath("/admin/hero");
    revalidatePath("/");

    return { success: true };
  } catch (error: any) {
    console.error("Delete Action Error :", error);
    return {
      success: false,
      error: error.message || "An unexpected error occurred",
    };
  }
}
