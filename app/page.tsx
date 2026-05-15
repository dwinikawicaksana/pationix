import dynamic from "next/dynamic";
import { fetchLandingData } from "@/lib/fetcher";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

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
