import { Link } from "react-scroll";
import { ArrowRight, Rocket, Building2 } from "lucide-react";

const HeroSection = () => {
  const themes = [
    {
      id: 1,
      name: "Fashion Store",
      image: "/lovable-uploads/4e785165-73f0-4a20-bf05-8e0fe4a58da2.png",
      description: "Tema moderno para lojas de moda",
    },
    {
      id: 2,
      name: "Tech Shop",
      image: "/lovable-uploads/4e785165-73f0-4a20-bf05-8e0fe4a58da2.png",
      description: "Layout ideal para produtos tecnológicos",
    },
    {
      id: 3,
      name: "Marketplace",
      image: "/lovable-uploads/4e785165-73f0-4a20-bf05-8e0fe4a58da2.png",
      description: "Solução completa para marketplaces",
    },
  ];

  return (
    <section className="relative bg-primary overflow-hidden pt-20">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      <div className="container mx-auto px-4 py-24 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-up leading-tight">
                Soluções completas para seu e-commerce
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-12 animate-fade-up [animation-delay:200ms] leading-relaxed">
                Somos o braço tecnológico do Grupo Luft para e-commerce, transformando negócios através da tecnologia.
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

            <div className="hidden md:flex flex-col gap-4 relative animate-fade-up [animation-delay:600ms]">
              {themes.map((theme) => (
                <div
                  key={theme.id}
                  className="group relative bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden transition-all duration-300 hover:scale-105 hover:z-10"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img
                      src={theme.image}
                      alt={theme.name}
                      className="w-full h-full object-cover object-top transform group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-xl font-bold text-white mb-2">{theme.name}</h3>
                        <p className="text-white/90 text-sm">{theme.description}</p>
                      </div>
                    </div>
                  </div>
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