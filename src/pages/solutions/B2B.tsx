import SolutionLayout from "@/components/solutions/SolutionLayout";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

const B2B = () => {
  const features = [
    {
      title: "Gestão de Catálogo Avançada",
      description: "Apresente seus produtos e serviços de forma clara, com dados detalhados e atualizações em tempo real."
    },
    {
      title: "Integrações Simplificadas",
      description: "Conecte facilmente sistemas de ERP, CRM e logística, assegurando um fluxo de trabalho eficiente."
    },
    {
      title: "Transações Seguras",
      description: "Processos de compra protegidos, garantindo confiabilidade e sigilo nas negociações."
    },
    {
      title: "Atendimento Personalizado",
      description: "Ferramentas de comunicação diretas para criar relações duradouras com parceiros de negócio."
    }
  ];

  return (
    <SolutionLayout
      title="B2B – Plataforma Completa para Vendas Business-to-Business"
      subtitle="Nossa solução B2B é pensada para empresas que desejam fortalecer relações comerciais entre fornecedores, distribuidores e clientes corporativos."
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

export default B2B;