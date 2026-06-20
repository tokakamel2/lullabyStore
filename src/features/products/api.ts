import { unstable_noStore as noStore } from "next/cache";

import { sampleProducts } from "@/data/sample-products";
import type { Product } from "@/features/products/types";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type ProductFilters = {
  activeOnly?: boolean;
  featuredOnly?: boolean;
};

export async function getProducts(filters: ProductFilters = {}) {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return filterSampleProducts(filters);
  }

  noStore();

  let query = supabase.from("products").select("*").order("createdAt", { ascending: false });

  if (filters.activeOnly) {
    query = query.eq("isActive", true);
  }

  if (filters.featuredOnly) {
    query = query.eq("featured", true);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Failed to load products", error.message);
    return filterSampleProducts(filters);
  }

  return (data ?? []) as Product[];
}

export async function getProductBySlug(slug: string, activeOnly = true) {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return filterSampleProducts({ activeOnly }).find((product) => product.slug === slug) ?? null;
  }

  noStore();

  let query = supabase.from("products").select("*").eq("slug", slug).limit(1);

  if (activeOnly) {
    query = query.eq("isActive", true);
  }

  const { data, error } = await query.maybeSingle();

  if (error) {
    console.error("Failed to load product", error.message);
    return filterSampleProducts({ activeOnly }).find((product) => product.slug === slug) ?? null;
  }

  return (data as Product | null) ?? null;
}

export async function getProductById(id: string) {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return sampleProducts.find((product) => product.id === id) ?? null;
  }

  noStore();

  const { data, error } = await supabase.from("products").select("*").eq("id", id).limit(1).maybeSingle();

  if (error) {
    console.error("Failed to load product by id", error.message);
    return null;
  }

  return (data as Product | null) ?? null;
}

export async function getDashboardStats() {
  const products = await getProducts();

  return {
    total: products.length,
    active: products.filter((product) => product.isActive).length,
    inactive: products.filter((product) => !product.isActive).length
  };
}

function filterSampleProducts(filters: ProductFilters) {
  return sampleProducts.filter((product) => {
    if (filters.activeOnly && !product.isActive) {
      return false;
    }

    if (filters.featuredOnly && !product.featured) {
      return false;
    }

    return true;
  });
}
