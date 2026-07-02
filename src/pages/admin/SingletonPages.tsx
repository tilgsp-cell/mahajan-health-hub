import SingletonEditor from "./SingletonEditor";

export const SiteSettingsPage = () => <SingletonEditor table="site_settings" title="Site Settings" fields={[
  { name: "hospital_name", label: "Hospital Name" },
  { name: "tagline", label: "Tagline" },
  { name: "phone", label: "Phone" },
  { name: "emergency_phone", label: "Emergency Phone" },
  { name: "email", label: "Email" },
  { name: "address", label: "Address", type: "textarea" },
  { name: "map_embed_url", label: "Google Map Embed URL", type: "url" },
  { name: "logo_url", label: "Logo URL", type: "url" },
  { name: "facebook_url", label: "Facebook URL", type: "url" },
  { name: "instagram_url", label: "Instagram URL", type: "url" },
  { name: "youtube_url", label: "YouTube URL", type: "url" },
]} />;

export const HeroPage = () => <SingletonEditor table="hero_sections" title="Hero Section" fields={[
  { name: "headline", label: "Headline" },
  { name: "subheadline", label: "Subheadline", type: "textarea" },
  { name: "video_url", label: "Background Video URL", type: "url" },
  { name: "poster_url", label: "Poster Image URL", type: "url" },
  { name: "stats", label: "Stats (JSON array)", type: "json" },
]} />;

export const AboutPage = () => <SingletonEditor table="about_sections" title="About Section" fields={[
  { name: "title", label: "Title" },
  { name: "description", label: "Description", type: "textarea" },
  { name: "mission", label: "Mission", type: "textarea" },
  { name: "vision", label: "Vision", type: "textarea" },
  { name: "video_url", label: "Video URL", type: "url" },
  { name: "stats", label: "Stats (JSON array)", type: "json" },
]} />;

export const SeoPage = () => <SingletonEditor table="site_settings" title="SEO Settings" fields={[
  { name: "seo_title", label: "Site Title" },
  { name: "seo_description", label: "Meta Description", type: "textarea" },
  { name: "seo_keywords", label: "Keywords" },
  { name: "og_image_url", label: "Open Graph Image URL", type: "url" },
]} />;
