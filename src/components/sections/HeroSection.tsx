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
    <section className="relative bg-primary overflow-hidden pt-20">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      <div className="container mx-auto px-4 py-24 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-up leading-tight">
                Soluções Sob Medida para Seu E-commerce
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-12 animate-fade-up [animation-delay:200ms] leading-relaxed">
                Desenvolvemos, integramos e gerenciamos seu e-commerce. Escolha o que precisa e foque no crescimento do seu negócio.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 animate-fade-up [animation-delay:400ms]">
                <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                  <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Rocket className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">E-commerce Express</h3>
                  <p className="text-white/90 mb-6 leading-relaxed">
                    Lojas online com desenvolvimento ágil, layouts padronizados e custo acessível.
                  </p>
                  <Link
                    to="pricing-section"
                    smooth={true}
                    duration={500}
                    className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-all duration-300 cursor-pointer group"
                  >
                    Escolha seu plano
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

                <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                  <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Building2 className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Full-commerce Enterprise</h3>
                  <p className="text-white/90 mb-6 leading-relaxed">
                    Solução completa de e-commerce com integrações avançadas e personalização total.
                  </p>
                  <button className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-all duration-300 group">
                    Fale com Especialista
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>

            <div className="hidden md:block relative animate-fade-up [animation-delay:600ms] h-[700px]">
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