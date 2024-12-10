import { Link } from "react-scroll";
import { ArrowRight, Rocket, Building2 } from "lucide-react";
import { ThemeCard } from "../theme/ThemeCard";
import { themes } from "../theme/themeData";
import { useState, useEffect, useRef, TouchEvent } from "react";

const HeroSection = () => {
  const [selectedThemeId, setSelectedThemeId] = useState<number>(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const autoPlayTimeoutRef = useRef<NodeJS.Timeout>();

  const minSwipeDistance = 50;

  useEffect(() => {
    if (!isAutoPlaying) return;

    autoPlayTimeoutRef.current = setInterval(() => {
      handleNextTheme();
    }, 5000);

    return () => {
      if (autoPlayTimeoutRef.current) {
        clearInterval(autoPlayTimeoutRef.current);
      }
    };
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

  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsAutoPlaying(false);
    if (autoPlayTimeoutRef.current) {
      clearInterval(autoPlayTimeoutRef.current);
    }
  };

  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNextTheme();
    }
    if (isRightSwipe) {
      handlePreviousTheme();
    }
  };

  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden bg-gradient-to-br from-primary/90 via-accent/80 to-primary-dark/90">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10" />
      
      <div className="container mx-auto px-4 py-8 md:py-16 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="space-y-6">
              <div className="space-y-4 md:space-y-6 bg-white/10 backdrop-blur-md p-4 md:p-8 rounded-2xl border border-white/20">
                <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white animate-fade-up">
                  Soluções <span className="text-white/90">Sob Medida</span> para Seu{" "}
                  <span className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                    E-commerce
                  </span>
                </h1>
                <p className="text-base md:text-lg text-white/90 animate-fade-up [animation-delay:200ms] leading-relaxed max-w-xl">
                  Desenvolvemos, <span className="text-white font-semibold">integramos</span> e{" "}
                  <span className="text-white font-semibold">gerenciamos</span> seu e-commerce.{" "}
                  <span className="text-lg md:text-xl font-bold text-white">
                    Escolha o que precisa e foque no crescimento do seu negócio.
                  </span>
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 animate-fade-up [animation-delay:400ms]">
                <div className="bg-white/10 backdrop-blur-md p-4 md:p-6 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 group hover:scale-105">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-white/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Rocket className="w-6 h-6 md:w-7 md:h-7 text-white" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">E-commerce Express</h3>
                  <p className="text-sm text-white/90 mb-4 leading-relaxed">
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

                <div className="bg-white/10 backdrop-blur-md p-4 md:p-6 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 group hover:scale-105">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-white/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Building2 className="w-6 h-6 md:w-7 md:h-7 text-white" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">Full-commerce Enterprise</h3>
                  <p className="text-sm text-white/90 mb-4 leading-relaxed">
                    Solução completa de e-commerce com integrações avançadas e personalização total.
                  </p>
                  <button className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/30 transition-all duration-300 group">
                    Fale com Especialista
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>

            <div 
              className="relative animate-fade-up [animation-delay:600ms] h-[400px] md:h-[600px] touch-pan-x"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
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
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {themes.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => handleThemeSelect(theme.id)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      theme.id === selectedThemeId ? 'bg-white w-4' : 'bg-white/50'
                    }`}
                    aria-label={`Select theme ${theme.id}`}
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