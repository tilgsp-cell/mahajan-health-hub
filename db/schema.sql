-- ============================================================================
-- Mahajan Hospital & Eye Care Centre — Supabase schema
-- Run this SQL in your Supabase Dashboard → SQL Editor → New query
-- ============================================================================

create extension if not exists "pgcrypto";

-- ---------- ADMIN ROLE HELPER ------------------------------------------------
create table if not exists public.admins (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  email text not null,
  created_at timestamptz not null default now()
);
grant select on public.admins to authenticated;
grant all on public.admins to service_role;
alter table public.admins enable row level security;

create or replace function public.is_admin(_uid uuid)
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.admins where user_id = _uid) $$;

drop policy if exists "admins read own" on public.admins;
create policy "admins read own" on public.admins for select to authenticated
  using (user_id = auth.uid() or public.is_admin(auth.uid()));

-- ---------- SITE SETTINGS (singleton) ---------------------------------------
create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  hospital_name text default 'Mahajan Hospital & Eye Care Centre',
  tagline text, phone text, emergency_phone text, email text, address text,
  map_embed_url text, logo_url text,
  facebook_url text, instagram_url text, youtube_url text,
  seo_title text, seo_description text, seo_keywords text, og_image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.site_settings to anon, authenticated;
grant all on public.site_settings to authenticated, service_role;
alter table public.site_settings enable row level security;
drop policy if exists "public read" on public.site_settings;
create policy "public read" on public.site_settings for select to anon, authenticated using (true);
drop policy if exists "admin write" on public.site_settings;
create policy "admin write" on public.site_settings for all to authenticated
  using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));

-- ---------- HERO ------------------------------------------------------------
create table if not exists public.hero_sections (
  id uuid primary key default gen_random_uuid(),
  headline text, subheadline text, video_url text, poster_url text,
  stats jsonb default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.hero_sections to anon, authenticated;
grant all on public.hero_sections to authenticated, service_role;
alter table public.hero_sections enable row level security;
drop policy if exists "public read" on public.hero_sections;
create policy "public read" on public.hero_sections for select to anon, authenticated using (true);
drop policy if exists "admin write" on public.hero_sections;
create policy "admin write" on public.hero_sections for all to authenticated
  using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));

-- ---------- ABOUT -----------------------------------------------------------
create table if not exists public.about_sections (
  id uuid primary key default gen_random_uuid(),
  title text, description text, mission text, vision text, video_url text,
  stats jsonb default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.about_sections to anon, authenticated;
grant all on public.about_sections to authenticated, service_role;
alter table public.about_sections enable row level security;
drop policy if exists "public read" on public.about_sections;
create policy "public read" on public.about_sections for select to anon, authenticated using (true);
drop policy if exists "admin write" on public.about_sections;
create policy "admin write" on public.about_sections for all to authenticated
  using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));

-- ---------- DEPARTMENTS -----------------------------------------------------
create table if not exists public.departments (
  id uuid primary key default gen_random_uuid(),
  name text not null, slug text unique not null,
  description text, image_url text,
  sort_order int default 0, is_published bool default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.departments to anon, authenticated;
grant all on public.departments to authenticated, service_role;
alter table public.departments enable row level security;
drop policy if exists "public read" on public.departments;
create policy "public read" on public.departments for select to anon, authenticated using (is_published);
drop policy if exists "admin all" on public.departments;
create policy "admin all" on public.departments for all to authenticated
  using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));

-- ---------- DOCTORS ---------------------------------------------------------
create table if not exists public.doctors (
  id uuid primary key default gen_random_uuid(),
  name text not null, slug text unique not null,
  qualification text, specialty text, experience text, timings text,
  bio text, image_url text,
  sort_order int default 0, is_published bool default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.doctors to anon, authenticated;
grant all on public.doctors to authenticated, service_role;
alter table public.doctors enable row level security;
drop policy if exists "public read" on public.doctors;
create policy "public read" on public.doctors for select to anon, authenticated using (is_published);
drop policy if exists "admin all" on public.doctors;
create policy "admin all" on public.doctors for all to authenticated
  using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));

-- ---------- FACILITIES ------------------------------------------------------
create table if not exists public.facilities (
  id uuid primary key default gen_random_uuid(),
  title text not null, description text, image_url text, video_url text,
  sort_order int default 0, is_published bool default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.facilities to anon, authenticated;
grant all on public.facilities to authenticated, service_role;
alter table public.facilities enable row level security;
drop policy if exists "public read" on public.facilities;
create policy "public read" on public.facilities for select to anon, authenticated using (is_published);
drop policy if exists "admin all" on public.facilities;
create policy "admin all" on public.facilities for all to authenticated
  using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));

