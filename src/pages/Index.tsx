import NavigationMenuDemo from "../components/NavigationMenu";
import PricingCard from "../components/PricingCard";
import Testimonial from "../components/Testimonial";

const Index = () => {
  const pricingPlans = [
    {
      title: "Starter",
      price: "Sob Consulta",
      features: [
        "Plataforma e-commerce básica",
        "Integrações essenciais",
        "Suporte por email",
        "Treinamento inicial",
      ],
    },
    {
      title: "Business",
      price: "Sob Consulta",
      features: [
        "Plataforma e-commerce completa",
        "Integrações avançadas",
        "Suporte prioritário",
        "Gestão de marketplaces",
        "Dashboard analytics",
      ],
      isPopular: true,
    },
    {
      title: "Enterprise",
      price: "Sob Consulta",
      features: [
        "Solução full-commerce",
        "Integrações customizadas",
        "Suporte 24/7",
        "Gerente de sucesso dedicado",
        "SLA garantido",
      ],
    },
  ];

  const testimonials = [
    {
      quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      author: "Empresa Cliente",
      role: "Segmento Cosméticos",
    },
    {
      quote: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      author: "Empresa Cliente",
      role: "Segmento Moda",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <NavigationMenuDemo />
      
      {/* Hero Section */}
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
                <button className="bg-white text-primary px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-all duration-300">
                  Comece Agora
                </button>
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

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Por que escolher a Agrega AI?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Experiência Comprovada</h3>
              <p className="text-gray-600">
                Parte do Grupo Luft, com ampla experiência em operações de e-commerce e logística.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Soluções Integradas</h3>
              <p className="text-gray-600">
                Automatização e centralização de operações com integrações customizadas.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Especialização por Segmento</h3>
              <p className="text-gray-600">
                Expertise em cosméticos, suplementos, moda e outros segmentos do varejo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Soluções para cada fase do seu negócio
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <PricingCard key={index} {...plan} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Cases de Sucesso
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Testimonial key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="container mx-auto px-4 py-24 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Pronto para transformar seu e-commerce?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Converse com nossos especialistas e descubra como a Agrega AI pode impulsionar seu negócio.
            </p>
            <button className="bg-white text-primary px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Agende uma Demonstração
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;