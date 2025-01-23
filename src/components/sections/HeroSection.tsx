import { useNavigate } from "react-router-dom";
import { Rocket, Building2, ArrowRight } from "lucide-react";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-primary">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10" />
      
      <div className="container mx-auto px-4 py-8 md:py-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-8 mt-24">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 animate-fade-up">
              <span className="text-white/90">Transforme seu negócio digital</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </div>
            
            <div className="space-y-6 bg-white/5 backdrop-blur-sm p-8 md:p-10 rounded-3xl border border-white/10 animate-fade-up [animation-delay:200ms]">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white text-center leading-tight">
                Soluções <span className="text-white/90">Sob Medida</span> para Seu{" "}
                <span className="font-extrabold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                  E-commerce
                </span>
              </h1>
              <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto text-center">
                Desenvolvemos, <span className="text-white font-semibold">integramos</span> e{" "}
                <span className="text-white font-semibold">gerenciamos</span> seu e-commerce.{" "}
                <span className="text-xl md:text-2xl font-bold text-white">
                  Escolha o que precisa e foque no crescimento do seu negócio.
                </span>
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 animate-fade-up [animation-delay:400ms]">
              {[
                {
                  title: "E-commerce Express",
                  description: "Lojas online com desenvolvimento ágil e custo acessível.",
                  icon: Rocket
                },
                {
                  title: "E-commerce Pro",
                  description: "Solução intermediária com recursos avançados.",
                  icon: Building2
                },
                {
                  title: "Full-commerce Enterprise",
                  description: "Solução completa com personalização total.",
                  icon: Building2
                }
              ].map((product, index) => (
                <div 
                  key={product.title}
                  className="group bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer h-full flex flex-col justify-between"
                  onClick={() => navigate("/calculadora")}
                >
                  <div>
                    <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <product.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{product.title}</h3>
                    <p className="text-sm text-white/90 mb-4">
                      {product.description}
                    </p>
                  </div>
                  <button className="w-full bg-white hover:bg-white/90 text-primary px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2 group mt-auto">
                    <span>Saiba mais</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;