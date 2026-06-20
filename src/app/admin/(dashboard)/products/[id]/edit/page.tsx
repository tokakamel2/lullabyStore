import { notFound } from "next/navigation";

import { ProductForm } from "@/features/admin/product-form";
import { getProductById } from "@/features/products/api";

type EditProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export const metadata = {
  title: "Edit Product | Lullaby Candle Co."
};

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Edit candle</p>
        <h2 className="mt-2 font-serif text-4xl font-semibold">{product.name}</h2>
      </div>
      <ProductForm product={product} />
    </div>
  );
}
