import { notFound } from "next/navigation";

import { AddToCartButton } from "@/features/cart/add-to-cart-button";
import { ProductGallery } from "@/features/products/product-gallery";
import { getProductBySlug, getProducts } from "@/features/products/api";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

type ProductDetailsPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: ProductDetailsPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  return {
    title: product ? `${product.name} | Lullaby Candle Co.` : "Product not found"
  };
}

export async function generateStaticParams() {
  const products = await getProducts({ activeOnly: true });

  return products.map((product) => ({
    slug: product.slug
  }));
}

export default async function ProductDetailsPage({ params }: ProductDetailsPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const inStock = product.stock > 0;

  return (
    <section className="container-padded grid gap-12 py-14 lg:grid-cols-[0.95fr_1.05fr]">
      <ProductGallery images={product.images} name={product.name} />

      <div className="self-start rounded-[2rem] border bg-card/85 p-8 shadow-sm backdrop-blur">
        <div className="mb-5 flex flex-wrap gap-2">
          <Badge variant="secondary">{product.category}</Badge>
          <Badge variant="outline">{product.scent}</Badge>
          <Badge variant={inStock ? "default" : "destructive"}>{inStock ? `${product.stock} in stock` : "Out of stock"}</Badge>
        </div>
        <h1 className="font-serif text-5xl font-semibold tracking-tight">{product.name}</h1>
        <p className="mt-4 text-2xl font-semibold text-primary">{formatCurrency(product.price)}</p>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">{product.description}</p>
        <div className="mt-8">
          <AddToCartButton product={product} className="w-full sm:w-auto" />
        </div>
      </div>
    </section>
  );
}
