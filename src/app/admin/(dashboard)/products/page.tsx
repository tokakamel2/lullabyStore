import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ProductRowActions } from "@/features/admin/product-row-actions";
import { getProducts } from "@/features/products/api";
import { formatCurrency } from "@/lib/utils";

export const metadata = {
  title: "Manage Products | Lullaby Candle Co."
};

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <Card className="bg-card/90">
      <CardHeader className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <CardTitle className="font-serif text-3xl">Products</CardTitle>
        <Button asChild>
          <Link href="/admin/products/new">Add new product</Link>
        </Button>
      </CardHeader>
      <CardContent>
        {products.length === 0 ? (
          <EmptyState title="No products yet" description="Add your first handmade candle to begin selling." />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Scent</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.scent}</TableCell>
                  <TableCell>{formatCurrency(product.price)}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    <Badge variant={product.isActive ? "default" : "outline"}>
                      {product.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <ProductRowActions product={product} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
