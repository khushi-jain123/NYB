import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import EcosystemSection from "@/components/EcosystemSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

const Index = () => {
  useSmoothScroll();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <EcosystemSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
