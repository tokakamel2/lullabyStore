insert into public.products (
  id,
  name,
  slug,
  description,
  "shortDescription",
  price,
  category,
  scent,
  stock,
  images,
  "isActive",
  featured
)
values
(
  '6f09fd78-4e97-4cb2-9e95-d6f77212e431',
  'Blush Peony Candle',
  'blush-peony-candle',
  'A hand-poured soy wax candle with soft peony petals, rosewater, and a whisper of warm musk. Finished in a reusable blush glass vessel for a romantic bedside glow.',
  'Peony, rosewater, and warm musk in blush glass.',
  34.00,
  'Floral',
  'Peony',
  18,
  array[
    'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1602524206684-0283d0bdaf35?auto=format&fit=crop&w=1200&q=80'
  ],
  true,
  true
),
(
  '1619de7c-f697-46fc-a280-67a29d9a73a2',
  'Vanilla Cashmere Candle',
  'vanilla-cashmere-candle',
  'Creamy vanilla bean, spun sugar, and cashmere woods create a cozy signature candle designed for slow evenings and soft rituals.',
  'Creamy vanilla bean wrapped in cashmere woods.',
  38.00,
  'Gourmand',
  'Vanilla',
  24,
  array[
    'https://images.unsplash.com/photo-1602524814695-174b4b3c3f22?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1602874801006-e26b5870638e?auto=format&fit=crop&w=1200&q=80'
  ],
  true,
  true
),
(
  '09765cc9-dd09-4d87-bd4b-1ef7db06d8a1',
  'Citrus Atelier Candle',
  'citrus-atelier-candle',
  'Sparkling bergamot, neroli, and sunlit cedar brighten any workspace with a clean, polished scent profile.',
  'Bergamot, neroli, and sunlit cedar.',
  32.00,
  'Fresh',
  'Bergamot',
  13,
  array[
    'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1200&q=80'
  ],
  true,
  false
),
(
  'bdcf375c-272b-45e7-a0a9-4ccff5d1efcf',
  'Rosewood Nocturne Candle',
  'rosewood-nocturne-candle',
  'A moody floral-wood candle with Bulgarian rose, amber resin, and polished rosewood for dinners, baths, and after-dark rituals.',
  'Bulgarian rose, amber resin, and rosewood.',
  42.00,
  'Woody',
  'Rosewood',
  7,
  array[
    'https://images.unsplash.com/photo-1601992166089-99d8708c0200?auto=format&fit=crop&w=1200&q=80'
  ],
  true,
  true
),
(
  'b6fd2cc7-a6d8-437a-840a-9e8efed7ecbc',
  'Lavender Silk Candle',
  'lavender-silk-candle',
  'French lavender, chamomile, and white tea make a serene candle for unwinding before sleep.',
  'French lavender, chamomile, and white tea.',
  30.00,
  'Herbal',
  'Lavender',
  0,
  array[
    'https://images.unsplash.com/photo-1602524814695-b22b81d26ed8?auto=format&fit=crop&w=1200&q=80'
  ],
  true,
  false
)
on conflict (id) do update
set
  name = excluded.name,
  slug = excluded.slug,
  description = excluded.description,
  "shortDescription" = excluded."shortDescription",
  price = excluded.price,
  category = excluded.category,
  scent = excluded.scent,
  stock = excluded.stock,
  images = excluded.images,
  "isActive" = excluded."isActive",
  featured = excluded.featured;
