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
    <div className="min-h-screen">
      <NavigationMenuDemo />
      
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 animate-fade-up">
            Transforme seu negócio com soluções full-commerce
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Somos o braço tecnológico do Grupo Luft para e-commerce. Desenvolvemos soluções B2B, B2C, D2C e integrações para marketplaces.
          </p>
          <button className="bg-white text-primary px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
            Fale com um Especialista
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Por que escolher a Agrega AI?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold mb-4">Experiência Comprovada</h3>
              <p className="text-gray-600">
                Parte do Grupo Luft, com ampla experiência em operações de e-commerce e logística.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold mb-4">Soluções Integradas</h3>
              <p className="text-gray-600">
                Automatização e centralização de operações com integrações customizadas.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold mb-4">Especialização por Segmento</h3>
              <p className="text-gray-600">
                Expertise em cosméticos, suplementos, moda e outros segmentos do varejo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Soluções para cada fase do seu negócio
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <PricingCard key={index} {...plan} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Cases de Sucesso
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Testimonial key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Pronto para transformar seu e-commerce?
          </h2>
          <p className="text-xl mb-8">
            Converse com nossos especialistas e descubra como a Agrega AI pode impulsionar seu negócio.
          </p>
          <button className="bg-white text-primary px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
            Agende uma Demonstração
          </button>
        </div>
      </section>
    </div>
  );
};

export default Index;