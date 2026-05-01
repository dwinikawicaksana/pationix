import { fetchLandingData } from "@/lib/fetcher";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StorySection from "@/components/StorySection";
import FeatureReveal from "@/components/FeatureReveal";
import CaseStudy from "@/components/CaseStudy";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default async function Home() {
  const data = await fetchLandingData();

  return (
    <>
      <Navbar data={data.navbar} />
      <main>
        <Hero data={data.hero} />
        <StorySection stories={data.stories} />
        <FeatureReveal features={data.features} />
        <CaseStudy caseStudies={data.caseStudies} />
        <CTASection data={data.cta} />
      </main>
      <Footer footer={data.footer} navbar={data.navbar} />
    </>
  );
}
