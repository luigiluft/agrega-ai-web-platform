import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight } from "lucide-react";

const FAQSection = () => {
  const faqs = [
    {
      question: "Quanto tempo leva para criar minha loja virtual?",
      answer: "O tempo de desenvolvimento varia conforme o plano escolhido. Para lojas Express, entregamos em até 15 dias úteis. Para soluções Full-commerce Enterprise, o prazo é personalizado conforme a complexidade do projeto."
    },
    {
      question: "Quais métodos de pagamento são aceitos?",
      answer: "Integramos com as principais gateways de pagamento do mercado, incluindo Mercado Pago, PagSeguro, Stripe e outros. Você pode escolher as melhores opções para seu negócio."
    },
    {
      question: "Como funciona o suporte técnico?",
      answer: "Oferecemos suporte técnico especializado por chat, e-mail e telefone nos dias úteis. Para clientes Enterprise, disponibilizamos suporte 24/7 e gerente de conta dedicado."
    },
    {
      question: "É possível integrar com marketplaces?",
      answer: "Sim! Nossas soluções Full-commerce Enterprise incluem integrações com os principais marketplaces como Mercado Livre, Amazon, Magalu e outros, permitindo gestão centralizada de pedidos e estoque."
    },
    {
      question: "Vocês oferecem hospedagem para o site?",
      answer: "Sim, todos os nossos planos incluem hospedagem em servidores de alta performance, com certificado SSL gratuito e backup diário dos dados."
    },
    {
      question: "Como funciona o processo de migração de outra plataforma?",
      answer: "Nossa equipe realiza todo o processo de migração, incluindo produtos, clientes e pedidos. Garantimos uma transição suave e sem perda de dados."
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Dúvidas Frequentes
          </h2>
          <p className="text-gray-600 text-center mb-12">
            Encontre respostas para as principais dúvidas sobre nossas soluções
          </p>
          
          <Accordion type="single" collapsible className="w-full mb-12">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="text-center">
            <button className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-lg font-medium hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Fale com Especialista
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;