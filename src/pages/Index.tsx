import NavigationMenuDemo from "../components/NavigationMenu";
import HeroSection from "../components/sections/HeroSection";
import StatsSection from "../components/sections/StatsSection";
import FeaturesSection from "../components/sections/FeaturesSection";
import ComparisonSection from "../components/sections/ComparisonSection";
import TestimonialsSection from "../components/sections/TestimonialsSection";
import CTASection from "../components/sections/CTASection";
import FAQSection from "../components/sections/FAQSection";
import { Link } from "react-router-dom";
import { Calculator } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <NavigationMenuDemo />
      <main>
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