-- ---------- HEALTH PACKAGES -------------------------------------------------
create table if not exists public.health_packages (
  id uuid primary key default gen_random_uuid(),
  title text not null, price_inr int, features text,
  sort_order int default 0, is_active bool default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.health_packages to anon, authenticated;
grant all on public.health_packages to authenticated, service_role;
alter table public.health_packages enable row level security;
drop policy if exists "public read" on public.health_packages;
create policy "public read" on public.health_packages for select to anon, authenticated using (is_active);
drop policy if exists "admin all" on public.health_packages;
create policy "admin all" on public.health_packages for all to authenticated
  using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));

-- ---------- GALLERY ---------------------------------------------------------
create table if not exists public.gallery (
  id uuid primary key default gen_random_uuid(),
  category text, media_type text default 'image',
  url text not null, caption text,
  sort_order int default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.gallery to anon, authenticated;
grant all on public.gallery to authenticated, service_role;
alter table public.gallery enable row level security;
drop policy if exists "public read" on public.gallery;
create policy "public read" on public.gallery for select to anon, authenticated using (true);
drop policy if exists "admin all" on public.gallery;
create policy "admin all" on public.gallery for all to authenticated
  using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));

-- ---------- TESTIMONIALS ----------------------------------------------------
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  author text not null, rating int default 5, quote text, avatar_url text,
  is_published bool default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.testimonials to anon, authenticated;
grant all on public.testimonials to authenticated, service_role;
alter table public.testimonials enable row level security;
drop policy if exists "public read" on public.testimonials;
create policy "public read" on public.testimonials for select to anon, authenticated using (is_published);
drop policy if exists "admin all" on public.testimonials;
create policy "admin all" on public.testimonials for all to authenticated
  using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));

-- ---------- BLOGS -----------------------------------------------------------
create table if not exists public.blogs (
  id uuid primary key default gen_random_uuid(),
  title text not null, slug text unique not null,
  excerpt text, body_md text, cover_url text, author text,
  published_at timestamptz default now(), is_published bool default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.blogs to anon, authenticated;
grant all on public.blogs to authenticated, service_role;
alter table public.blogs enable row level security;
drop policy if exists "public read" on public.blogs;
create policy "public read" on public.blogs for select to anon, authenticated using (is_published);
drop policy if exists "admin all" on public.blogs;
create policy "admin all" on public.blogs for all to authenticated
  using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));

-- ---------- FAQ -------------------------------------------------------------
create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null, answer text,
  sort_order int default 0, is_published bool default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.faqs to anon, authenticated;
grant all on public.faqs to authenticated, service_role;
alter table public.faqs enable row level security;
drop policy if exists "public read" on public.faqs;
create policy "public read" on public.faqs for select to anon, authenticated using (is_published);
drop policy if exists "admin all" on public.faqs;
create policy "admin all" on public.faqs for all to authenticated
  using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));

-- ---------- APPOINTMENTS ----------------------------------------------------
create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  name text not null, phone text not null, email text,
  department text, doctor text, preferred_date text, message text,
  status text default 'new' check (status in ('new','contacted','scheduled','closed')),
  created_at timestamptz not null default now()
);
grant select, insert, update, delete on public.appointments to authenticated;
grant insert on public.appointments to anon;
grant all on public.appointments to service_role;
alter table public.appointments enable row level security;
drop policy if exists "public insert" on public.appointments;
create policy "public insert" on public.appointments for insert to anon, authenticated with check (true);
drop policy if exists "admin read" on public.appointments;
create policy "admin read" on public.appointments for select to authenticated using (public.is_admin(auth.uid()));
drop policy if exists "admin update" on public.appointments;
create policy "admin update" on public.appointments for update to authenticated
  using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));
drop policy if exists "admin delete" on public.appointments;
create policy "admin delete" on public.appointments for delete to authenticated using (public.is_admin(auth.uid()));

-- ============================================================================
-- SEED DATA (mirrors the static content in src/data/seed.ts)
-- ============================================================================

insert into public.site_settings (hospital_name, tagline, phone, emergency_phone, email, address, map_embed_url)
select 'Mahajan Hospital & Eye Care Centre',
       'Advanced Healthcare with Compassion',
       '+91 90564 37662','+91 90564 37662','info@mahajanhospital.in',
       'Near Normal School, Desh Bhagat Nagar, Gurdaspur, Punjab 143521',
       'https://www.google.com/maps?q=Desh+Bhagat+Nagar+Gurdaspur&output=embed'
where not exists (select 1 from public.site_settings);

insert into public.hero_sections (headline, subheadline, video_url, poster_url, stats)
select 'Advanced Healthcare with Compassion.',
       'Trusted by families across Gurdaspur for quality medical care and eye treatment.',
       'https://cdn.coverr.co/videos/coverr-a-hospital-hallway-4034/1080p.mp4',
       'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1920&q=80',
       '[{"value":"10,000+","label":"Patients Served"},{"value":"24×7","label":"Emergency"},{"value":"15+","label":"Medical Specialists"},{"value":"Modern","label":"Diagnostics"}]'::jsonb
