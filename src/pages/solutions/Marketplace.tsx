import SolutionLayout from "@/components/solutions/SolutionLayout";
import { Card } from "@/components/ui/card";
import { Check, Store, TrendingUp, ShieldCheck, Users } from "lucide-react";

const Marketplace = () => {
  const features = [
    {
      title: "Múltiplos Vendedores",
      description: "Uma única plataforma para agregar diversas ofertas, ampliando o portfólio de produtos.",
      icon: Store
    },
    {
      title: "Gestão Centralizada",
      description: "Painel de controle completo para monitorar vendas, estoque e atendimento.",
      icon: TrendingUp
    },
    {
      title: "Segurança e Confiabilidade",
      description: "Infraestrutura protegida, garantindo credibilidade para compradores e parceiros.",
      icon: ShieldCheck
    },
    {
      title: "Crescimento Contínuo",
      description: "Suporte na integração e estratégias de expansão do seu negócio.",
      icon: Users
    }
  ];

  const types = [
    {
      title: "Gerador de Pedidos",
      description: "Marketplace gerencia todo o processo de venda, incluindo pagamentos e atendimento.",
      benefits: [
        "Gestão completa do processo de venda",
        "Pagamentos centralizados",
        "Maior confiança do consumidor",
        "Suporte integrado"
      ]
    },
    {
      title: "Gerador de Leads",
      description: "Marketplace direciona clientes para sua loja, onde você finaliza a venda.",
      benefits: [
        "Maior controle sobre as vendas",
        "Gestão própria de pagamentos",
        "Relacionamento direto com cliente",
        "Flexibilidade nas operações"
      ]
    }
  ];

  return (
    <SolutionLayout
      title="Marketplace – A Evolução do E-commerce"
      subtitle="Transforme seu negócio em um ecossistema digital completo, reunindo diversos vendedores em uma única plataforma."
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
          <h2 className="text-2xl font-bold mb-8 text-center">Modelos de Marketplace</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {types.map((type, index) => (
              <Card key={index} className="p-6">
                <h3 className="text-xl font-semibold mb-4">{type.title}</h3>
                <p className="text-gray-600 mb-6">{type.description}</p>
                <ul className="space-y-3">
                  {type.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-gray-600">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </SolutionLayout>
  );
};

export default Marketplace;