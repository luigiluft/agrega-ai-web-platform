import NavigationMenuDemo from "../components/NavigationMenu";
import HeroSection from "../components/sections/HeroSection";
import StatsSection from "../components/sections/StatsSection";
import FeaturesSection from "../components/sections/FeaturesSection";
import ComparisonSection from "../components/sections/ComparisonSection";
import TestimonialsSection from "../components/sections/TestimonialsSection";
import CTASection from "../components/sections/CTASection";
import FAQSection from "../components/sections/FAQSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-primary w-full">
      <NavigationMenuDemo />
      <main className="w-full">
        <HeroSection />
        <FeaturesSection />
        <StatsSection />
        <ComparisonSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </main>
    </div>
  );
};

export default Index;