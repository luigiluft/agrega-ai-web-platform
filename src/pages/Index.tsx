import NavigationMenuDemo from "../components/NavigationMenu";
import HeroSection from "../components/sections/HeroSection";
import StatsSection from "../components/sections/StatsSection";
import FeaturesSection from "../components/sections/FeaturesSection";
import ComparisonSection from "../components/sections/ComparisonSection";
import PricingSection from "../components/sections/PricingSection";
import TestimonialsSection from "../components/sections/TestimonialsSection";
import ImplementationTimeline from "../components/sections/ImplementationTimeline";
import CTASection from "../components/sections/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <NavigationMenuDemo />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <ComparisonSection />
      <ImplementationTimeline />
      <PricingSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
};

export default Index;