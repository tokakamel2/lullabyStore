"use client";

import { Menu, ShoppingBag, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useCart } from "@/features/cart/cart-context";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" }
];

export function Header() {
  const [open, setOpen] = useState(false);
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-xl">
      <div className="container-padded flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-3 font-serif text-2xl font-semibold tracking-tight text-primary">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-[linear-gradient(135deg,hsl(var(--primary)),hsl(var(--accent)))] text-sm text-primary-foreground shadow-sm">
            L
          </span>
          <span>Lullaby Candle Co.</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium hover:text-primary">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm" className="relative">
            <Link href="/cart" aria-label="Open cart">
              <ShoppingBag className="h-4 w-4" />
              Cart
              {itemCount > 0 ? (
                <span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-xs text-primary-foreground">
                  {itemCount}
                </span>
              ) : null}
            </Link>
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setOpen((current) => !current)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <div className={cn("container-padded grid gap-3 pb-5 md:hidden", !open && "hidden")}>
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-full bg-card px-4 py-3 text-sm font-medium shadow-sm"
            onClick={() => setOpen(false)}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
