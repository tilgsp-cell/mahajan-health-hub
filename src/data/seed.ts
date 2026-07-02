// Static fallback content — used when Supabase tables are empty so the site
// looks complete before/after the SQL migration is run.

export const site = {
  name: "Mahajan Hospital & Eye Care Centre",
  short: "Mahajan Hospital",
  tagline: "Advanced Healthcare with Compassion",
  address_line1: "Near Normal School, Desh Bhagat Nagar",
  address_line2: "Gurdaspur, Punjab 143521",
  phone: "+91 90564 37662",
  emergency: "+91 90564 37662",
  email: "info@mahajanhospital.in",
  map_embed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3384.0!2d75.4083!3d32.0416!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzLCsDAyJzI5LjgiTiA3NcKwMjQnMjkuOSJF!5e0!3m2!1sen!2sin!4v1700000000000",
  socials: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    youtube: "https://youtube.com",
  },
};

export const heroContent = {
  headline: "Advanced Healthcare with Compassion.",
  subheadline:
    "Trusted by families across Gurdaspur for quality medical care and eye treatment.",
  video_url:
    "https://cdn.coverr.co/videos/coverr-a-hospital-hallway-4034/1080p.mp4",
  poster:
    "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1920&q=80",
  stats: [
    { value: "10,000+", label: "Patients Served" },
    { value: "24×7", label: "Emergency" },
    { value: "15+", label: "Medical Specialists" },
    { value: "Modern", label: "Diagnostics" },
  ],
};

export const about = {
  title: "About Mahajan Hospital",
  description:
    "Mahajan Hospital & Eye Care Centre is dedicated to providing compassionate and affordable healthcare services to families in Gurdaspur and nearby regions. The hospital combines experienced doctors, modern technology, and patient-centered care to deliver quality treatment.",
  mission: "To provide accessible and ethical healthcare.",
  vision: "To become the most trusted healthcare institution in the region.",
  stats: [
    { value: "20+", label: "Years of Service" },
    { value: "15+", label: "Specialists" },
    { value: "10,000+", label: "Happy Patients" },
    { value: "24×7", label: "Emergency Support" },
  ],
};

const img = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const departments = [
  { slug: "general-medicine", name: "General Medicine", description: "Comprehensive care for adult illnesses, chronic disease management, preventive check-ups.", image: img("photo-1584982751601-97dcc096659c") },
  { slug: "eye-care", name: "Eye Care & Cataract Services", description: "Advanced ophthalmology, cataract surgery, refractive care and retina services.", image: img("photo-1551601651-2a8555f1a136") },
  { slug: "pediatrics", name: "Pediatrics", description: "Complete child healthcare, vaccinations, growth monitoring and pediatric emergencies.", image: img("photo-1581056771107-24ca5f033842") },
  { slug: "gynecology", name: "Gynecology", description: "Women's health, prenatal & postnatal care, gynecological surgeries.", image: img("photo-1584515933487-779824d29309") },
  { slug: "orthopedics", name: "Orthopedics", description: "Bone, joint and spine care, fracture management, joint replacement.", image: img("photo-1530026405186-ed1f139313f8") },
  { slug: "general-surgery", name: "General Surgery", description: "Laparoscopic and open surgical procedures by experienced surgeons.", image: img("photo-1516549655169-df83a0774514") },
  { slug: "physiotherapy", name: "Physiotherapy", description: "Rehabilitation, pain management and post-surgical recovery.", image: img("photo-1571019613454-1cb2f99b2d8b") },
  { slug: "diagnostics", name: "Diagnostic Services", description: "Digital X-ray, ultrasound, ECG and complete pathology lab.", image: img("photo-1579154204601-01588f351e67") },
  { slug: "emergency", name: "Emergency Medicine", description: "24×7 emergency care with rapid response and stabilization.", image: img("photo-1587351021355-a479a299d2f9") },
  { slug: "checkups", name: "Health Checkups", description: "Preventive health packages for individuals, families and corporates.", image: img("photo-1666214280557-f1b5022eb634") },
];

