import { ProductExplorer } from "@/features/products/product-explorer";
import { getProducts } from "@/features/products/api";

export const metadata = {
  title: "Shop Handmade Candles | Lullaby Candle Co."
};

export default async function ProductsPage() {
  const products = await getProducts({ activeOnly: true });

  return (
    <section className="container-padded py-14">
      <div className="mb-10 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">The candle collection</p>
        <h1 className="mt-4 font-serif text-5xl font-semibold tracking-tight">Shop every active candle</h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          Search by candle name or filter by category and scent to find the right glow for your space.
        </p>
      </div>
      <ProductExplorer products={products} />
    </section>
  );
}
