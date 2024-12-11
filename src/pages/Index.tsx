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
import { Link } from "react-router-dom";
import { Calculator, Sparkles } from "lucide-react";

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
                Use nossas calculadoras inteligentes para simular o investimento perfeito para seu e-commerce
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                to="/calculadora"
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white rounded-xl shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:-translate-y-1"
              >
                <Calculator className="w-5 h-5" />
                <span className="font-semibold">Calculadora Express</span>
                <span className="absolute -top-2 -right-2 bg-accent text-white text-xs px-2 py-1 rounded-full">
                  Rápida
                </span>
              </Link>
              
              <Link
                to="/calculadora-dinamica"
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-accent to-accent-dark text-white rounded-xl shadow-lg hover:shadow-accent/25 transition-all duration-300 hover:-translate-y-1"
              >
                <Sparkles className="w-5 h-5" />
                <span className="font-semibold">Calculadora Detalhada</span>
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs px-2 py-1 rounded-full">
                  Completa
                </span>
              </Link>
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