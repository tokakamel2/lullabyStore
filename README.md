# Lullaby Candle Co.

Modern full-stack e-commerce application for a handmade candle brand built with Next.js 15 App Router, TypeScript,
Tailwind CSS, shadcn/ui-style components, and Supabase.

## Generated project structure

```txt
.
├── src
│   ├── app
│   │   ├── admin
│   │   │   ├── (dashboard)
│   │   │   │   ├── page.tsx
│   │   │   │   └── products
│   │   │   │       ├── page.tsx
│   │   │   │       ├── new/page.tsx
│   │   │   │       └── [id]/edit/page.tsx
│   │   │   └── login/page.tsx
│   │   ├── cart/page.tsx
│   │   ├── products
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components
│   │   ├── layout
│   │   └── ui
│   ├── data
│   ├── features
│   │   ├── admin
│   │   ├── cart
│   │   └── products
│   └── lib
│       └── supabase
├── supabase
│   ├── schema.sql
│   └── seed.sql
├── middleware.ts
└── .env.example
```

## Feature implementation

### Public website

- Responsive premium storefront with hero, featured products, about, contact, footer, and social links.
- Products page displays active products with image, name, price, scent, category, and short description.
- Client-side product search by name plus category and scent filters.
- Product details pages include image gallery, full description, price, stock status, and add-to-cart.
- LocalStorage-backed shopping cart supports add, update quantity, remove, subtotal, and total.
- WhatsApp checkout collects name, phone, address, and notes, then opens a formatted `wa.me` message.

### Admin dashboard

- Secure `/admin` area protected by Supabase Auth middleware.
- Optional `ADMIN_EMAILS` allow list for restricting dashboard access to specific authenticated admins.
- Login page at `/admin/login`.
- Dashboard statistics for total, active, and inactive products.
- Products table with edit, delete, pause, and activate controls.
- Add/edit product form for descriptions, price, stock, category, scent, featured, active, and image URLs.
- Supabase Storage uploads to the public `product-images` bucket with image removal from product records.

### Backend

- Supabase products table with requested fields:
  - `id`, `name`, `slug`, `description`, `shortDescription`, `price`, `category`, `scent`, `stock`, `images`,
    `isActive`, `featured`, `createdAt`, `updatedAt`
- SQL schema includes indexes, updated-at trigger, RLS policies, and Storage bucket policies.
- Seed data includes sample handmade candle products.
- The app uses sample fallback products if Supabase environment variables are not configured, so local builds can run
  before backend setup.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy environment variables:

   ```bash
   cp .env.example .env.local
   ```

3. Create a Supabase project and fill in:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=
   NEXT_PUBLIC_SUPABASE_ANON_KEY=
   ADMIN_EMAILS=
   NEXT_PUBLIC_WHATSAPP_PHONE=
   ```

4. In Supabase SQL Editor, run:

   ```sql
   -- supabase/schema.sql
   -- then supabase/seed.sql
   ```

5. Create at least one Supabase Auth user for the admin dashboard. If `ADMIN_EMAILS` is set, the user email must be in
   that comma-separated list.

6. Start development:

   ```bash
   npm run dev
   ```

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run typecheck
```
