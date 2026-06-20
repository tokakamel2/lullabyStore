import type { Product } from "@/features/products/types";

export const sampleProducts: Product[] = [
  {
    id: "6f09fd78-4e97-4cb2-9e95-d6f77212e431",
    name: "Blush Peony Candle",
    slug: "blush-peony-candle",
    description:
      "A hand-poured soy wax candle with soft peony petals, rosewater, and a whisper of warm musk. Finished in a reusable blush glass vessel for a romantic bedside glow.",
    shortDescription: "Peony, rosewater, and warm musk in blush glass.",
    price: 34,
    category: "Floral",
    scent: "Peony",
    stock: 18,
    images: [
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1602524206684-0283d0bdaf35?auto=format&fit=crop&w=1200&q=80"
    ],
    isActive: true,
    featured: true,
    createdAt: "2026-01-03T10:00:00.000Z",
    updatedAt: "2026-01-03T10:00:00.000Z"
  },
  {
    id: "1619de7c-f697-46fc-a280-67a29d9a73a2",
    name: "Vanilla Cashmere Candle",
    slug: "vanilla-cashmere-candle",
    description:
      "Creamy vanilla bean, spun sugar, and cashmere woods create a cozy signature candle designed for slow evenings and soft rituals.",
    shortDescription: "Creamy vanilla bean wrapped in cashmere woods.",
    price: 38,
    category: "Gourmand",
    scent: "Vanilla",
    stock: 24,
    images: [
      "https://images.unsplash.com/photo-1602524814695-174b4b3c3f22?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1602874801006-e26b5870638e?auto=format&fit=crop&w=1200&q=80"
    ],
    isActive: true,
    featured: true,
    createdAt: "2026-01-07T10:00:00.000Z",
    updatedAt: "2026-01-07T10:00:00.000Z"
  },
  {
    id: "09765cc9-dd09-4d87-bd4b-1ef7db06d8a1",
    name: "Citrus Atelier Candle",
    slug: "citrus-atelier-candle",
    description:
      "Sparkling bergamot, neroli, and sunlit cedar brighten any workspace with a clean, polished scent profile.",
    shortDescription: "Bergamot, neroli, and sunlit cedar.",
    price: 32,
    category: "Fresh",
    scent: "Bergamot",
    stock: 13,
    images: [
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1200&q=80"
    ],
    isActive: true,
    featured: false,
    createdAt: "2026-01-11T10:00:00.000Z",
    updatedAt: "2026-01-11T10:00:00.000Z"
  },
  {
    id: "bdcf375c-272b-45e7-a0a9-4ccff5d1efcf",
    name: "Rosewood Nocturne Candle",
    slug: "rosewood-nocturne-candle",
    description:
      "A moody floral-wood candle with Bulgarian rose, amber resin, and polished rosewood for dinners, baths, and after-dark rituals.",
    shortDescription: "Bulgarian rose, amber resin, and rosewood.",
    price: 42,
    category: "Woody",
    scent: "Rosewood",
    stock: 7,
    images: [
      "https://images.unsplash.com/photo-1601992166089-99d8708c0200?auto=format&fit=crop&w=1200&q=80"
    ],
    isActive: true,
    featured: true,
    createdAt: "2026-01-17T10:00:00.000Z",
    updatedAt: "2026-01-17T10:00:00.000Z"
  },
  {
    id: "b6fd2cc7-a6d8-437a-840a-9e8efed7ecbc",
    name: "Lavender Silk Candle",
    slug: "lavender-silk-candle",
    description:
      "French lavender, chamomile, and white tea make a serene candle for unwinding before sleep.",
    shortDescription: "French lavender, chamomile, and white tea.",
    price: 30,
    category: "Herbal",
    scent: "Lavender",
    stock: 0,
    images: [
      "https://images.unsplash.com/photo-1602524814695-b22b81d26ed8?auto=format&fit=crop&w=1200&q=80"
    ],
    isActive: true,
    featured: false,
    createdAt: "2026-01-20T10:00:00.000Z",
    updatedAt: "2026-01-20T10:00:00.000Z"
  }
];
