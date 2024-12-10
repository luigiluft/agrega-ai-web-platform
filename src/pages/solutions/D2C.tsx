import SolutionLayout from "@/components/solutions/SolutionLayout";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

const D2C = () => {
  const features = [
    {
      title: "Controle Total da Marca",
      description: "Apresente sua identidade visual e valores sem intermediários."
    },
    {
      title: "Experiência Exclusiva",
      description: "Conteúdos personalizados, recomendação de produtos e narrativas que envolvem o consumidor."
    },
    {
      title: "Dados e Inteligência de Mercado",
      description: "Ferramentas analíticas para compreender o comportamento do cliente e ajustar suas estratégias de forma contínua."
    },
    {
      title: "Suporte Integrado",
      description: "Orientação em cada etapa para otimizar o funil de vendas e manter uma relação sólida com sua audiência."
    }
  ];

  return (
    <SolutionLayout
      title="D2C – Estratégias Direct-to-Consumer Sob Medida"
      subtitle="No modelo D2C, a aproximação entre marca e cliente é fundamental. Com a Agrega ai, seu site torna-se um canal direto de comunicação e vendas."
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

export default D2C;