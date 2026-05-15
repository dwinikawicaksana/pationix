import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { fetchLandingData } from "@/lib/fetcher";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

const OG_IMAGE = "/assets/images/og-meta.png";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { lang?: string };
}): Promise<Metadata> {
  const lang = searchParams?.lang === "en" ? "en" : "id";

  if (lang === "en") {
    return {
      title:
        "Paitonix — Web Development, Mobile Development & AI Solutions Agency in Indonesia",
      description:
        "Paitonix is a digital agency in Indonesia specialising in Web Development, Mobile Development, Digital Consultation, and AI Solutions. We build scalable, modern digital products for local and international businesses.",
      openGraph: {
        type: "website",
        url: "https://paitonix.com/?lang=en",
        siteName: "Paitonix",
        title:
          "Paitonix — Web Development, Mobile Development & AI Solutions Agency in Indonesia",
        description:
          "Indonesia-based digital agency. Web Development, Mobile Development, Digital Consultation & AI Solutions for businesses worldwide.",
        images: [
          {
            url: OG_IMAGE,
            width: 1200,
            height: 630,
            alt: "Paitonix — Web & AI Solutions Agency Indonesia",
          },
        ],
        locale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        site: "@paitonix",
        title:
          "Paitonix — Web Development, Mobile Development & AI Solutions Agency in Indonesia",
        description:
          "Indonesia-based digital agency: Web Development, Mobile Development, Digital Consultation & AI Solutions.",
        images: [OG_IMAGE],
      },
    };
  }

  // default: Indonesian
  return {
    title:
      "Paitonix — Web Development, Mobile Development & AI Solutions Indonesia",
    description:
      "Paitonix adalah agency digital di Indonesia yang menghadirkan layanan Web Development, Mobile Development, Digital Consultation, dan AI Solutions. Kami membangun produk digital yang scalable dan modern untuk bisnis Anda.",
    openGraph: {
      type: "website",
      url: "https://paitonix.com/?lang=id",
      siteName: "Paitonix",
      title:
        "Paitonix — Web Development, Mobile Development & AI Solutions Indonesia",
      description:
        "Agency digital Indonesia: Web Development, Mobile Development, Digital Consultation & AI Solutions untuk bisnis lokal & internasional.",
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: "Paitonix — Web & AI Solutions Indonesia",
        },
      ],
      locale: "id_ID",
    },
    twitter: {
      card: "summary_large_image",
      site: "@paitonix",
      title:
        "Paitonix — Web Development, Mobile Development & AI Solutions Indonesia",
      description:
        "Agency digital Indonesia: Web Development, Mobile Development, Digital Consultation & AI Solutions.",
      images: [OG_IMAGE],
    },
  };
}

// Above-the-fold components are imported statically. Everything below the fold
// is dynamically imported so it does not bloat the initial JS payload that
// blocks LCP/TBT on the landing route.
const PhilosophyCard = dynamic(() => import("@/components/PhilosophyCard"));
const PreviewSlides = dynamic(() => import("@/components/PreviewSlides"));
const ProductCatalogue = dynamic(() => import("@/components/ProductCatalogue"));
const Testimonials = dynamic(() => import("@/components/Testimonials"));
const ChatbotPanel = dynamic(() => import("@/components/ChatbotPanel"));
const StorySection = dynamic(() => import("@/components/StorySection"));
const FeatureReveal = dynamic(() => import("@/components/FeatureReveal"));
const CaseStudy = dynamic(() => import("@/components/CaseStudy"));
const BlogSection = dynamic(() => import("@/components/BlogSection"));
const CTASection = dynamic(() => import("@/components/CTASection"));
const FooterNew = dynamic(() => import("@/components/FooterNew"));
const WhatsAppButton = dynamic(() => import("@/components/WhatsAppButton"), {
  ssr: false,
});

export default async function Home() {
  const data = await fetchLandingData();

  return (
    <>
      <Navbar data={data.navbar} />
      <main className="mt-16">
        <Hero data={data.hero} />
        <PhilosophyCard />
        <PreviewSlides />
        <ProductCatalogue />
        <Testimonials />
        <ChatbotPanel />
        <StorySection stories={data.stories} />
        <div id="services" className="block scroll-mt-24 pt-24 -mt-24" />
        <FeatureReveal features={data.features} />
        <CaseStudy caseStudies={data.caseStudies} />
        <BlogSection blogs={data.blogs} />
        <CTASection data={data.cta} />
      </main>
      <FooterNew footer={data.footer} navbar={data.navbar} />
      <WhatsAppButton />
    </>
  );
}