export const doctors = [
  { slug: "rajesh-mahajan", name: "Dr. Rajesh Mahajan", qualification: "MS Ophthalmology", experience: "20+ Years Experience", specialty: "Eye Specialist", image: img("photo-1612349317150-e413f6a5b16d"), timings: "Mon–Sat, 10:00 AM – 2:00 PM & 5:00 PM – 8:00 PM" },
  { slug: "neha-mahajan", name: "Dr. Neha Mahajan", qualification: "MBBS, DGO", experience: "15+ Years Experience", specialty: "Gynecology & Women's Health", image: img("photo-1594824476967-48c8b964273f"), timings: "Mon–Sat, 11:00 AM – 3:00 PM" },
  { slug: "aman-sharma", name: "Dr. Aman Sharma", qualification: "MD Medicine", experience: "12+ Years Experience", specialty: "General Physician", image: img("photo-1537368910025-700350fe46c7"), timings: "Mon–Sat, 9:00 AM – 1:00 PM & 6:00 PM – 8:00 PM" },
  { slug: "pankaj-gupta", name: "Dr. Pankaj Gupta", qualification: "MS Orthopedics", experience: "18+ Years Experience", specialty: "Bone & Joint Specialist", image: img("photo-1622253692010-333f2da6031d"), timings: "Tue, Thu, Sat, 11:00 AM – 2:00 PM" },
  { slug: "simran-kaur", name: "Dr. Simran Kaur", qualification: "MD Pediatrics", experience: "10+ Years Experience", specialty: "Child Specialist", image: img("photo-1559839734-2b71ea197ec2"), timings: "Mon–Sat, 10:00 AM – 1:00 PM & 5:00 PM – 7:00 PM" },
];

export const facilities = [
  { title: "24×7 Emergency", description: "Round-the-clock emergency response with trained staff.", image: img("photo-1587351021355-a479a299d2f9") },
  { title: "ICU", description: "Fully equipped intensive care unit with cardiac monitoring.", image: img("photo-1516549655169-df83a0774514") },
  { title: "Operation Theatre", description: "Modular OT with modern anesthesia and surgical systems.", image: img("photo-1579684385127-1ef15d508118") },
  { title: "Digital X-Ray", description: "High-resolution digital radiography with instant reports.", image: img("photo-1666214280557-f1b5022eb634") },
  { title: "Pathology Laboratory", description: "Full-spectrum blood, urine and biochemistry testing.", image: img("photo-1579154204601-01588f351e67") },
  { title: "Pharmacy", description: "In-house pharmacy with round-the-clock availability.", image: img("photo-1587854692152-cbe660dbde88") },
  { title: "Ambulance Services", description: "Well-equipped ambulance with paramedic support.", image: img("photo-1587268322891-6e42b18ea22c") },
  { title: "Eye Surgery Unit", description: "Advanced phaco-emulsification for painless cataract surgery.", image: img("photo-1551601651-2a8555f1a136") },
  { title: "Ultrasound", description: "Color doppler ultrasound with expert radiologist reporting.", image: img("photo-1584515933487-779824d29309") },
  { title: "Health Packages", description: "Curated preventive health screenings for every age group.", image: img("photo-1631217868264-e5b90bb7e133") },
];

export const packages = [
  { title: "Full Body Checkup", price: 1499, features: ["CBC, Lipid, LFT, KFT", "Blood Sugar (F/PP)", "ECG + Chest X-Ray", "Physician Consultation"] },
  { title: "Diabetes Package", price: 999, features: ["HbA1c", "Fasting & PP Sugar", "Urine Micro-albumin", "Diabetologist Consult"] },
  { title: "Cardiac Screening", price: 1999, features: ["ECG", "2D Echo", "TMT (Stress Test)", "Cardiologist Consult"] },
  { title: "Women's Wellness Package", price: 1799, features: ["Pap Smear", "Ultrasound Abdomen/Pelvis", "Thyroid Profile", "Gynecologist Consult"] },
  { title: "Senior Citizen Package", price: 1299, features: ["Full Body Screening", "Vitamin B12 & D", "ECG + X-Ray", "Physician Consult"] },
];

