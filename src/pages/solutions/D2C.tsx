import SolutionLayout from "@/components/solutions/SolutionLayout";
import { Card } from "@/components/ui/card";
import { Check, TrendingUp, Users, ShoppingBag, Shield } from "lucide-react";

const D2C = () => {
  const features = [
    {
      title: "Controle Total da Marca",
      description: "Apresente sua identidade visual e valores sem intermediários.",
      icon: Shield
    },
    {
      title: "Experiência Exclusiva",
      description: "Conteúdos personalizados, recomendação de produtos e narrativas que envolvem o consumidor.",
      icon: Users
    },
    {
      title: "Dados e Inteligência de Mercado",
      description: "Ferramentas analíticas para compreender o comportamento do cliente e ajustar suas estratégias.",
      icon: TrendingUp
    },
    {
      title: "Vendas Diretas",
      description: "Elimine intermediários e aumente sua margem de lucro vendendo diretamente ao consumidor.",
      icon: ShoppingBag
    }
  ];

  const advantages = [
    {
      title: "Crescimento Comprovado",
      description: "Grandes marcas como Nike já registram aumentos significativos (28%) em vendas diretas."
    },
    {
      title: "Flexibilidade de Canais",
      description: "Combine estratégias online e offline para maximizar seu alcance."
    },
    {
      title: "Relacionamento Direto",
      description: "Construa uma relação mais próxima com seus clientes e obtenha feedback valioso."
    },
    {
      title: "Adaptação ao Mercado",
      description: "Responda rapidamente às mudanças de comportamento do consumidor."
    }
  ];

  return (
    <SolutionLayout
      title="D2C – O Futuro do E-commerce"
      subtitle="O Direct-to-Consumer está revolucionando o mercado brasileiro, permitindo que marcas vendam diretamente aos consumidores finais, sem intermediários."
    >
      <div className="space-y-16">
        <section className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </section>

        <section className="bg-gray-50 p-8 rounded-xl">
          <h2 className="text-2xl font-bold mb-8 text-center">Por que escolher o modelo D2C?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {advantages.map((advantage, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Check className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">{advantage.title}</h3>
                  <p className="text-gray-600">{advantage.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </SolutionLayout>
  );
};

export default D2C;