# Mahajan Hospital — Setup Guide

Your website is fully built with realistic seed content and works right now in preview. To enable **appointments**, **admin login**, and the **CMS**, you need to run **three** one-time setup steps in your Supabase dashboard.

## Your Supabase project
- URL: `https://kuuydsyislbirnnadvsh.supabase.co`
- Already wired into `src/integrations/supabase/client.ts` with the publishable key.

---

## Step 1 — Run the SQL migration (creates all tables + seeds content)

1. Open [Supabase Dashboard → SQL Editor](https://supabase.com/dashboard/project/kuuydsyislbirnnadvsh/sql).
2. Click **New query**.
3. Copy the full contents of `supabase/migrations/0001_init.sql` from this project.
4. Paste and click **Run**.

You'll see: tables `site_settings`, `hero_sections`, `about_sections`, `departments`, `doctors`, `facilities`, `health_packages`, `gallery`, `testimonials`, `blogs`, `faqs`, `appointments`, `admins`.

RLS is enabled on all of them:
- Public can **read** published content and **insert** appointments.
- Only rows in the `admins` table can write anything else.

## Step 2 — Create the admin user

1. Open [Supabase Dashboard → Authentication → Users](https://supabase.com/dashboard/project/kuuydsyislbirnnadvsh/auth/users).
2. Click **Add user → Create new user**.
3. Enter:
   - Email: `tilgsp@gmail.com`
   - Password: `admin@22441`
   - ✅ **Auto Confirm User** (so you can log in immediately)
4. After the user is created, copy their **User UID** (visible in the users list).
5. Go back to the **SQL Editor** and run:

   ```sql
   insert into public.admins (user_id, email)
   values ('<PASTE-USER-UID-HERE>', 'tilgsp@gmail.com')
   on conflict (user_id) do nothing;
   ```

6. Log in at `/admin/login`.

> Tip: to also disable "Confirm email" globally so users can sign up without email verification, go to **Authentication → Providers → Email → Confirm email** and turn it off. This is safe for a private admin login setup.

## Step 3 — Create storage buckets (for image uploads from admin)

Go to [Storage](https://supabase.com/dashboard/project/kuuydsyislbirnnadvsh/storage/buckets) and create these buckets, all **Public**:

- `hero-media`
- `doctor-images`
- `gallery`
- `blog-images`
- `facility-images`
- `testimonials`
- `hospital-videos`

For each bucket, add a policy in **Storage → Policies**:
- Name: `admin write`
- Allowed operation: **INSERT, UPDATE, DELETE**
- Target roles: `authenticated`
- Policy: `public.is_admin(auth.uid())`

Public read is enabled automatically when a bucket is set to Public.

---

## What you can do afterwards

- Public site at `/` (Home, Departments, Doctors, Facilities, Packages, Gallery, Blogs, FAQ, Contact, Appointment).
- Admin at `/admin/login` → dashboard, CRUD for everything, drag-and-drop reorder for Departments / Doctors / Gallery / FAQ, appointments inbox with CSV export.
- If any table is empty, the website falls back to the built-in seed content — so nothing looks broken while you set things up.
