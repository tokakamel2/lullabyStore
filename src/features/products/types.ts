export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  category: string;
  scent: string;
  stock: number;
  images: string[];
  isActive: boolean;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ProductFormValues = Omit<Product, "id" | "createdAt" | "updatedAt"> & {
  id?: string;
};
