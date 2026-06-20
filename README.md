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
│   │   ├── api
│   │   │   └── supabase
│   │   │       ├── products/route.ts
│   │   │       └── admin/products/stats/route.ts
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
- `@supabase/server` is installed for header-authenticated request handlers that expose:
  - `ctx.supabase` as an RLS-scoped client.
  - `ctx.supabaseAdmin` as an admin client that bypasses RLS.

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
   SUPABASE_URL=
   SUPABASE_PUBLISHABLE_KEY=
   SUPABASE_SECRET_KEY=
   SUPABASE_JWKS_URL=
   NEXT_PUBLIC_SUPABASE_URL=
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
   NEXT_PUBLIC_SUPABASE_ANON_KEY=
   ADMIN_EMAILS=
   NEXT_PUBLIC_WHATSAPP_PHONE=
   ```

   Copy the real `SUPABASE_*` values from the Supabase dashboard's Connect dialog. Do not commit the real
   `SUPABASE_SECRET_KEY`; keep it only in local or deployment environment variables.

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

## `@supabase/server` request handlers

The project includes Next.js route handlers wrapped with `withSupabase` from `@supabase/server`.

### User-authenticated RLS endpoint

```http
GET /api/supabase/products
Authorization: Bearer <supabase-user-access-token>
```

This route uses `auth: "user"` and queries active products with `ctx.supabase`, so Row-Level Security applies to the
authenticated user.

### Secret-key protected admin endpoint

```http
GET /api/supabase/admin/products/stats
apikey: <SUPABASE_SECRET_KEY>
```

This route uses `auth: "secret"` and reads product statistics with `ctx.supabaseAdmin`, which bypasses RLS. Use it only
for trusted server-to-server calls.

### Supabase Edge Function note

The routes above are Next.js route handlers. If you copy this pattern into Supabase Edge Functions and use
`auth: "publishable"`, `auth: "secret"`, or `auth: "none"`, set `verify_jwt = false` for that function in
`supabase/config.toml`; `auth: "user"` can keep JWT verification enabled.
