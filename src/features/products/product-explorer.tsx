"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { ProductCard } from "@/features/products/product-card";
import type { Product } from "@/features/products/types";

type ProductExplorerProps = {
  products: Product[];
};

export function ProductExplorer({ products }: ProductExplorerProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [scent, setScent] = useState("all");

  const categories = useMemo(() => uniqueOptions(products.map((product) => product.category)), [products]);
  const scents = useMemo(() => uniqueOptions(products.map((product) => product.scent)), [products]);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch = !normalizedSearch || product.name.toLowerCase().includes(normalizedSearch);
      const matchesCategory = category === "all" || product.category === category;
      const matchesScent = scent === "all" || product.scent === scent;

      return matchesSearch && matchesCategory && matchesScent;
    });
  }, [category, products, scent, search]);

  return (
    <div className="space-y-8">
      <div className="grid gap-4 rounded-[2rem] border bg-card/80 p-4 shadow-sm backdrop-blur md:grid-cols-[1fr_220px_220px]">
        <label className="relative">
          <span className="sr-only">Search products by name</span>
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by candle name"
            className="pl-11"
          />
        </label>

        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="h-11 rounded-full border border-input bg-background/80 px-4 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Filter by category"
        >
          <option value="all">All categories</option>
          {categories.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <select
          value={scent}
          onChange={(event) => setScent(event.target.value)}
          className="h-11 rounded-full border border-input bg-background/80 px-4 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Filter by scent"
        >
          <option value="all">All scents</option>
          {scents.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No candles match your filters"
          description="Try clearing a scent, category, or search term to discover more handmade pieces."
        />
      )}
    </div>
  );
}

function uniqueOptions(values: string[]) {
  return Array.from(new Set(values.filter(Boolean))).sort((a, b) => a.localeCompare(b));
}