where not exists (select 1 from public.hero_sections);

insert into public.about_sections (title, description, mission, vision, stats)
select 'About Mahajan Hospital',
       'Mahajan Hospital & Eye Care Centre is dedicated to providing compassionate and affordable healthcare services to families in Gurdaspur and nearby regions. The hospital combines experienced doctors, modern technology, and patient-centered care to deliver quality treatment.',
       'To provide accessible and ethical healthcare.',
       'To become the most trusted healthcare institution in the region.',
       '[{"value":"20+","label":"Years of Service"},{"value":"15+","label":"Specialists"},{"value":"10,000+","label":"Happy Patients"},{"value":"24×7","label":"Emergency Support"}]'::jsonb
where not exists (select 1 from public.about_sections);

insert into public.departments (name, slug, description, image_url, sort_order) values
 ('General Medicine','general-medicine','Comprehensive care for adult illnesses, chronic disease management, preventive check-ups.','https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=800&q=80',0),
 ('Eye Care & Cataract Services','eye-care','Advanced ophthalmology, cataract surgery, refractive care and retina services.','https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=800&q=80',1),
 ('Pediatrics','pediatrics','Complete child healthcare, vaccinations, growth monitoring and pediatric emergencies.','https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&w=800&q=80',2),
 ('Gynecology','gynecology','Women''s health, prenatal & postnatal care, gynecological surgeries.','https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80',3),
 ('Orthopedics','orthopedics','Bone, joint and spine care, fracture management, joint replacement.','https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=800&q=80',4),
 ('General Surgery','general-surgery','Laparoscopic and open surgical procedures by experienced surgeons.','https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',5),
 ('Physiotherapy','physiotherapy','Rehabilitation, pain management and post-surgical recovery.','https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80',6),
 ('Diagnostic Services','diagnostics','Digital X-ray, ultrasound, ECG and complete pathology lab.','https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80',7),
 ('Emergency Medicine','emergency','24×7 emergency care with rapid response and stabilization.','https://images.unsplash.com/photo-1587351021355-a479a299d2f9?auto=format&fit=crop&w=800&q=80',8),
 ('Health Checkups','checkups','Preventive health packages for individuals, families and corporates.','https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&w=800&q=80',9)
on conflict (slug) do nothing;

insert into public.doctors (name, slug, qualification, specialty, experience, timings, image_url, sort_order) values
 ('Dr. Rajesh Mahajan','rajesh-mahajan','MS Ophthalmology','Eye Specialist','20+ Years Experience','Mon–Sat, 10:00 AM – 2:00 PM & 5:00 PM – 8:00 PM','https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80',0),
 ('Dr. Neha Mahajan','neha-mahajan','MBBS, DGO','Gynecology & Women''s Health','15+ Years Experience','Mon–Sat, 11:00 AM – 3:00 PM','https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=800&q=80',1),
 ('Dr. Aman Sharma','aman-sharma','MD Medicine','General Physician','12+ Years Experience','Mon–Sat, 9:00 AM – 1:00 PM & 6:00 PM – 8:00 PM','https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=800&q=80',2),
 ('Dr. Pankaj Gupta','pankaj-gupta','MS Orthopedics','Bone & Joint Specialist','18+ Years Experience','Tue, Thu, Sat, 11:00 AM – 2:00 PM','https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80',3),
 ('Dr. Simran Kaur','simran-kaur','MD Pediatrics','Child Specialist','10+ Years Experience','Mon–Sat, 10:00 AM – 1:00 PM & 5:00 PM – 7:00 PM','https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80',4)
on conflict (slug) do nothing;

insert into public.facilities (title, description, image_url, sort_order) values
 ('24×7 Emergency','Round-the-clock emergency response with trained staff.','https://images.unsplash.com/photo-1587351021355-a479a299d2f9?auto=format&fit=crop&w=800&q=80',0),
 ('ICU','Fully equipped intensive care unit with cardiac monitoring.','https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',1),
 ('Operation Theatre','Modular OT with modern anesthesia and surgical systems.','https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',2),
 ('Digital X-Ray','High-resolution digital radiography with instant reports.','https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&w=800&q=80',3),
 ('Pathology Laboratory','Full-spectrum blood, urine and biochemistry testing.','https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80',4),
 ('Pharmacy','In-house pharmacy with round-the-clock availability.','https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=800&q=80',5),
 ('Ambulance Services','Well-equipped ambulance with paramedic support.','https://images.unsplash.com/photo-1587268322891-6e42b18ea22c?auto=format&fit=crop&w=800&q=80',6),
 ('Eye Surgery Unit','Advanced phaco-emulsification for painless cataract surgery.','https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=800&q=80',7),
 ('Ultrasound','Color doppler ultrasound with expert radiologist reporting.','https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80',8),
 ('Health Packages','Curated preventive health screenings for every age group.','https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=800&q=80',9)
