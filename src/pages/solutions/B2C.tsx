import SolutionLayout from "@/components/solutions/SolutionLayout";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

const B2C = () => {
  const features = [
    {
      title: "Design Intuitivo e Responsivo",
      description: "Navegação simples, rápida e otimizada para dispositivos móveis."
    },
    {
      title: "Checkout Otimizado",
      description: "Processos de compra ágeis, reduzindo abandono de carrinho e aumentando a satisfação do cliente."
    },
    {
      title: "Ferramentas de Marketing Integradas",
      description: "Controle de promoções, cupões, remarketing e personalização de ofertas."
    },
    {
      title: "Suporte Dedicado",
      description: "Nossa equipe acompanha você na implementação de estratégias para aumentar conversões e fidelizar consumidores."
    }
  ];

  return (
    <SolutionLayout
      title="B2C – Soluções para Venda Direta ao Consumidor"
      subtitle="A experiência do usuário é decisiva para o sucesso no B2C. Por isso, desenvolvemos sites que priorizam a jornada do cliente, convertendo visitantes em compradores satisfeitos."
    >
      <div className="grid md:grid-cols-2 gap-8">
        {features.map((feature, index) => (
          <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Check className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </SolutionLayout>
  );
};

export default B2C;