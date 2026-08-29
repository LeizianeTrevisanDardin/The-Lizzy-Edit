export type Product = {
  id: number;
  slug: string;
  brand: string;
  name: string;
  category: "Skincare" | "Makeup" | "Self-Care" | "Fragrance";
  tags: string[];
  type: string;
  image: string;
  description: string;
  whyILikeIt: string[];

  affiliateUrl?: string;

  featured?: boolean;
  homeTag?: string;
};

export const products: Product[] = [
  {
    id: 1,
    slug: "cicaplast-baume-b5",
    brand: "La Roche-Posay",
    name: "Cicaplast Baume B5+",
    category: "Skincare",
    tags: [
      "Everyday",
      "Dryness",
      "Sensitivity",
      "Dry",
      "Sensitive",
    ],
    type: "Soothing • Barrier Support",
    image: "/images/cicaplast.png",
    description:
      "A comforting multi-purpose balm I love for dry or sensitive-feeling skin.",
    whyILikeIt: [
      "Comforting texture",
      "Great for dry-feeling areas",
      "Easy to add to a simple routine",
    ],
    affiliateUrl: "https://link.amazon/B09l4XWkQ",
    featured: true,
    homeTag: "Lizzy Loves",
  },

  {
    id: 2,
    slug: "elf-halo-glow",
    brand: "e.l.f.",
    name: "Halo Glow Liquid Filter",
    category: "Makeup",
    tags: [
      "Everyday",
      "Under $25",
      "Face",
      "Everyday Makeup",
      "No-Makeup Makeup",
    ],
    type: "Glow • Everyday Makeup",
    image: "/images/elf.png",
    description:
      "An easy way to add a fresh, luminous finish to everyday makeup.",
    whyILikeIt: [
      "Beautiful luminous finish",
      "Easy for everyday makeup",
      "Works well for a fresh, natural look",
    ],
    affiliateUrl: "https://link.amazon/B00OSatwG",
    featured: true,
    homeTag: "Everyday Pick",
  },

  {
    id: 3,
    slug: "sol-de-janeiro-bum-bum-cream",
    brand: "Sol de Janeiro",
    name: "Brazilian Bum Bum Cream",
    category: "Self-Care",
    tags: [
      "Worth the Splurge",
      "Body Care",
    ],
    type: "Body Care • Indulgent",
    image: "/images/bumbum.png",
    description:
      "A body-care favorite for when you want your routine to feel a little more luxurious.",
    whyILikeIt: [
      "Makes body care feel special",
      "Rich, indulgent texture",
      "A fun addition to a self-care routine",
    ],
    affiliateUrl: "https://link.amazon/B09nb5T12",
    featured: true,
    homeTag: "Worth the Splurge",
  },

  {
    id: 4,
    slug: "narciso-rodriguez-pure-musc",
    brand: "Narciso Rodriguez",
    name: "For Her Pure Musc",
    category: "Fragrance",
    tags: [
      "Everyday",
      "Fresh",
      "Soft Musk",
    ],
    type: "Fresh • Soft Musk",
    image: "/images/narciso.png",
    description:
      "Clean, soft and effortlessly feminine. A beautiful everyday musk that feels polished without being overpowering.",
    whyILikeIt: [
      "Soft and feminine",
      "Easy for daytime",
      "Polished without feeling heavy",
    ],
    affiliateUrl: "https://link.amazon/B02cZZRZS",
    featured: true,
    homeTag: "Fragrance",
  },

  {
    id: 5,
    slug: "burberry-goddess",
    brand: "Burberry",
    name: "Goddess Eau de Parfum",
    category: "Fragrance",
    tags: [
      "Worth the Splurge",
      "Warm",
      "Gourmand",
      "Vanilla",
    ],
    type: "Vanilla • Warm • Gourmand",
    image: "/images/burberry.png",
    description:
      "Warm, creamy and beautifully feminine. A sophisticated vanilla fragrance with a soft, comforting sweetness.",
    whyILikeIt: [
      "Warm vanilla profile",
      "Comforting but elegant",
      "Beautiful for cooler days and evenings",
    ],
    affiliateUrl: "https://link.amazon/B0eqvfMSm",
    featured: true,
    homeTag: "Fragrance",
  },

  {
    id: 6,
    slug: "rabanne-million-gold-for-her",
    brand: "Rabanne",
    name: "Million Gold For Her Parfum",
    category: "Fragrance",
    tags: [
      "Worth the Splurge",
      "Floral",
      "Warm",
      "Statement",
    ],
    type: "Floral • Warm • Sensual",
    image: "/images/pacco.png",
    description:
      "Bold, glamorous and effortlessly feminine. A rich floral fragrance with a warm, sensual finish.",
    whyILikeIt: [
      "Has more presence",
      "Feels glamorous and feminine",
      "Great when you want a statement scent",
    ],
    affiliateUrl: "https://link.amazon/B0cR5gyhA",
    featured: true,
    homeTag: "Fragrance",
  },

  {
    id: 7,
    slug: "dior-jadore",
    brand: "Dior",
    name: "J’adore Eau de Parfum",
    category: "Fragrance",
    tags: [
      "Worth the Splurge",
      "Floral",
      "Elegant",
      "Timeless",
    ],
    type: "Floral • Elegant • Feminine",
    image: "/images/dior.png",
    description:
      "Radiant, elegant and beautifully feminine. A sophisticated floral fragrance with a timeless feel.",
    whyILikeIt: [
      "Classic floral profile",
      "Elegant and polished",
      "A timeless feminine fragrance",
    ],
    affiliateUrl: "https://link.amazon/B0enBBgiW",
    featured: true,
    homeTag: "Fragrance",
  },

  {
    id: 8,
    slug: "cosrx-snail-mucin",
    brand: "COSRX",
    name: "Advanced Snail 96 Mucin Power Essence",
    category: "Skincare",
    tags: [
      "Trending",
      "Everyday",
      "Dryness",
      "Sensitivity",
      "Dullness",
      "Dry",
      "Sensitive",
      "Combination",
    ],
    type: "Hydrating • Lightweight",
    image: "/images/snail.png",
    description:
      "A lightweight hydrating essence that fits easily into a simple routine.",
    whyILikeIt: [
      "Lightweight texture",
      "Easy to layer",
      "Fits nicely into a simple routine",
    ],
    affiliateUrl: "https://link.amazon/B0gz02hYB",
    featured: true,
    homeTag: "Trending",
  },

  {
    id: 9,
    slug: "patrick-ta",
    brand: "Patrick Ta",
    name: "",
    category: "Makeup",
    tags: [
      "Everyday",
      "Face",
      "Everyday Makeup",
      "Soft-Glam",
    ],
    type: "Glow • Everyday Makeup",
    image: "/images/patrick.png",
    description:
      "An easy way to add a soft glam to your look.",
    whyILikeIt: [
      "Easy for everyday makeup",
      "Works well for a fresh, natural look on the eyes",
    ],
    affiliateUrl: "",
    featured: true,
    homeTag: "Soft Glam",
  },
];