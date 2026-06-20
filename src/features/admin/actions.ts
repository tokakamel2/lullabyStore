"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireAdminUser } from "@/features/admin/auth";
import type { Product } from "@/features/products/types";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/utils";

export async function saveProductAction(formData: FormData) {
  await requireAdminUser();
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    throw new Error("Supabase is not configured.");
  }

  const id = stringValue(formData, "id");
  const name = requiredString(formData, "name");
  const slug = stringValue(formData, "slug") || slugify(name);
  const images = parseImages(stringValue(formData, "images"));
  const now = new Date().toISOString();

  const payload = {
    name,
    slug,
    description: requiredString(formData, "description"),
    shortDescription: requiredString(formData, "shortDescription"),
    price: numberValue(formData, "price"),
    category: requiredString(formData, "category"),
    scent: requiredString(formData, "scent"),
    stock: integerValue(formData, "stock"),
    images,
    isActive: formData.get("isActive") === "on",
    featured: formData.get("featured") === "on",
    updatedAt: now
  };

  const result = id
    ? await supabase.from("products").update(payload).eq("id", id)
    : await supabase.from("products").insert({ ...payload, createdAt: now });

  if (result.error) {
    throw new Error(result.error.message);
  }

  revalidateProductPaths();
  redirect("/admin/products");
}

export async function deleteProductAction(formData: FormData) {
  await requireAdminUser();
  const supabase = await createSupabaseServerClient();
  const id = requiredString(formData, "id");

  if (!supabase) {
    throw new Error("Supabase is not configured.");
  }

  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidateProductPaths();
}

export async function toggleProductActiveAction(formData: FormData) {
  await requireAdminUser();
  const supabase = await createSupabaseServerClient();
  const id = requiredString(formData, "id");
  const isActive = formData.get("isActive") === "true";

  if (!supabase) {
    throw new Error("Supabase is not configured.");
  }

  const { error } = await supabase.from("products").update({ isActive: !isActive }).eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidateProductPaths();
}

export async function signOutAction() {
  const supabase = await createSupabaseServerClient();

  if (supabase) {
    await supabase.auth.signOut();
  }

  redirect("/admin/login");
}

function revalidateProductPaths() {
  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath("/admin");
  revalidatePath("/admin/products");
}

function stringValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function requiredString(formData: FormData, key: keyof Product) {
  const value = stringValue(formData, key);

  if (!value) {
    throw new Error(`${key} is required.`);
  }

  return value;
}

function numberValue(formData: FormData, key: keyof Product) {
  const value = Number(stringValue(formData, key));

  if (!Number.isFinite(value) || value < 0) {
    throw new Error(`${key} must be a valid positive number.`);
  }

  return value;
}

function integerValue(formData: FormData, key: keyof Product) {
  return Math.trunc(numberValue(formData, key));
}

function parseImages(value: string) {
  if (!value) {
    return [];
  }

  const parsed = JSON.parse(value);

  if (!Array.isArray(parsed) || !parsed.every((item) => typeof item === "string")) {
    throw new Error("Images must be a JSON array of URLs.");
  }

  return parsed;
}
