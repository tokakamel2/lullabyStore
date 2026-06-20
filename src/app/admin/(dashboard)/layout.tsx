import Link from "next/link";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { signOutAction } from "@/features/admin/actions";
import { requireAdminUser } from "@/features/admin/auth";

const adminLinks = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/products/new", label: "Add product" }
];

export default async function AdminDashboardLayout({ children }: { children: ReactNode }) {
  const user = await requireAdminUser();

  return (
    <section className="container-padded py-10">
      <div className="mb-8 rounded-[2rem] border bg-card/90 p-5 shadow-sm">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-sm text-muted-foreground">Signed in as {user.email}</p>
            <h1 className="font-serif text-3xl font-semibold">Admin dashboard</h1>
          </div>
          <form action={signOutAction}>
            <Button type="submit" variant="outline">
              Sign out
            </Button>
          </form>
        </div>
        <nav className="mt-5 flex flex-wrap gap-3">
          {adminLinks.map((link) => (
            <Button key={link.href} asChild variant="secondary" size="sm">
              <Link href={link.href}>{link.label}</Link>
            </Button>
          ))}
        </nav>
      </div>
      {children}
    </section>
  );
}
