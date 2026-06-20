import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { AddToCartButton } from "@/features/cart/add-to-cart-button";
import type { Product } from "@/features/products/types";
import { formatCurrency } from "@/lib/utils";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const image = product.images[0];

  return (
    <Card className="group overflow-hidden bg-card/85 backdrop-blur">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
          {image ? (
            <Image
              src={image}
              alt={product.name}
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">No image</div>
          )}
          {product.featured ? <Badge className="absolute left-4 top-4">Featured</Badge> : null}
        </div>
      </Link>
      <CardContent className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Link href={`/products/${product.slug}`} className="font-serif text-xl font-semibold hover:text-primary">
              {product.name}
            </Link>
            <p className="mt-1 text-sm text-muted-foreground">
              {product.category} / {product.scent}
            </p>
          </div>
          <p className="font-semibold">{formatCurrency(product.price)}</p>
        </div>
        <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">{product.shortDescription}</p>
        <AddToCartButton product={product} className="w-full" />
      </CardContent>
    </Card>
  );
}
