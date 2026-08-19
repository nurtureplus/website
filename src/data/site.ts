export const site = {
  name: "Nurture+",
  tagline: "Adds Life.",
  /** Registered entity name, as it should appear on legal/office details.
   *  Distinct from `name`, which is the brand used throughout the UI. */
  legalName: "Nurture Plus Adds Life",
  parentGroup: "A unit of Bhadrakali Groups",
  phone: "+91 888 NURTURE (6878873)",
  phoneHref: "+918886878873",
  email: "nurtureplusaddslife@gmail.com",
  website: "nurtureplus.in",
  address: [
    "43-4-12/1, SF-301",
    "Opp. Indian Oil Petrol Bunk, Railway New Colony",
    "Visakhapatnam, Andhra Pradesh 530016, India",
  ],
  /**
   * Social profiles. Only entries with a URL are rendered — an icon that links
   * to "#" is a dead end, and dead ends erode trust faster than a missing icon.
   * Fill these in and they appear automatically.
   */
  social: {
    linkedin: "",
    instagram: "",
    facebook: "",
  } as Record<"linkedin" | "instagram" | "facebook", string>,
};

export const navLinks = [
  { label: "Products", href: "/products" },
  { label: "About", href: "/about" },
  { label: "Why Us", href: "/why-nurture-plus" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

/**
 * Audience triage — the first decision a visitor makes. Each path is named for
 * what it contains rather than a generic umbrella, so the destination is
 * predictable before the click.
 */
export const audiences = [
  {
    id: "hospitals",
    title: "Hospitals",
    description:
      "Consistent, documented supply for high-volume infusion programs, backed by WHO-GMP manufacturing.",
    action: "Request a quote",
    href: "/contact?enquiry=hospital",
  },
  {
    id: "clinics",
    title: "Clinics",
    description:
      "Wellness, aesthetic and functional medicine practices sourcing physician-directed IV formulations.",
    action: "Explore the range",
    href: "/products",
  },
  {
    id: "distributors",
    title: "Distributors",
    description:
      "A focused, well-documented portfolio with dependable manufacturing behind it. Territories open now.",
    action: "Become a partner",
    href: "/#distributor",
  },
];

export const whyChooseUs = [
  {
    title: "Premium Quality",
    description: "Every formulation is developed with care, science and trust, from ingredient to finished vial.",
  },
  {
    title: "Trusted Manufacturing",
    description: "Every formulation is manufactured under WHO-GMP certified standards with disciplined quality processes.",
  },
  {
    title: "Healthcare Professional Focus",
    description: "Built for physician-directed use across hospitals, clinics and wellness centers.",
  },
  {
    title: "High Purity Ingredients",
    description: "Formulations composed of pharmacopeia-grade actives, clearly declared on every label.",
  },
  {
    title: "Reliable Supply Chain",
    description: "Consistent availability to support clinics and distributors at scale.",
  },
  {
    title: "Consistent Product Standards",
    description: "The same quality and specification in every batch, every vial.",
  },
];

export const productCategories = [
  {
    title: "Cellular Wellness",
    description: "NAD+ formulations built to support cellular energy, repair and long-term vitality.",
    filter: "Cellular Wellness / NAD+",
    icon: "Sparkles",
  },
  {
    title: "Antioxidant Therapy",
    description: "High-strength glutathione formulations for antioxidant support and skin radiance.",
    filter: "Antioxidant",
    icon: "Droplets",
  },
  {
    title: "Essential Minerals",
    description: "Physician-directed mineral formulations for immune function and enzyme support.",
    filter: "Essential Mineral",
    icon: "Atom",
  },
];

export const clinicalBenefits = [
  {
    title: "Cellular Energy Support",
    description: "NAD+ formulations support mitochondrial function, helping cells convert nutrients into usable energy.",
  },
  {
    title: "Antioxidant Defense",
    description: "High-strength glutathione formulations support the body's natural defense against oxidative stress.",
  },
  {
    title: "Immune & Enzyme Function",
    description: "Zinc and vitamin-supported formulations play a role in immune response and enzymatic activity.",
  },
  {
    title: "Physician-Directed Dosing",
    description: "Every formulation is labeled with clear composition and dosage guidance for clinical administration.",
  },
];

export const howItWorks = [
  {
    step: "01",
    title: "Consultation",
    description: "A registered medical practitioner assesses suitability and determines the appropriate formulation.",
  },
  {
    step: "02",
    title: "Sourcing",
    description: "Clinics and distributors order directly through Nurture+ or an authorized distribution partner.",
  },
  {
    step: "03",
    title: "Reconstitution",
    description: "Products are reconstituted per the labeled instructions, immediately before administration.",
  },
  {
    step: "04",
    title: "Administration",
    description: "IV therapy is administered by a qualified healthcare professional under clinical supervision.",
  },
];

export const certifications = [
  {
    title: "WHO-GMP Certified Manufacturing",
    description: "Every Nurture+ formulation is manufactured under WHO-GMP certified standards.",
  },
  {
    title: "Licensed Production",
    description: "Manufactured under a valid state drug manufacturing license, printed on every carton.",
  },
  {
    title: "Tamper-Evident Packaging",
    description: "Single-dose vials and combipacks with flip-off seals for product integrity.",
  },
  {
    title: "Rx / Professional Use Only",
    description: "Distributed exclusively through professional healthcare channels for physician-directed use.",
  },
];

export const faqs = [
  {
    question: "Who can purchase Nurture+ products?",
    answer:
      "Nurture+ products are distributed exclusively through professional healthcare channels — hospitals, clinics, wellness centers and authorized medical distributors. All products are for use as directed by a registered medical practitioner.",
  },
  {
    question: "Are Nurture+ products manufactured under GMP standards?",
    answer:
      "Yes. All Nurture+ formulations are manufactured under WHO-GMP certified standards, with disciplined process control from formulation through fill and finish.",
  },
  {
    question: "How should reconstituted products be stored?",
    answer:
      "Reconstituted solutions should be used immediately and not stored. Unreconstituted vials should be stored as directed on the product label — typically in a cool, dry, dark place, protected from light and moisture.",
  },
  {
    question: "How do I become a Nurture+ distributor?",
    answer:
      "Use the distributor enquiry form on this website, or contact our team directly. We'll review your business details and get in touch to discuss partnership terms.",
  },
  {
    question: "Where can I find full composition and dosage details?",
    answer:
      "Every product page lists full composition, recommended use, packaging and storage information. A downloadable brochure is also available on each product page.",
  },
];

export const qualityPillars = [
  {
    title: "Manufacturing Quality",
    description:
      "Nurture+ products are manufactured under WHO-GMP certified standards, with disciplined process control from formulation to fill.",
  },
  {
    title: "Product Consistency",
    description:
      "Every batch is held to the same specification, so clinics can depend on consistent performance vial to vial.",
  },
  {
    title: "Safe Packaging",
    description:
      "Single-dose, tamper-evident vials and combipacks designed to protect product integrity from storage through administration.",
  },
  {
    title: "Professional Healthcare Distribution",
    description:
      "Distributed through professional healthcare channels, for use as directed by registered medical practitioners.",
  },
];
