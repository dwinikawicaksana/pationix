import { fetchLandingData } from "@/lib/fetcher";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PreviewSlides from "@/components/PreviewSlides";
import ProductCatalogue from "@/components/ProductCatalogue";
import Testimonials from "@/components/Testimonials";
import ChatbotPanel from "@/components/ChatbotPanel";
import StorySection from "@/components/StorySection";
import FeatureReveal from "@/components/FeatureReveal";
import CaseStudy from "@/components/CaseStudy";
import CTASection from "@/components/CTASection";
import FooterNew from "@/components/FooterNew";
import PhilosophyCard from "@/components/PhilosophyCard";
import WhatsAppButton from "@/components/WhatsAppButton";

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
        <FeatureReveal features={data.features} />
        <CaseStudy caseStudies={data.caseStudies} />
        <CTASection data={data.cta} />
      </main>
      <FooterNew footer={data.footer} navbar={data.navbar} />
      <WhatsAppButton />
    </>
  );
}
