"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateHeroOrderAction(
  heroId: string,
  oldOrder: number,
  newOrder: number,
) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("Invalid Authorization");
  }

  try {
    const { data: otherHero, error: findError } = await supabase
      .from("hero_list")
      .select("id")
      .eq("order_index", newOrder)
      .single();

    if (findError && findError.code !== "PGRST116") {
      throw findError;
    }

    if (otherHero) {
      const { error: updateOtherError } = await supabase
        .from("hero_list")
        .update({ order_index: oldOrder })
        .eq("id", otherHero.id);

      if (updateOtherError) throw updateOtherError;
    }

    const { error: updateCurrentError } = await supabase
      .from("hero_list")
      .update({ order_index: newOrder })
      .eq("id", heroId);

    if (updateCurrentError) throw updateCurrentError;

    revalidatePath("/admin/hero");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("Order Update Error :", error);
    return {
      success: false,
      error: error.message || "An unexpected error occurred",
    };
  }
}
