# Mahajan Hospital & Eye Care Centre — Build Plan

## Heads up before we start

- **"kuuydsyislbirnnadvsh"** is your Supabase project ref, not a `service_role` key (which is a long `eyJhbGci...` JWT). Without it I cannot run migrations or seed the admin user on your Supabase from here. Two options:
  1. Paste the real `service_role` key (Supabase Dashboard → Project Settings → API → `service_role` secret). I'll store it as a server-only secret, run all migrations, create storage buckets, and seed the admin user `tilgsp@gmail.com / admin@22441`.
  2. Skip it — I'll ship a `supabase/migrations/*.sql` file and a bucket + admin-seed checklist, and you run them yourself in the SQL Editor / Storage UI / Authentication UI. The app code will still work as soon as you run them.
- I'll build the app assuming option 2 (self-serve) so nothing blocks. If you give me the service key, I'll additionally execute the migrations + seed for you.

## Stack

- Vite + React 18 + TypeScript, single-page app
- React Router v6 (`react-router-dom`)
- Tailwind CSS + shadcn/ui (already in project)
- `react-helmet-async` for SEO / schema.org
- `@supabase/supabase-js` with your project URL + publishable key hardcoded in `src/integrations/supabase/client.ts`
- `@dnd-kit` for drag-and-drop reorder in admin
- `framer-motion` for subtle hero/section animations
- Poppins (display) + Inter (body) via `@fontsource`

## Scaffold rewrite (destroy TanStack, restore Vite SPA)

Files removed: `src/routes/`, `src/router.tsx`, `src/server.ts`, `src/start.ts`, `src/routeTree.gen.ts`, TanStack imports.

Files added:
- `index.html` — Vite entry
- `src/main.tsx` — mounts `<App />` with `BrowserRouter`, `HelmetProvider`, `QueryClientProvider`
- `src/App.tsx` — route table
- `vite.config.ts` — swap TanStack plugin for plain React SWC plugin, keep `@` alias

## Route map

Public:
- `/` Home (hero, about, departments, doctors, facilities, packages, testimonials, blogs, FAQ, contact, map, footer — all sections stacked)
- `/departments`, `/departments/:slug`
- `/doctors`, `/doctors/:slug`
- `/facilities`
- `/health-packages`
- `/gallery`
- `/blogs`, `/blogs/:slug`
- `/faq`
- `/contact`
- `/appointment` (dedicated booking page)

Admin (all under `<AdminGuard>` wrapper that checks `admins` table):
- `/admin/login`
- `/admin` dashboard
- `/admin/site-settings`, `/hero`, `/about`
- `/admin/departments`, `/doctors`, `/facilities`, `/packages`, `/gallery`, `/testimonials`, `/blogs`, `/faqs`
- `/admin/appointments` (inbox)
- `/admin/seo`

## Design system

