import { withSupabase } from "@supabase/server";

import type { Database } from "@/lib/supabase/database.types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const productsHandler = withSupabase<Database>({ auth: "user" }, async (_request, ctx) => {
  const { data, error } = await ctx.supabase
    .from("products")
    .select("*")
    .eq("isActive", true)
    .order("createdAt", { ascending: false });

  if (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }

  return Response.json({
    user: ctx.userClaims
      ? {
          id: ctx.userClaims.id,
          email: ctx.userClaims.email ?? null,
          role: ctx.userClaims.role ?? null
        }
      : null,
    products: data ?? []
  });
});

export const GET = productsHandler;
export const OPTIONS = productsHandler;
