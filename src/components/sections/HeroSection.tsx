import { Link } from "react-scroll";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Rocket, Building2 } from "lucide-react";
import { useState, useEffect } from "react";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-secondary via-secondary/95 to-secondary">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10" />
      
      <div className="container mx-auto px-4 py-8 md:py-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-6">
            <div className="space-y-4 md:space-y-6 bg-white/5 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-white/10">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white text-center">
                Soluções <span className="text-white/90">Sob Medida</span> para Seu{" "}
                <span className="font-extrabold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                  E-commerce
                </span>
              </h1>
              <p className="text-lg md:text-xl text-white/90 animate-fade-up [animation-delay:200ms] leading-relaxed max-w-2xl mx-auto text-center">
                Desenvolvemos, <span className="text-white font-semibold">integramos</span> e{" "}
                <span className="text-white font-semibold">gerenciamos</span> seu e-commerce.{" "}
                <span className="text-xl md:text-2xl font-bold text-white">
                  Escolha o que precisa e foque no crescimento do seu negócio.
                </span>
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 animate-fade-up [animation-delay:400ms]">
              <div className="bg-white/5 backdrop-blur-sm p-4 md:p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-white/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Rocket className="w-6 h-6 md:w-7 md:h-7 text-white" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-white mb-2">E-commerce Express</h3>
                <p className="text-sm text-white/90 mb-4">
                  Lojas online com desenvolvimento ágil e custo acessível.
                </p>
                <button onClick={() => navigate("/calculadora")} className="w-full bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg transition-colors">
                  Saiba mais
                </button>
              </div>

              <div className="bg-white/5 backdrop-blur-sm p-4 md:p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-white/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Building2 className="w-6 h-6 md:w-7 md:h-7 text-white" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-white mb-2">E-commerce Pro</h3>
                <p className="text-sm text-white/90 mb-4">
                  Solução intermediária com recursos avançados.
                </p>
                <button onClick={() => navigate("/calculadora")} className="w-full bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg transition-colors">
                  Saiba mais
                </button>
              </div>

              <div className="bg-white/5 backdrop-blur-sm p-4 md:p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-white/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Building2 className="w-6 h-6 md:w-7 md:h-7 text-white" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-white mb-2">Full-commerce Enterprise</h3>
                <p className="text-sm text-white/90 mb-4">
                  Solução completa com personalização total.
                </p>
                <button onClick={() => navigate("/calculadora")} className="w-full bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg transition-colors">
                  Saiba mais
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
