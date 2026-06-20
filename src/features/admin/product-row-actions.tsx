"use client";

import { useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { deleteProductAction, toggleProductActiveAction } from "@/features/admin/actions";
import type { Product } from "@/features/products/types";

type ProductRowActionsProps = {
  product: Product;
};

export function ProductRowActions({ product }: ProductRowActionsProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <div className="flex flex-wrap justify-end gap-2">
      <Button asChild variant="outline" size="sm">
        <Link href={`/admin/products/${product.id}/edit`}>Edit</Link>
      </Button>
      <Button
        type="button"
        variant="secondary"
        size="sm"
        disabled={pending}
        onClick={() =>
          startTransition(async () => {
            const formData = new FormData();
            formData.set("id", product.id);
            formData.set("isActive", String(product.isActive));
            await toggleProductActiveAction(formData);
            router.refresh();
          })
        }
      >
        {product.isActive ? "Pause" : "Activate"}
      </Button>
      <Button
        type="button"
        variant="destructive"
        size="sm"
        disabled={pending}
        onClick={() => {
          if (!window.confirm(`Delete ${product.name}? This cannot be undone.`)) {
            return;
          }

          startTransition(async () => {
            const formData = new FormData();
            formData.set("id", product.id);
            await deleteProductAction(formData);
            router.refresh();
          });
        }}
      >
        Delete
      </Button>
    </div>
  );
}
