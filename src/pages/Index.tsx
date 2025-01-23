import NavigationMenuDemo from "../components/NavigationMenu";
import HeroSection from "../components/sections/HeroSection";
import FeaturesSection from "../components/sections/FeaturesSection";
import PricingSection from "../components/sections/PricingSection";
import TestimonialsSection from "../components/sections/TestimonialsSection";
import CTASection from "../components/sections/CTASection";
import FAQSection from "../components/sections/FAQSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <NavigationMenuDemo />
      <main>
        <HeroSection />
        <FeaturesSection />
        <PricingSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </main>
    </div>
  );
};

export default Index;