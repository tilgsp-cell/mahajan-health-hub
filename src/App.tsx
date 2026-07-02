import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import SiteLayout from "@/components/site/SiteLayout";
import Home from "@/pages/Home";
import Departments from "@/pages/Departments";
import Doctors from "@/pages/Doctors";
import Facilities from "@/pages/Facilities";
import Packages from "@/pages/Packages";
import Gallery from "@/pages/Gallery";
import { BlogList, BlogPost } from "@/pages/Blog";
import FAQ from "@/pages/FAQ";
import Contact from "@/pages/Contact";
import Appointment from "@/pages/Appointment";
import NotFound from "@/pages/NotFound";

const AdminLogin = lazy(() => import("@/pages/admin/AdminLogin"));
const AdminLayout = lazy(() => import("@/pages/admin/AdminLayout"));
const AdminDashboard = lazy(() => import("@/pages/admin/AdminDashboard"));
const Appointments = lazy(() => import("@/pages/admin/Appointments"));

import {
  DepartmentsPage, DoctorsPage, FacilitiesPage, PackagesPage, GalleryPage,
  TestimonialsPage, BlogsPage, FaqsPage,
} from "@/pages/admin/CrudPages";
import { SiteSettingsPage, HeroPage, AboutPage, SeoPage } from "@/pages/admin/SingletonPages";

export default function App() {
  return (
    <Suspense fallback={<div className="grid min-h-screen place-items-center text-muted-foreground">Loading…</div>}>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<Home />} />
          <Route path="departments" element={<Departments />} />
          <Route path="doctors" element={<Doctors />} />
          <Route path="facilities" element={<Facilities />} />
          <Route path="health-packages" element={<Packages />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="blogs" element={<BlogList />} />
          <Route path="blogs/:slug" element={<BlogPost />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="contact" element={<Contact />} />
          <Route path="appointment" element={<Appointment />} />
        </Route>

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="site" element={<SiteSettingsPage />} />
          <Route path="hero" element={<HeroPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="departments" element={<DepartmentsPage />} />
          <Route path="doctors" element={<DoctorsPage />} />
          <Route path="facilities" element={<FacilitiesPage />} />
          <Route path="packages" element={<PackagesPage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="testimonials" element={<TestimonialsPage />} />
          <Route path="blogs" element={<BlogsPage />} />
          <Route path="faqs" element={<FaqsPage />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="seo" element={<SeoPage />} />
        </Route>

        <Route path="*" element={<SiteLayout />}>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
