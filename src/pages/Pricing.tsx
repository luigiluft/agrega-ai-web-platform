import React from "react";
import NavigationMenuDemo from "@/components/NavigationMenu";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const PricingPage = () => {
  const plans = [
    {
      title: "Starter",
      price: "Sob Consulta",
      description: "Ideal para pequenos negócios iniciando no e-commerce",
      features: [
        "Plataforma e-commerce básica",
        "Até 1.000 produtos",
        "Integrações essenciais",
        "Suporte por email",
        "Treinamento inicial",
        "1 usuário administrador",
        "Checkout padrão",
        "Relatórios básicos",
        "SSL gratuito",
        "Backup diário",
        "Atualizações de segurança",
        "Hospedagem incluída"
      ]
    },
    {
      title: "Business",
      price: "Sob Consulta",
      description: "Perfeito para negócios em crescimento",
      isPopular: true,
      features: [
        "Tudo do plano Starter, mais:",
        "Até 10.000 produtos",
        "Integrações avançadas",
        "Suporte prioritário",
        "Gestão de marketplaces",
        "Dashboard analytics avançado",
        "5 usuários administradores",
        "Checkout personalizado",
        "API REST completa",
        "Múltiplas moedas",
        "Sistema de cupons avançado",
        "Integração com ERP",
        "SEO avançado",
        "Relatórios personalizados"
      ]
    },
    {
      title: "Enterprise",
      price: "Sob Consulta",
      description: "Para grandes operações e casos específicos",
      features: [
        "Tudo do plano Business, mais:",
        "Produtos ilimitados",
        "Integrações customizadas",
        "Suporte 24/7",
        "Gerente de sucesso dedicado",
        "SLA garantido",
        "Usuários ilimitados",
        "Checkout white-label",
        "Infraestrutura dedicada",
        "Alta disponibilidade",
        "Ambiente de staging",
        "Customizações exclusivas",
        "Treinamento in-company",
        "Consultoria especializada"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationMenuDemo />
      
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold mb-6">
            Escolha o plano ideal para seu negócio
          </h1>
          <p className="text-lg text-gray-600">
            Oferecemos soluções flexíveis que crescem junto com sua operação.
            Todos os planos incluem suporte técnico e atualizações regulares.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.title}
              className={`
                bg-white rounded-2xl shadow-lg p-8
                ${plan.isPopular ? 'ring-2 ring-primary relative' : ''}
              `}
            >
              {plan.isPopular && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                  Mais Popular
                </span>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.title}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="text-3xl font-bold">{plan.price}</div>
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>

              <Button 
                className={`w-full py-6 ${
                  plan.isPopular 
                    ? 'bg-primary hover:bg-primary/90' 
                    : 'bg-gray-900 hover:bg-gray-800'
                }`}
              >
                Falar com consultor
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600">
            Precisa de uma solução personalizada?{" "}
            <a href="/contato" className="text-primary hover:underline">
              Entre em contato
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;