export const galleryItems = [
  { category: "Hospital Infrastructure", url: img("photo-1586773860418-d37222d8fce3", 1200), caption: "Main entrance" },
  { category: "Hospital Infrastructure", url: img("photo-1519494026892-80bbd2d6fd0d", 1200), caption: "Reception area" },
  { category: "Doctors", url: img("photo-1612349317150-e413f6a5b16d", 1200), caption: "Dr. Rajesh Mahajan" },
  { category: "Doctors", url: img("photo-1594824476967-48c8b964273f", 1200), caption: "Dr. Neha Mahajan" },
  { category: "Facilities", url: img("photo-1579684385127-1ef15d508118", 1200), caption: "Modular OT" },
  { category: "Facilities", url: img("photo-1516549655169-df83a0774514", 1200), caption: "ICU" },
  { category: "Health Camps", url: img("photo-1631815588090-d1bcbe9a8537", 1200), caption: "Free eye camp" },
  { category: "Events", url: img("photo-1576091160399-112ba8d25d1d", 1200), caption: "Annual health day" },
  { category: "Patient Awareness Programs", url: img("photo-1666214280557-f1b5022eb634", 1200), caption: "Diabetes awareness talk" },
];

export const testimonials = [
  { author: "Rajinder Singh", rating: 5, quote: "Professional doctors and excellent care." },
  { author: "Pooja Sharma", rating: 5, quote: "Very satisfied with the eye treatment." },
  { author: "Harpreet Kaur", rating: 5, quote: "Clean facilities and friendly staff." },
  { author: "Amit Verma", rating: 5, quote: "Quick emergency response and good doctors." },
];

export const blogs = [
  { slug: "latest-eye-care-tips", title: "Latest Eye Care Tips", excerpt: "Simple daily habits to keep your eyes healthy in a screen-heavy world.", cover: img("photo-1551601651-2a8555f1a136", 1200), body: "Protect your eyes with the 20-20-20 rule, regular check-ups, UV protection, and a diet rich in leafy greens. Blink often, adjust screen brightness and take breaks." },
  { slug: "managing-diabetes", title: "Managing Diabetes", excerpt: "Practical tips to keep your blood sugar under control.", cover: img("photo-1579154204601-01588f351e67", 1200), body: "Follow a balanced diet, exercise 30 minutes a day, monitor sugar regularly, and take medications as prescribed. Regular HbA1c testing helps track long-term control." },
  { slug: "heart-health-guide", title: "Heart Health Guide", excerpt: "Everyday steps to keep your heart strong.", cover: img("photo-1530026405186-ed1f139313f8", 1200), body: "Avoid tobacco, manage stress, eat heart-healthy foods, and get regular BP & cholesterol screenings." },
  { slug: "child-vaccination-schedule", title: "Child Vaccination Schedule", excerpt: "A parent's guide to timely immunization.", cover: img("photo-1581056771107-24ca5f033842", 1200), body: "Follow the IAP vaccination schedule. BCG, OPV, Hepatitis B at birth; DPT boosters at 6, 10, 14 weeks; MMR at 9 months; and periodic boosters after." },
  { slug: "monsoon-health-precautions", title: "Monsoon Health Precautions", excerpt: "Stay healthy during the rainy season.", cover: img("photo-1587351021355-a479a299d2f9", 1200), body: "Drink boiled water, avoid street food, use mosquito repellents, keep surroundings dry, and get seasonal flu vaccination." },
];

export const faqs = [
  { q: "Do I need an appointment?", a: "Walk-ins are welcome during OPD hours, but appointments are recommended for shorter wait times." },
  { q: "Can I walk in during emergencies?", a: "Yes. Our Emergency Department operates 24×7. Just arrive at the emergency entrance." },
  { q: "What are the OPD timings?", a: "OPD runs from 9:00 AM to 8:00 PM Monday to Saturday, and 10:00 AM to 1:00 PM on Sunday." },
  { q: "Do you offer eye surgery?", a: "Yes. We offer cataract surgery (phaco), refractive care and other ophthalmology procedures." },
  { q: "Do you accept insurance?", a: "We work with major insurance providers and TPAs. Please carry your card at admission." },
  { q: "How can I get test reports?", a: "Reports are available at the pathology desk and can also be emailed on request." },
];
