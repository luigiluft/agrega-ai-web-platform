import SolutionLayout from "@/components/solutions/SolutionLayout";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

const Marketplace = () => {
  const features = [
    {
      title: "Múltiplos Vendedores e Marcas",
      description: "Uma única plataforma para agregar diversas ofertas, ampliando o portfólio de produtos."
    },
    {
      title: "Gestão Centralizada",
      description: "Painel de controle completo para monitorar vendas, estoque, entrega e atendimento, facilitando a tomada de decisão."
    },
    {
      title: "Segurança e Confiabilidade",
      description: "Infraestrutura protegida, garantindo credibilidade e conforto para compradores e parceiros."
    },
    {
      title: "Crescimento Contínuo",
      description: "Suporte na integração com grandes marketplaces, campanhas de marketing e estratégias de expansão."
    }
  ];

  return (
    <SolutionLayout
      title="Marketplace – Soluções para E-commerce e Full-commerce"
      subtitle="Para empresas que desejam ampliar alcance e diversificar canais de venda, a Agrega ai desenvolve estruturas de marketplace robustas e escaláveis."
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

export default Marketplace;