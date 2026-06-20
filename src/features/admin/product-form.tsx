"use client";

import Image from "next/image";
import { useMemo, useState, useTransition } from "react";
import { ImagePlus, X } from "lucide-react";

import { saveProductAction } from "@/features/admin/actions";
import type { Product } from "@/features/products/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { slugify } from "@/lib/utils";

type ProductFormProps = {
  product?: Product | null;
};

export function ProductForm({ product }: ProductFormProps) {
  const [name, setName] = useState(product?.name ?? "");
  const [slug, setSlug] = useState(product?.slug ?? "");
  const [images, setImages] = useState(product?.images ?? []);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();
  const configured = hasSupabaseEnv();

  const generatedSlug = useMemo(() => slug || slugify(name), [name, slug]);

  async function uploadImages(files: FileList | null) {
    if (!files?.length) {
      return;
    }

    setError("");
    setUploading(true);

    try {
      const supabase = createSupabaseBrowserClient();
      const uploadedUrls: string[] = [];

      for (const file of Array.from(files)) {
        const safeName = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, "-");
        const path = `${crypto.randomUUID()}-${safeName}`;
        const { error: uploadError } = await supabase.storage.from("product-images").upload(path, file);

        if (uploadError) {
          throw uploadError;
        }

        const {
          data: { publicUrl }
        } = supabase.storage.from("product-images").getPublicUrl(path);
        uploadedUrls.push(publicUrl);
      }

      setImages((current) => [...current, ...uploadedUrls]);
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Image upload failed.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <Card className="bg-card/90">
      <CardContent className="p-6">
        <form
          className="grid gap-6"
          action={(formData) => {
            startTransition(async () => {
              await saveProductAction(formData);
            });
          }}
        >
          {product?.id ? <input type="hidden" name="id" value={product.id} /> : null}
          <input type="hidden" name="images" value={JSON.stringify(images)} />

          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Blush Peony Candle"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                name="slug"
                required
                value={generatedSlug}
                onChange={(event) => setSlug(event.target.value)}
                placeholder="blush-peony-candle"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="shortDescription">Short description</Label>
            <Input
              id="shortDescription"
              name="shortDescription"
              required
              defaultValue={product?.shortDescription ?? ""}
              placeholder="Peony, rosewater, and warm musk."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Full description</Label>
            <Textarea id="description" name="description" required defaultValue={product?.description ?? ""} />
          </div>

          <div className="grid gap-5 md:grid-cols-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input id="price" name="price" type="number" min="0" step="0.01" required defaultValue={product?.price ?? ""} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock">Stock</Label>
              <Input id="stock" name="stock" type="number" min="0" step="1" required defaultValue={product?.stock ?? 0} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input id="category" name="category" required defaultValue={product?.category ?? ""} placeholder="Floral" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="scent">Scent</Label>
              <Input id="scent" name="scent" required defaultValue={product?.scent ?? ""} placeholder="Peony" />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex items-center gap-3 rounded-3xl border bg-background/70 p-4 text-sm font-medium">
              <input name="isActive" type="checkbox" defaultChecked={product?.isActive ?? true} />
              Active product
            </label>
            <label className="flex items-center gap-3 rounded-3xl border bg-background/70 p-4 text-sm font-medium">
              <input name="featured" type="checkbox" defaultChecked={product?.featured ?? false} />
              Featured on home page
            </label>
          </div>

          <div className="space-y-4 rounded-[2rem] border bg-background/60 p-5">
            <div>
              <Label htmlFor="images">Product images</Label>
              <p className="mt-1 text-sm text-muted-foreground">
                Upload files to the Supabase Storage bucket named product-images. Existing images can be removed below.
              </p>
            </div>
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-[2rem] border border-dashed bg-card p-8 text-center text-sm text-muted-foreground">
              <ImagePlus className="mb-3 h-6 w-6 text-primary" />
              {uploading ? "Uploading..." : "Choose image files"}
              <input
                id="images"
                type="file"
                accept="image/*"
                multiple
                className="sr-only"
                disabled={!configured || uploading}
                onChange={(event) => uploadImages(event.target.files)}
              />
            </label>
            {!configured ? (
              <p className="text-xs text-muted-foreground">Configure Supabase env vars before uploading images.</p>
            ) : null}
            {error ? <p className="rounded-2xl bg-destructive/10 p-3 text-sm text-destructive">{error}</p> : null}
            {images.length > 0 ? (
              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {images.map((image) => (
                  <div key={image} className="relative aspect-square overflow-hidden rounded-3xl border bg-secondary">
                    <Image src={image} alt="Product upload" fill className="object-cover" sizes="180px" />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute right-2 top-2 h-8 w-8"
                      onClick={() => setImages((current) => current.filter((item) => item !== image))}
                      aria-label="Remove image"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <Button type="submit" className="w-full md:w-auto" disabled={pending || uploading}>
            {pending ? "Saving..." : "Save product"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
