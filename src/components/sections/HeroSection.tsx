import { Link } from "react-scroll";

const HeroSection = () => {
  return (
    <section className="relative bg-primary overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      <div className="container mx-auto px-4 py-24 relative">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-up">
            Soluções completas para seu e-commerce
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-12 animate-fade-up [animation-delay:200ms]">
            Somos o braço tecnológico do Grupo Luft para e-commerce.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 animate-fade-up [animation-delay:400ms]">
            {/* E-commerce Rápido Card */}
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
              <h3 className="text-2xl font-bold text-white mb-4">E-commerce Express</h3>
              <p className="text-white/90 mb-6">
                Lojas online com desenvolvimento ágil, layouts padronizados e custo acessível. Ideal para começar a vender online rapidamente.
              </p>
              <Link
                to="pricing-section"
                smooth={true}
                duration={500}
                className="inline-block bg-white text-primary px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-all duration-300 cursor-pointer"
              >
                Escolha seu plano
              </Link>
            </div>

            {/* Full-commerce Card */}
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
              <h3 className="text-2xl font-bold text-white mb-4">Full-commerce Enterprise</h3>
              <p className="text-white/90 mb-6">
                Solução completa de e-commerce com integrações avançadas, personalização total e gestão operacional integrada.
              </p>
              <button className="bg-white text-primary px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-all duration-300">
                Fale com Especialista
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;