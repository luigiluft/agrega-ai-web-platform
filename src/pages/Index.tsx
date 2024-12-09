import PricingCard from "../components/PricingCard";
import Testimonial from "../components/Testimonial";

const Index = () => {
  const pricingPlans = [
    {
      title: "Básico",
      price: "Grátis",
      features: ["Até 100 interações", "Chat básico", "Suporte por email"],
    },
    {
      title: "Pro",
      price: "R$97",
      features: ["Interações ilimitadas", "Chat avançado", "Suporte prioritário", "Analytics"],
      isPopular: true,
    },
    {
      title: "Enterprise",
      price: "R$297",
      features: ["Tudo do Pro", "API dedicada", "Gerente de sucesso", "SLA garantido"],
    },
  ];

  const testimonials = [
    {
      quote: "Agrega AI revolucionou nossa forma de interagir com clientes.",
      author: "Maria Silva",
      role: "CEO, TechStart",
    },
    {
      quote: "Aumentamos nossa eficiência em 300% com Agrega AI.",
      author: "João Santos",
      role: "Diretor de Operações, InovaTech",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 animate-fade-up">
            Potencialize seu negócio com Agrega AI
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Automatize interações, aumente vendas e melhore a satisfação dos seus clientes com nossa plataforma de IA.
          </p>
          <button className="bg-white text-primary px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
            Começar Gratuitamente
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Por que escolher Agrega AI?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold mb-4">Inteligência Artificial Avançada</h3>
              <p className="text-gray-600">
                Nossa IA aprende continuamente para oferecer interações mais naturais e eficientes.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold mb-4">Integração Simples</h3>
              <p className="text-gray-600">
                Configure em minutos e integre com suas ferramentas favoritas.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold mb-4">Resultados Comprovados</h3>
              <p className="text-gray-600">
                Aumento médio de 200% na eficiência do atendimento ao cliente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Planos para todos os tamanhos de negócio
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
            O que nossos clientes dizem
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
            Pronto para transformar seu negócio?
          </h2>
          <p className="text-xl mb-8">
            Comece gratuitamente hoje e descubra o poder da Agrega AI.
          </p>
          <button className="bg-white text-primary px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
            Começar Agora
          </button>
        </div>
      </section>
    </div>
  );
};

export default Index;