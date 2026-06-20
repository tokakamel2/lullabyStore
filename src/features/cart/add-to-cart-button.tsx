"use client";

import { ShoppingBag } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useCart } from "@/features/cart/cart-context";
import type { Product } from "@/features/products/types";

type AddToCartButtonProps = {
  product: Product;
  quantity?: number;
  className?: string;
};

export function AddToCartButton({ product, quantity = 1, className }: AddToCartButtonProps) {
  const { addProduct } = useCart();
  const [added, setAdded] = useState(false);
  const disabled = product.stock <= 0 || !product.isActive;

  return (
    <Button
      className={className}
      disabled={disabled}
      onClick={() => {
        addProduct(product, quantity);
        setAdded(true);
        window.setTimeout(() => setAdded(false), 1400);
      }}
    >
      <ShoppingBag className="h-4 w-4" />
      {disabled ? "Out of stock" : added ? "Added" : "Add to cart"}
    </Button>
  );
}
