"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/features/cart/cart-context";
import { WHATSAPP_PHONE } from "@/lib/supabase/env";
import { formatCurrency } from "@/lib/utils";

export function CartPage() {
  const { items, subtotal, updateQuantity, removeItem, clearCart } = useCart();
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
    notes: ""
  });

  const formattedLines = useMemo(
    () =>
      items.map(
        (item) =>
          `- ${item.name} x${item.quantity} @ ${formatCurrency(item.price)} = ${formatCurrency(
            item.price * item.quantity
          )}`
      ),
    [items]
  );

  function handleCheckout(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const message = [
      "Hello Lullaby Candle Co., I would like to place an order.",
      "",
      "Customer information:",
      `Name: ${customer.name}`,
      `Phone: ${customer.phone}`,
      `Address: ${customer.address}`,
      customer.notes ? `Notes: ${customer.notes}` : "Notes: None",
      "",
      "Ordered products:",
      ...formattedLines,
      "",
      `Total: ${formatCurrency(subtotal)}`
    ].join("\n");

    const phone = WHATSAPP_PHONE.replace(/[^\d]/g, "");
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  if (items.length === 0) {
    return (
      <section className="container-padded py-14">
        <EmptyState title="Your cart is empty" description="Add a candle to begin your soft-glow order." />
        <Button asChild className="mt-6">
          <Link href="/products">Shop candles</Link>
        </Button>
      </section>
    );
  }

  return (
    <section className="container-padded grid gap-8 py-14 lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Shopping cart</p>
          <h1 className="mt-3 font-serif text-5xl font-semibold">Review your order</h1>
        </div>

        <div className="space-y-4">
          {items.map((item) => (
            <Card key={item.id} className="bg-card/85">
              <CardContent className="grid gap-4 p-4 sm:grid-cols-[120px_1fr_auto] sm:items-center">
                <div className="relative aspect-square overflow-hidden rounded-3xl bg-secondary">
                  {item.image ? <Image src={item.image} alt={item.name} fill className="object-cover" sizes="120px" /> : null}
                </div>
                <div>
                  <Link href={`/products/${item.slug}`} className="font-serif text-2xl font-semibold hover:text-primary">
                    {item.name}
                  </Link>
                  <p className="mt-1 text-sm text-muted-foreground">{formatCurrency(item.price)} each</p>
                  <p className="mt-2 text-sm font-medium">{formatCurrency(item.price * item.quantity)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    aria-label={`Decrease ${item.name} quantity`}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    className="w-20 text-center"
                    min={1}
                    max={item.stock}
                    type="number"
                    value={item.quantity}
                    onChange={(event) => updateQuantity(item.id, Number(event.target.value))}
                    aria-label={`${item.name} quantity`}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    disabled={item.quantity >= item.stock}
                    aria-label={`Increase ${item.name} quantity`}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(item.id)}
                    aria-label={`Remove ${item.name}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card className="h-fit bg-card/90">
        <CardHeader>
          <CardTitle className="font-serif">WhatsApp checkout</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6 space-y-3 rounded-3xl bg-secondary p-5">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleCheckout}>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                required
                value={customer.name}
                onChange={(event) => setCustomer((current) => ({ ...current, name: event.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                required
                value={customer.phone}
                onChange={(event) => setCustomer((current) => ({ ...current, phone: event.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                required
                value={customer.address}
                onChange={(event) => setCustomer((current) => ({ ...current, address: event.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={customer.notes}
                onChange={(event) => setCustomer((current) => ({ ...current, notes: event.target.value }))}
              />
            </div>
            <Button type="submit" className="w-full">
              Open WhatsApp order
            </Button>
            <Button type="button" variant="ghost" className="w-full" onClick={clearCart}>
              Clear cart
            </Button>
            {!WHATSAPP_PHONE ? (
              <p className="text-xs text-muted-foreground">
                Configure NEXT_PUBLIC_WHATSAPP_PHONE to send orders to your brand number.
              </p>
            ) : null}
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
