"use server";

import { createClient } from "@/lib/supabase/server";
import { loginSchema, LoginValues } from "@/schemas/authSchema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function loginAction(values: LoginValues) {
  const validateFields = loginSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Invalid email or password format." };
  }

  const { email, password } = validateFields.data;
  const supabase = await createClient();

  // 2. Giriş İşlemi / Sign In Process
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (authError || !user) {
    return { error: "Invalid credentials. Please try again." };
  }

  // 2. Kullanıcının id admin_users çek / Fetch user id from admin_users

  const { data: adminData, error: adminError } = await supabase
    .from("admin_users")
    .select("id")
    .eq("id", user.id)
    .single();

  if (adminError || !adminData) {
    // Admin değilse oturumu kapat ki arkada açık kalmasın
    // If you're not an admin, log out so it doesn't stay open in the background.
    await supabase.auth.signOut();
    return { error: "You do not have permission to access this panel." };
  }

  // 3. Cache Temizleme ve Yönlendirme / Revalidate and Sync
  // Kullanıcı giriş yaptığı için layout ve header verilerinin yenilenmesini sağlarız.
  revalidatePath("/", "layout");
}
