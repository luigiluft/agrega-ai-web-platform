import SolutionLayout from "@/components/solutions/SolutionLayout";
import { Card } from "@/components/ui/card";
import { Check, Building2, Boxes, ShieldCheck, Users } from "lucide-react";
import { motion } from "framer-motion";

const B2B = () => {
  const features = [
    {
      icon: <Building2 className="w-6 h-6 text-primary" />,
      title: "Gestão de Catálogo Avançada",
      description: "Apresente seus produtos e serviços de forma clara, com dados detalhados e atualizações em tempo real."
    },
    {
      icon: <Boxes className="w-6 h-6 text-primary" />,
      title: "Integrações Simplificadas",
      description: "Conecte facilmente sistemas de ERP, CRM e logística, assegurando um fluxo de trabalho eficiente."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-primary" />,
      title: "Transações Seguras",
      description: "Processos de compra protegidos, garantindo confiabilidade e sigilo nas negociações."
    },
    {
      icon: <Users className="w-6 h-6 text-primary" />,
      title: "Atendimento Personalizado",
      description: "Ferramentas de comunicação diretas para criar relações duradouras com parceiros de negócio."
    }
  ];

  const benefits = [
    {
      title: "Atendimento ao Cliente Ágil",
      description: "Cotações em poucos cliques e atendimento facilitado, sem necessidade de visitas presenciais."
    },
    {
      title: "Economia",
      description: "Redução de gastos com mobilidade e deslocamento, permitindo reinvestimento em outras áreas."
    },
    {
      title: "Geografia Ilimitada",
      description: "Alcance empresas-clientes em todo o país, eliminando barreiras geográficas."
    },
    {
      title: "Fidelização do Público",
      description: "Construa relacionamentos duradouros através de uma experiência digital excepcional."
    }
  ];

  return (
    <SolutionLayout
      title="B2B – Plataforma Completa para Vendas Business-to-Business"
      subtitle="Nossa solução B2B é pensada para empresas que desejam fortalecer relações comerciais entre fornecedores, distribuidores e clientes corporativos."
    >
      <div className="space-y-16">
        {/* Features Section */}
        <section>
          <h2 className="text-2xl font-bold mb-8 text-center">Recursos Principais</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 hover:shadow-lg transition-all duration-300 h-full">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Benefits Section */}
        <section className="bg-gray-50 py-12 rounded-2xl">
          <h2 className="text-2xl font-bold mb-8 text-center">Benefícios do E-commerce B2B</h2>
          <div className="grid md:grid-cols-2 gap-8 px-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-3"
              >
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                  <Check className="h-3 w-3 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-r from-primary to-primary-dark p-8 rounded-2xl text-white"
          >
            <h2 className="text-2xl font-bold mb-4">Pronto para transformar seu negócio B2B?</h2>
            <p className="mb-6 text-white/90">
              Descubra como nossa plataforma pode impulsionar suas vendas corporativas.
            </p>
            <button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors">
              Fale com um especialista
            </button>
          </motion.div>
        </section>
      </div>
    </SolutionLayout>
  );
};

export default B2B;