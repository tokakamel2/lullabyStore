import { withSupabase } from "@supabase/server";

import type { Database } from "@/lib/supabase/database.types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const productStatsHandler = withSupabase<Database>({ auth: "secret" }, async (_request, ctx) => {
  const { data, error } = await ctx.supabaseAdmin.from("products").select("isActive");

  if (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }

  const products = data ?? [];

  return Response.json({
    authMode: ctx.authMode,
    total: products.length,
    active: products.filter((product) => product.isActive).length,
    inactive: products.filter((product) => !product.isActive).length
  });
});

export const GET = productStatsHandler;
export const OPTIONS = productStatsHandler;