on conflict do nothing;

insert into public.health_packages (title, price_inr, features, sort_order) values
 ('Full Body Checkup',1499,E'CBC, Lipid, LFT, KFT\nBlood Sugar (F/PP)\nECG + Chest X-Ray\nPhysician Consultation',0),
 ('Diabetes Package',999,E'HbA1c\nFasting & PP Sugar\nUrine Micro-albumin\nDiabetologist Consult',1),
 ('Cardiac Screening',1999,E'ECG\n2D Echo\nTMT (Stress Test)\nCardiologist Consult',2),
 ('Women''s Wellness Package',1799,E'Pap Smear\nUltrasound Abdomen/Pelvis\nThyroid Profile\nGynecologist Consult',3),
 ('Senior Citizen Package',1299,E'Full Body Screening\nVitamin B12 & D\nECG + X-Ray\nPhysician Consult',4)
on conflict do nothing;

insert into public.gallery (category, url, caption, sort_order) values
 ('Hospital Infrastructure','https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80','Main entrance',0),
 ('Hospital Infrastructure','https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80','Reception area',1),
 ('Doctors','https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=1200&q=80','Dr. Rajesh Mahajan',2),
 ('Doctors','https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=1200&q=80','Dr. Neha Mahajan',3),
 ('Facilities','https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80','Modular OT',4),
 ('Facilities','https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80','ICU',5),
 ('Health Camps','https://images.unsplash.com/photo-1631815588090-d1bcbe9a8537?auto=format&fit=crop&w=1200&q=80','Free eye camp',6),
 ('Events','https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80','Annual health day',7),
 ('Patient Awareness Programs','https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&w=1200&q=80','Diabetes awareness talk',8)
on conflict do nothing;

insert into public.testimonials (author, rating, quote) values
 ('Rajinder Singh',5,'Professional doctors and excellent care.'),
 ('Pooja Sharma',5,'Very satisfied with the eye treatment.'),
 ('Harpreet Kaur',5,'Clean facilities and friendly staff.'),
 ('Amit Verma',5,'Quick emergency response and good doctors.')
on conflict do nothing;

insert into public.blogs (title, slug, excerpt, body_md, cover_url, author) values
 ('Latest Eye Care Tips','latest-eye-care-tips','Simple daily habits to keep your eyes healthy in a screen-heavy world.','Protect your eyes with the 20-20-20 rule, regular check-ups, UV protection, and a diet rich in leafy greens.','https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=1200&q=80','Dr. Rajesh Mahajan'),
 ('Managing Diabetes','managing-diabetes','Practical tips to keep your blood sugar under control.','Follow a balanced diet, exercise 30 minutes a day, monitor sugar regularly.','https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1200&q=80','Dr. Aman Sharma'),
 ('Heart Health Guide','heart-health-guide','Everyday steps to keep your heart strong.','Avoid tobacco, manage stress, eat heart-healthy foods.','https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=1200&q=80','Dr. Aman Sharma'),
 ('Child Vaccination Schedule','child-vaccination-schedule','A parent''s guide to timely immunization.','Follow the IAP vaccination schedule for your child.','https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&w=1200&q=80','Dr. Simran Kaur'),
 ('Monsoon Health Precautions','monsoon-health-precautions','Stay healthy during the rainy season.','Drink boiled water, avoid street food, use mosquito repellents.','https://images.unsplash.com/photo-1587351021355-a479a299d2f9?auto=format&fit=crop&w=1200&q=80','Mahajan Hospital')
on conflict (slug) do nothing;

insert into public.faqs (question, answer, sort_order) values
 ('Do I need an appointment?','Walk-ins are welcome during OPD hours, but appointments are recommended for shorter wait times.',0),
 ('Can I walk in during emergencies?','Yes. Our Emergency Department operates 24×7. Just arrive at the emergency entrance.',1),
 ('What are the OPD timings?','OPD runs from 9:00 AM to 8:00 PM Monday to Saturday, and 10:00 AM to 1:00 PM on Sunday.',2),
 ('Do you offer eye surgery?','Yes. We offer cataract surgery (phaco), refractive care and other ophthalmology procedures.',3),
 ('Do you accept insurance?','We work with major insurance providers and TPAs. Please carry your card at admission.',4),
 ('How can I get test reports?','Reports are available at the pathology desk and can also be emailed on request.',5)
on conflict do nothing;
