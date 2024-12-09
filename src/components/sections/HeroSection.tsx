import { Link } from "react-scroll";
import { ArrowRight, Rocket, Building2 } from "lucide-react";
import { ThemeCard } from "../theme/ThemeCard";
import { themes } from "../theme/themeData";
import { useState, useEffect } from "react";

const HeroSection = () => {
  const [selectedThemeId, setSelectedThemeId] = useState<number>(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      handleNextTheme();
    }, 5000);

    return () => clearInterval(interval);
  }, [selectedThemeId, isAutoPlaying]);

  const handleThemeSelect = (themeId: number) => {
    setSelectedThemeId(themeId);
    setIsAutoPlaying(false);
  };

  const handleNextTheme = () => {
    setSelectedThemeId(prev => 
      prev === themes.length ? 1 : prev + 1
    );
  };

  const handlePreviousTheme = () => {
    setSelectedThemeId(prev => 
      prev === 1 ? themes.length : prev - 1
    );
  };

  return (
    <section className="relative bg-gradient-to-br from-primary via-accent to-primary-dark min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20" />
      <div className="container mx-auto px-4 py-16 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-12">
              <div className="space-y-6 backdrop-blur-sm bg-black/10 p-8 rounded-2xl border border-white/10">
                <h1 className="text-4xl lg:text-6xl font-bold text-white animate-fade-up leading-tight">
                  Soluções <span className="text-white font-extrabold">Sob Medida</span> para Seu{" "}
                  <span className="text-7xl font-extrabold text-white">
                    E-commerce
                  </span>
                </h1>
                <p className="text-lg text-white animate-fade-up [animation-delay:200ms] leading-relaxed max-w-xl">
                  Desenvolvemos, <span className="text-white font-semibold">integramos</span> e{" "}
                  <span className="text-white font-semibold">gerenciamos</span> seu e-commerce.{" "}
                  <span className="text-xl font-bold text-white">
                    Escolha o que precisa e foque no crescimento do seu negócio.
                  </span>
                </p>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-6 animate-fade-up [animation-delay:400ms]">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 group hover:scale-105">
                  <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Rocket className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">E-commerce Express</h3>
                  <p className="text-white/90 mb-4 text-sm leading-relaxed">
                    Lojas online com desenvolvimento ágil, layouts padronizados e custo acessível.
                  </p>
                  <Link
                    to="pricing-section"
                    smooth={true}
                    duration={500}
                    className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/30 transition-all duration-300 cursor-pointer group"
                  >
                    Escolha seu plano
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 group hover:scale-105">
                  <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Building2 className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Full-commerce Enterprise</h3>
                  <p className="text-white/90 mb-4 text-sm leading-relaxed">
                    Solução completa de e-commerce com integrações avançadas e personalização total.
                  </p>
                  <button className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/30 transition-all duration-300 group">
                    Fale com Especialista
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>

            <div className="hidden lg:block relative animate-fade-up [animation-delay:600ms] h-[600px]">
              <div className="relative w-full h-full">
                {themes.map((theme, index) => (
                  <ThemeCard
                    key={theme.id}
                    theme={theme}
                    index={index}
                    totalThemes={themes.length}
                    isSelected={theme.id === selectedThemeId}
                    onSelect={handleThemeSelect}
                    onNext={handleNextTheme}
                    onPrevious={handlePreviousTheme}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;