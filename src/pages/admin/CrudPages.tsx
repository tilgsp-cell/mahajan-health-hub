import CrudManager, { FieldDef } from "./CrudManager";

export const DepartmentsPage = () => <CrudManager table="departments" title="Departments" orderable
  fields={[
    { name: "name", label: "Name", type: "text" },
    { name: "slug", label: "Slug", type: "text" },
    { name: "description", label: "Description", type: "textarea" },
    { name: "image_url", label: "Image URL", type: "url" },
    { name: "sort_order", label: "Sort Order", type: "number" },
    { name: "is_published", label: "Published", type: "switch" },
  ] as FieldDef[]}
  columns={[{ key: "name", label: "Name" }, { key: "slug", label: "Slug" }]}
/>;

export const DoctorsPage = () => <CrudManager table="doctors" title="Doctors" orderable
  fields={[
    { name: "name", label: "Name", type: "text" },
    { name: "slug", label: "Slug", type: "text" },
    { name: "qualification", label: "Qualification", type: "text" },
    { name: "specialty", label: "Specialty", type: "text" },
    { name: "experience", label: "Experience", type: "text" },
    { name: "timings", label: "Timings", type: "text" },
    { name: "image_url", label: "Image URL", type: "url" },
    { name: "bio", label: "Bio", type: "textarea" },
    { name: "sort_order", label: "Sort Order", type: "number" },
    { name: "is_published", label: "Published", type: "switch" },
  ] as FieldDef[]}
  columns={[{ key: "name", label: "Name" }, { key: "specialty", label: "Specialty" }]}
/>;

export const FacilitiesPage = () => <CrudManager table="facilities" title="Facilities"
  fields={[
    { name: "title", label: "Title", type: "text" },
    { name: "description", label: "Description", type: "textarea" },
    { name: "image_url", label: "Image URL", type: "url" },
    { name: "video_url", label: "Video URL", type: "url" },
    { name: "sort_order", label: "Sort Order", type: "number" },
    { name: "is_published", label: "Published", type: "switch" },
  ] as FieldDef[]}
  columns={[{ key: "title", label: "Title" }]}
/>;

export const PackagesPage = () => <CrudManager table="health_packages" title="Health Packages"
  fields={[
    { name: "title", label: "Title", type: "text" },
    { name: "price_inr", label: "Price (₹)", type: "number" },
    { name: "features", label: "Features (one per line)", type: "textarea" },
    { name: "sort_order", label: "Sort Order", type: "number" },
    { name: "is_active", label: "Active", type: "switch" },
  ] as FieldDef[]}
  columns={[{ key: "title", label: "Title" }, { key: "price_inr", label: "Price" }]}
/>;

export const GalleryPage = () => <CrudManager table="gallery" title="Gallery" orderable
  fields={[
    { name: "category", label: "Category", type: "select", options: ["Hospital Infrastructure", "Doctors", "Facilities", "Health Camps", "Events", "Patient Awareness Programs"] },
    { name: "url", label: "Image / Video URL", type: "url" },
    { name: "caption", label: "Caption", type: "text" },
    { name: "media_type", label: "Type", type: "select", options: ["image", "video"] },
    { name: "sort_order", label: "Sort Order", type: "number" },
  ] as FieldDef[]}
  columns={[{ key: "category", label: "Category" }, { key: "caption", label: "Caption" }]}
/>;

export const TestimonialsPage = () => <CrudManager table="testimonials" title="Testimonials"
  fields={[
    { name: "author", label: "Author", type: "text" },
    { name: "rating", label: "Rating (1-5)", type: "number" },
    { name: "quote", label: "Quote", type: "textarea" },
    { name: "avatar_url", label: "Avatar URL", type: "url" },
    { name: "is_published", label: "Published", type: "switch" },
  ] as FieldDef[]}
  columns={[{ key: "author", label: "Author" }, { key: "rating", label: "Rating" }]}
/>;

export const BlogsPage = () => <CrudManager table="blogs" title="Blogs"
  fields={[
    { name: "title", label: "Title", type: "text" },
    { name: "slug", label: "Slug", type: "text" },
    { name: "excerpt", label: "Excerpt", type: "textarea" },
    { name: "body_md", label: "Body (Markdown)", type: "textarea" },
    { name: "cover_url", label: "Cover URL", type: "url" },
    { name: "author", label: "Author", type: "text" },
    { name: "is_published", label: "Published", type: "switch" },
  ] as FieldDef[]}
  columns={[{ key: "title", label: "Title" }, { key: "author", label: "Author" }]}
/>;

export const FaqsPage = () => <CrudManager table="faqs" title="FAQ" orderable
  fields={[
    { name: "question", label: "Question", type: "text" },
    { name: "answer", label: "Answer", type: "textarea" },
    { name: "sort_order", label: "Sort Order", type: "number" },
    { name: "is_published", label: "Published", type: "switch" },
  ] as FieldDef[]}
  columns={[{ key: "question", label: "Question" }]}
/>;
