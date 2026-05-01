export interface HeroData {
  title: string;
  subtitle: string;
  cta: string;
  badge?: string;
}

export interface StoryData {
  id: string;
  tag: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  align: "left" | "right";
}

export interface FeatureData {
  id: string;
  icon: string;
  title: string;
  description: string;
  highlight?: boolean;
}

export interface CaseStudyData {
  id: string;
  client: string;
  title: string;
  result: string;
  metric: string;
  metricLabel: string;
  tags: string[];
  image: string;
}

export interface CTAData {
  title: string;
  subtitle: string;
  button: string;
  secondaryButton?: string;
}

export interface NavbarData {
  logo: string;
  links: { label: string; href: string }[];
}

export interface FooterData {
  tagline: string;
  links: { label: string; href: string }[];
  copyright: string;
}

export interface LandingData {
  navbar: NavbarData;
  hero: HeroData;
  stories: StoryData[];
  features: FeatureData[];
  caseStudies: CaseStudyData[];
  cta: CTAData;
  footer: FooterData;
}
