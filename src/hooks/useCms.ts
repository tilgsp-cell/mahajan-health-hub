import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  departments as seedDepartments,
  doctors as seedDoctors,
  facilities as seedFacilities,
  packages as seedPackages,
  galleryItems as seedGallery,
  testimonials as seedTestimonials,
  blogs as seedBlogs,
  faqs as seedFaqs,
  heroContent as seedHero,
  about as seedAbout,
  site as seedSite,
} from "@/data/seed";

// Generic fetch + fallback. If Supabase returns rows, use them (mapped).
// Otherwise (empty table, error, offline), fall back to seed data so the
// public site is never blank.
function useCollection<T, R>(
  table: string,
  seed: R[],
  map: (row: T) => R,
  opts?: { order?: string; asc?: boolean; filter?: (q: any) => any },
): R[] {
  const [items, setItems] = useState<R[]>(seed);
  useEffect(() => {
    let cancelled = false;
    (async () => {
      let q: any = supabase.from(table).select("*");
      if (opts?.filter) q = opts.filter(q);
      if (opts?.order) q = q.order(opts.order, { ascending: opts.asc ?? true });
      const { data, error } = await q;
      if (cancelled) return;
      if (!error && data && data.length > 0) setItems((data as T[]).map(map));
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table]);
  return items;
}

function useSingleton<T, R>(table: string, seed: R, map: (row: T) => R): R {
  const [item, setItem] = useState<R>(seed);
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase.from(table).select("*").limit(1).maybeSingle();
      if (cancelled) return;
      if (!error && data) setItem(map(data as T));
    })();
    return () => {
      cancelled = true;
    };
  }, [table]);
  return item;
}

export const useDepartments = () =>
  useCollection<any, typeof seedDepartments[number]>(
    "departments",
    seedDepartments,
    (r) => ({ slug: r.slug, name: r.name, description: r.description ?? "", image: r.image_url ?? "" }),
    { order: "sort_order", asc: true, filter: (q) => q.eq("is_published", true) },
  );

export const useDoctors = () =>
  useCollection<any, typeof seedDoctors[number]>(
    "doctors",
    seedDoctors,
    (r) => ({
      slug: r.slug,
      name: r.name,
      qualification: r.qualification ?? "",
      specialty: r.specialty ?? "",
      experience: r.experience ?? "",
      timings: r.timings ?? "",
      image: r.image_url ?? "",
    }),
    { order: "sort_order", asc: true, filter: (q) => q.eq("is_published", true) },
  );

export const useFacilities = () =>
  useCollection<any, typeof seedFacilities[number]>(
    "facilities",
    seedFacilities,
    (r) => ({ title: r.title, description: r.description ?? "", image: r.image_url ?? "" }),
    { order: "sort_order", asc: true, filter: (q) => q.eq("is_published", true) },
  );

export const usePackages = () =>
  useCollection<any, typeof seedPackages[number]>(
    "health_packages",
    seedPackages,
    (r) => ({
      title: r.title,
      price: r.price_inr ?? 0,
      features: (r.features ?? "")
        .toString()
        .split("\n")
        .map((s: string) => s.trim())
        .filter(Boolean),
    }),
    { order: "sort_order", asc: true, filter: (q) => q.eq("is_active", true) },
  );

export const useGallery = () =>
  useCollection<any, typeof seedGallery[number]>(
    "gallery",
    seedGallery,
    (r) => ({ category: r.category ?? "Hospital Infrastructure", url: r.url, caption: r.caption ?? "" }),
    { order: "sort_order", asc: true },
  );

export const useTestimonials = () =>
  useCollection<any, typeof seedTestimonials[number]>(
    "testimonials",
    seedTestimonials,
    (r) => ({ author: r.author, rating: r.rating ?? 5, quote: r.quote ?? "" }),
    { order: "created_at", asc: false, filter: (q) => q.eq("is_published", true) },
  );

export const useBlogs = () =>
  useCollection<any, typeof seedBlogs[number]>(
    "blogs",
    seedBlogs,
    (r) => ({
      slug: r.slug,
      title: r.title,
      excerpt: r.excerpt ?? "",
      cover: r.cover_url ?? "",
      body: r.body_md ?? "",
    }),
    { order: "published_at", asc: false, filter: (q) => q.eq("is_published", true) },
  );

export const useFaqs = () =>
  useCollection<any, typeof seedFaqs[number]>(
    "faqs",
    seedFaqs,
    (r) => ({ q: r.question, a: r.answer ?? "" }),
    { order: "sort_order", asc: true, filter: (q) => q.eq("is_published", true) },
  );

export const useHero = () =>
  useSingleton<any, typeof seedHero>("hero_sections", seedHero, (r) => ({
    headline: r.headline ?? seedHero.headline,
    subheadline: r.subheadline ?? seedHero.subheadline,
    video_url: r.video_url ?? seedHero.video_url,
    poster: r.poster_url ?? seedHero.poster,
    stats: Array.isArray(r.stats) && r.stats.length ? r.stats : seedHero.stats,
  }));

export const useAbout = () =>
  useSingleton<any, typeof seedAbout>("about_sections", seedAbout, (r) => ({
    title: r.title ?? seedAbout.title,
    description: r.description ?? seedAbout.description,
    mission: r.mission ?? seedAbout.mission,
    vision: r.vision ?? seedAbout.vision,
    stats: Array.isArray(r.stats) && r.stats.length ? r.stats : seedAbout.stats,
  }));

export const useSite = () =>
  useSingleton<any, typeof seedSite & { show_blogs: boolean; show_packages: boolean }>(
    "site_settings",
    { ...seedSite, show_blogs: true, show_packages: true },
    (r) => ({
      ...seedSite,
      name: r.hospital_name ?? seedSite.name,
      tagline: r.tagline ?? seedSite.tagline,
      phone: r.phone ?? seedSite.phone,
      emergency: r.emergency_phone ?? seedSite.emergency,
      email: r.email ?? seedSite.email,
      address_line1: r.address ?? seedSite.address_line1,
      address_line2: "",
      map_embed: r.map_embed_url ?? seedSite.map_embed,
      socials: {
        facebook: r.facebook_url ?? seedSite.socials.facebook,
        instagram: r.instagram_url ?? seedSite.socials.instagram,
        youtube: r.youtube_url ?? seedSite.socials.youtube,
      },
      show_blogs: r.show_blogs !== false,
      show_packages: r.show_packages !== false,
    }),
  );

