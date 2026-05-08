export interface LocalizedField {
  id: string;
  en: string;
}

export interface HeroData {
  title: LocalizedField;
  subtitle: LocalizedField;
  cta: LocalizedField;
  badge?: LocalizedField;
}

export interface StoryData {
  id: string;
  tag: LocalizedField;
  title: LocalizedField;
  description: LocalizedField;
  image: string;
  imageAlt: string;
  align: "left" | "right";
}

export interface FeatureData {
  id: string;
  icon: string;
  title: LocalizedField;
  description: LocalizedField;
  highlight?: boolean;
}

export interface CaseStudyData {
  id: string;
  client: string;
  title: LocalizedField;
  result: LocalizedField;
  metric: string;
  metricLabel: LocalizedField;
  tags: LocalizedField[];
  image: string;
}

export interface BlogData {
  id: string;
  title: LocalizedField;
  excerpt: LocalizedField;
  category: LocalizedField;
  date: string;
  thumbnail: string;
  slug: string;
}

export interface CTAData {
  title: LocalizedField;
  subtitle: LocalizedField;
  button: LocalizedField;
  secondaryButton?: LocalizedField;
}

export interface NavbarLink {
  label: LocalizedField;
  href: string;
}

export interface NavbarData {
  logo: string;
  links: NavbarLink[];
}

export interface FooterLink {
  label: LocalizedField;
  href: string;
}

export interface FooterData {
  tagline: LocalizedField;
  description?: LocalizedField;
  links: FooterLink[];
  copyright: string;
}

export interface LandingData {
  navbar: NavbarData;
  hero: HeroData;
  stories: StoryData[];
  features: FeatureData[];
  caseStudies: CaseStudyData[];
  blogs: BlogData[];
  cta: CTAData;
  footer: FooterData;
}