- CSS variables in `src/index.css`:
  - `--primary: 210 100% 40%` (#0066CC), `--medical: 158 84% 34%` (#0E9F6E)
  - Soft gray card `#F6F8FB`, white background
- shadcn Button variants: `default` (primary blue), `medical` (green), `emergency` (red pulse)
- Cards with soft shadow, rounded-2xl, hover lift
- Hero: full-bleed background video (muted, loop, poster fallback) with gradient overlay, animated headline, 3 CTAs, stat strip below
- Sticky top nav with emergency phone chip; mobile: drawer nav
- Framer-motion `whileInView` fade-up on section headers

## Database schema (single migration file)

Tables (all with `id uuid pk default gen_random_uuid()`, `created_at`, `updated_at`, most with `sort_order int` + `is_published bool`):

- `site_settings` (singleton row: hospital name, tagline, phone, emergency phone, email, address, social links, map embed url, logo url)
- `hero_sections` (headline, subheadline, video_url, poster_url, cta buttons jsonb, stats jsonb)
- `about_sections` (title, description, mission, vision, video_url, stats jsonb)
- `departments` (name, slug, description, image_url, icon, sort_order, is_published)
- `doctors` (name, slug, qualification, specialty, experience_years, department_id fk, image_url, timings, bio, sort_order, is_published)
- `facilities` (title, description, image_url, video_url, sort_order, is_published)
- `health_packages` (title, price_inr int, features jsonb, is_active, sort_order)
- `gallery` (category enum, media_type enum image|video, url, caption, sort_order)
- `testimonials` (author, rating int, quote, avatar_url, is_published, sort_order)
- `blogs` (title, slug, excerpt, body_md, cover_url, author, published_at, is_published)
- `faqs` (question, answer, sort_order, is_published)
- `appointments` (name, phone, email, department_id, doctor_id, preferred_date, message, honeypot, status enum new|contacted|scheduled|closed, created_at)
- `admins` (user_id fk auth.users, email) — checked by `has_admin(uid)` security-definer function

RLS:
- Public `SELECT` on every content table where `is_published = true` (settings/hero/about always public)
- Public `INSERT` on `appointments` only, with honeypot check via trigger (`raise exception if honeypot <> ''`)
- All writes gated by `has_admin(auth.uid())`
- `admins`: read/write only by admins
- Explicit `GRANT SELECT ON <table> TO anon, authenticated` and full grants for authenticated where policies allow

## Storage buckets

Public read, admin write policies on `storage.objects`:
`hero-media`, `doctor-images`, `gallery`, `blog-images`, `facility-images`, `testimonials`, `hospital-videos`

## Admin panel features

- Email/password login via Supabase Auth
- Dashboard: counts (new appointments today/week, total doctors/departments/blogs), quick links
- Each CRUD screen: shadcn `<DataTable>` with search + toggle publish + edit dialog + delete
- Image upload widget → uploads to bucket, stores public URL
- Reorder screens (departments, gallery, doctors, faqs): `@dnd-kit` sortable list, saves `sort_order` in batch
- Appointments inbox: table with filter by status, detail drawer, status update, CSV export

## SEO

- `<Helmet>` per page: title, description, og tags
- JSON-LD injected in `<App>`: `MedicalClinic` + `LocalBusiness` + `Physician` (per doctor page) + `FAQPage` (on FAQ) + `MedicalWebPage`
- `public/robots.txt` with `Sitemap:` line
- Static `public/sitemap.xml` for main routes; dynamic doctor/dept/blog URLs listed at build time via a small `scripts/generate-sitemap.ts`
- Semantic HTML, single H1 per page, alt text on all images

## Seed data

Migration inserts the exact pre-fill content you provided:
- Site settings (address, phone `+91 90564 37662`, emergency, MashoorBano credit block)
- Hero row with headline/sub/stats
- About row with mission/vision/stats
- 10 departments
- 5 doctors (Rajesh, Neha, Aman, Pankaj, Simran)
- 10 facilities
- 5 health packages with prices
- 4 testimonials
- 5 blog posts (title + placeholder body)
- 6 FAQs
- Stock imagery via Unsplash CDN URLs for every card/doctor/facility so the site looks complete on first load; a hospital-lobby stock MP4 URL for hero video

## Footer

- Logo, address, phone, quick links, social icons
- Bottom strip: MashoorBano logo (generated) + "Website developed by MashoorBano — Atharv Aryan • +91 78147 18340 • Mashoorbano.com"

## Deliverables order

1. Rip out TanStack, install deps, restore Vite SPA scaffold, wire Supabase client with your URL + publishable key
2. Create migration SQL + storage bucket checklist file
3. Build public site (layout, home, all sub-pages) with seeded content wired to Supabase (with graceful fallback to static content if tables empty, so preview works before you run the migration)
4. Build admin auth + guard + all CRUD screens + drag-drop reorder + appointments inbox
5. SEO layer + sitemap/robots + JSON-LD
6. Polish, mobile QA, verify build

## What I need from you next

1. Confirm the plan.
2. **(Optional but recommended)** Paste the real Supabase `service_role` key so I can run migrations, create buckets, and seed the admin user automatically. Otherwise I'll produce a "Run these 3 steps in your Supabase dashboard" checklist and you'll do it manually before login works.
