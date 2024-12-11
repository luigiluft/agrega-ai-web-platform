import NavigationMenuDemo from "../components/NavigationMenu";
import HeroSection from "../components/sections/HeroSection";
import StatsSection from "../components/sections/StatsSection";
import FeaturesSection from "../components/sections/FeaturesSection";
import ComparisonSection from "../components/sections/ComparisonSection";
import PricingSection from "../components/sections/PricingSection";
import TestimonialsSection from "../components/sections/TestimonialsSection";
import ImplementationTimeline from "../components/sections/ImplementationTimeline";
import CTASection from "../components/sections/CTASection";
import FAQSection from "../components/sections/FAQSection";
import { Calculator } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <NavigationMenuDemo />
      <main className="pt-16">
        <HeroSection />
        
        <section className="py-16 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Descubra o Valor Ideal para Sua Plataforma
              </h2>
              <p className="text-lg text-gray-600">
                Use nossa calculadora inteligente para simular o investimento perfeito para seu e-commerce
              </p>
            </div>
            
            <div className="flex justify-center">
              <a
                href="https://lovable.dev/projects/0e704d78-d7c1-4f7e-b3b6-d152c01df142"
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl shadow-lg hover:shadow-orange-500/25 transition-all duration-300 hover:-translate-y-1"
              >
                <Calculator className="w-5 h-5" />
                <span className="font-semibold">Calcular Investimento</span>
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs px-2 py-1 rounded-full">
                  Completa
                </span>
              </a>
            </div>
          </div>
        </section>

        <FeaturesSection />
        <StatsSection />
        <ComparisonSection />
        <ImplementationTimeline />
        <PricingSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </main>
    </div>
  );
};

export default Index;