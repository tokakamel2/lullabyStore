import { ProductForm } from "@/features/admin/product-form";

export const metadata = {
  title: "Add Product | Lullaby Candle Co."
};

export default function NewProductPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">New candle</p>
        <h2 className="mt-2 font-serif text-4xl font-semibold">Add new product</h2>
      </div>
      <ProductForm />
    </div>
  );
}
