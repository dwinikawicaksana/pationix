export type BlogCategory = {
  id: string;
  label: {
    id: string;
    en: string;
  };
  aliases?: string[];
};

export const BLOG_CATEGORIES: BlogCategory[] = [
  {
    id: "technology",
    label: { id: "Teknologi", en: "Technology" },
    aliases: ["tech", "teknologi"],
  },
  {
    id: "design",
    label: { id: "Desain", en: "Design" },
    aliases: ["desain"],
  },
  {
    id: "business",
    label: { id: "Bisnis", en: "Business" },
    aliases: ["bisnis"],
  },
  {
    id: "development",
    label: { id: "Pengembangan", en: "Development" },
    aliases: ["engineering", "pengembangan"],
  },
  {
    id: "ai-automation",
    label: { id: "AI & Otomasi", en: "AI & Automation" },
    aliases: ["ai", "automation", "ai automation", "ai & automation"],
  },
  {
    id: "product-strategy",
    label: { id: "Strategi Produk", en: "Product Strategy" },
    aliases: ["product", "strategy", "strategi produk"],
  },
  {
    id: "marketing",
    label: { id: "Pemasaran", en: "Marketing" },
    aliases: ["growth", "pemasaran"],
  },
  {
    id: "mobile-apps",
    label: { id: "Aplikasi Mobile", en: "Mobile Apps" },
    aliases: ["mobile", "app", "apps", "aplikasi mobile"],
  },
  {
    id: "e-commerce",
    label: { id: "E-Commerce", en: "E-Commerce" },
    aliases: ["commerce", "ecommerce"],
  },
  {
    id: "saas",
    label: { id: "SaaS", en: "SaaS" },
    aliases: ["software as a service"],
  },
  {
    id: "branding",
    label: { id: "Branding", en: "Branding" },
    aliases: ["brand"],
  },
  {
    id: "ui-ux",
    label: { id: "UI/UX", en: "UI/UX" },
    aliases: ["ux", "ui", "user experience"],
  },
  {
    id: "data-analytics",
    label: { id: "Data & Analitik", en: "Data & Analytics" },
    aliases: ["data", "analytics", "analitik", "data analytics"],
  },
  {
    id: "cybersecurity",
    label: { id: "Keamanan Siber", en: "Cybersecurity" },
    aliases: ["security", "cyber", "cyber security", "keamanan"],
  },
  {
    id: "operations",
    label: { id: "Operasional", en: "Operations" },
    aliases: ["ops", "operation", "operasi"],
  },
];

const categoryLookup = new Map<string, BlogCategory>();

for (const category of BLOG_CATEGORIES) {
  const keys = [
    category.id,
    category.label.en,
    category.label.id,
    ...(category.aliases ?? []),
  ];

  for (const key of keys) {
    categoryLookup.set(key.toLowerCase(), category);
  }
}

export function normalizeCategory(category?: string | null): string {
  if (!category) {
    return BLOG_CATEGORIES[0].label.en;
  }

  const normalized = categoryLookup.get(category.trim().toLowerCase());
  return normalized?.label.en ?? BLOG_CATEGORIES[0].label.en;
}

export function getCategoryById(categoryId?: string | null): BlogCategory {
  const normalized = categoryId
    ? categoryLookup.get(categoryId.toLowerCase())
    : null;
  return normalized ?? BLOG_CATEGORIES[0];
}

export function getCategoryOptions(language: "id" | "en") {
  return BLOG_CATEGORIES.map((category) => ({
    value: category.label.en,
    label: category.label[language],
    id: category.id,
  }));
}
