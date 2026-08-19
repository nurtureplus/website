export type Product = {
  slug: string;
  name: string;
  line: string;
  tagline?: string;
  category: string;
  strength: string;
  image: string;
  brochure: string;
  accent: "rose" | "violet" | "sky" | "magenta";
  shortDescription: string;
  description: string[];
  benefits: string[];
  composition: { label: string; value: string }[];
  recommendedUse: string[];
  packaging: string[];
  storage: string[];
};

export const products: Product[] = [
  {
    slug: "elixir-plus",
    name: "Elixir+NAD",
    line: "Nurture+",
    tagline: "Revitalize · Repair · Renew",
    category: "Cellular Wellness / NAD+",
    strength: "500 mg",
    image: "/products/elixir.jpg",
    brochure: "/brochures/elixir-plus.pdf",
    accent: "magenta",
    shortDescription:
      "A premium NAD+ (Nicotinamide Adenine Dinucleotide) formulation for IV use, developed to support cellular energy, repair and long-term vitality.",
    description: [
      "Elixir+NAD is a next-generation wellness formulation designed to support energy, repair, beauty and long-term vitality, inspired by advanced longevity science.",
      "NAD+ works by helping cells turn food into energy inside the mitochondria. It activates enzymes that repair damaged DNA and protect cells from aging and stress, and supports healthy gene expression that allows cells to function properly.",
      "As NAD+ levels decline with age, these processes slow and energy decreases. Restoring NAD+ helps restart these systems, supporting energy, repair and overall cell health.",
    ],
    benefits: [
      "Boosts daily energy and stamina",
      "Supports brain function and focus",
      "Promotes youthful skin and tissue health",
      "Helps in detox and cellular cleansing",
      "Supports healthy aging",
      "Enhances recovery from stress and fatigue",
      "Improves overall vitality",
      "Supports the function of telomeres",
    ],
    composition: [{ label: "Nicotinamide Adenine Dinucleotide (NAD+)", value: "500 mg" }],
    recommendedUse: ["For IV use only.", "As directed by the physician."],
    packaging: ["Single vial, for IV use only."],
    storage: ["As directed by the physician administering the infusion."],
  },
  {
    slug: "gluta-plus-ultra",
    name: "GLUTA+ Ultra",
    line: "Nurture+",
    category: "Antioxidant / Glutathione",
    strength: "1200 mg",
    image: "/products/gluta-ultra.jpg",
    brochure: "/brochures/gluta-plus-ultra.pdf",
    accent: "rose",
    shortDescription:
      "Glutathione for Injection 1200 mg — a high-strength antioxidant combipack pairing a lyophilized glutathione vial with a Vitamin C ampoule, for IV/IM use.",
    description: [
      "GLUTA+ Ultra is supplied as a two-unit combipack: a lyophilized glutathione vial (1200 mg) paired with a Vitamin C Injection IP ampoule used to reconstitute it.",
      "Reconstitute the vial with the Vitamin C ampoule supplied with the pack until clear. The reconstituted solution should be used immediately and not stored.",
    ],
    benefits: [
      "Powerful antioxidant combination",
      "Supports skin brightening and glow",
      "Single dose combipack for IV/IM use only",
    ],
    composition: [
      { label: "Glutathione (USP) vial", value: "1200 mg" },
      { label: "Vitamin C Injection IP ampoule", value: "5 mL" },
    ],
    recommendedUse: [
      "As directed by the physician.",
      "Reconstitute the vial with the Vitamin C ampoule supplied with this pack until clear.",
      "The reconstituted solution should be used immediately and not stored.",
    ],
    packaging: ["Single Dose Combipack for IV/IM use only.", "2 units — 1 glutathione vial + 1 Vitamin C ampoule.", "Lyophilized."],
    storage: [
      "Store in a cool, dry and dark place.",
      "Protect from light and moisture.",
      "Do not freeze.",
    ],
  },
  {
    slug: "gluta-plus",
    name: "GLUTA+",
    line: "Nurture+",
    category: "Antioxidant / Glutathione + Vitamin C",
    strength: "600 mg + Vitamin C",
    image: "/products/gluta-600.jpg",
    brochure: "/brochures/gluta-plus.pdf",
    accent: "violet",
    shortDescription:
      "Glutathione for Injection & Vitamin C Injection IP — a two-part combipack pairing 600 mg glutathione with vitamin C for reconstitution.",
    description: [
      "GLUTA+ is supplied as a two-part combipack: Part A is a sterile glutathione vial, Part B is a 2 mL vitamin C ampoule used to reconstitute it.",
      "Dissolve the contents of the vial with the sterile water for injection IP supplied until clear, then gently mix the Vitamin C Injection IP into the reconstituted vial. Use immediately — do not store the reconstituted solution.",
    ],
    benefits: [
      "Powerful antioxidant support",
      "Supports immune health",
      "Promotes skin radiance",
    ],
    composition: [
      { label: "Part A — Glutathione (Sterile)", value: "600 mg per vial" },
      { label: "Part B — Vitamin C IP (per 2 mL)", value: "500 mg" },
      { label: "Water for Injection IP", value: "q.s." },
    ],
    recommendedUse: [
      "As directed by the physician.",
      "Dissolve the vial with sterile water for injection IP until clear.",
      "Gently mix the Vitamin C Injection IP into the reconstituted vial.",
      "Use immediately; the reconstituted solution should not be stored.",
    ],
    packaging: ["Single Dose Vial for IV/IM use only.", "Combipack, Lyophilized — 600 mg + Vitamin C 5 mL."],
    storage: [
      "Store in a cool, dry and dark place.",
      "Protect from light and moisture.",
      "Do not freeze.",
    ],
  },
  {
    slug: "zinco-plus",
    name: "Zinco+",
    line: "Nurture+",
    category: "Essential Mineral / Zinc",
    strength: "10 mL",
    image: "/products/zinco.jpg",
    brochure: "/brochures/zinco-plus.pdf",
    accent: "sky",
    shortDescription:
      "Zinc Chloride Injection IP — a sterile, non-pyrogenic single dose vial for IV use after dilution.",
    description: [
      "Zinco+ supplies zinc chloride equivalent to 1 mg of elemental zinc per mL, formulated as a sterile, non-pyrogenic solution for IV use after dilution.",
    ],
    benefits: [
      "Essential for immune function and healing",
      "Supports enzyme function",
      "Sterile, safe and non-pyrogenic",
    ],
    composition: [
      { label: "Zinc Chloride IP (eq. to 1 mg elemental zinc)", value: "2.09 mg/mL" },
      { label: "Sodium Chloride IP", value: "9 mg/mL" },
      { label: "Water for Injections IP", value: "q.s." },
    ],
    recommendedUse: [
      "As directed by the physician.",
      "For IV use after dilution.",
      "Not to be used in newly born babies or premature infants.",
    ],
    packaging: ["Single Dose Vial, Sterile, Non-Pyrogenic — 10 mL."],
    storage: ["Store in a cool, dry place.", "Protect from light.", "Do not allow to freeze."],
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
