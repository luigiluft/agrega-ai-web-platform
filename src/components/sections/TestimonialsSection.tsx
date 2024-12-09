import Testimonial from "../Testimonial";

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "A migração para a Agrega AI nos permitiu reduzir custos operacionais em 40% e aumentar nossas vendas em 2.5x no primeiro trimestre.",
      author: "Cosméticos Beauty",
      role: "Segmento Cosméticos",
    },
    {
      quote: "O suporte 24/7 e a facilidade de integração com marketplaces foram decisivos para escolhermos a Agrega AI. Hoje processamos mais de 5000 pedidos/mês.",
      author: "Fashion Store",
      role: "Segmento Moda",
    },
    {
      quote: "A implementação foi muito mais rápida do que esperávamos. Em 2 semanas já estávamos vendendo online com toda a operação integrada.",
      author: "Tech Gadgets",
      role: "Segmento Eletrônicos",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Cases de Sucesso
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Testimonial key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;