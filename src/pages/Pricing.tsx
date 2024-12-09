import React from "react";
import NavigationMenuDemo from "@/components/NavigationMenu";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const PricingPage = () => {
  const { toast } = useToast();
  
  const handleContactClick = () => {
    toast({
      title: "Contato iniciado",
      description: "Em breve nossa equipe entrará em contato com você.",
    });
  };

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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <NavigationMenuDemo />
      
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-dark">
            Escolha o plano ideal para seu negócio
          </h1>
          <p className="text-lg text-gray-600">
            Oferecemos soluções flexíveis que crescem junto com sua operação.
            Todos os planos incluem suporte técnico e atualizações regulares.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.title}
              className={`
                relative bg-white rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl
                transform hover:-translate-y-2 animate-fade-up
                ${plan.isPopular ? 'ring-2 ring-primary' : ''}
              `}
              style={{
                animationDelay: `${index * 150}ms`
              }}
            >
              {plan.isPopular && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-medium animate-bounce">
                  Mais Popular
                </span>
              )}

              <div className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.title}</h3>
                  <p className="text-gray-600 mb-4 min-h-[48px]">{plan.description}</p>
                  <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-dark">
                    {plan.price}
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3 group">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 group-hover:bg-primary/20 transition-colors">
                        <Check className="h-3 w-3 text-primary" />
                      </div>
                      <span className="text-gray-600 group-hover:text-gray-900 transition-colors">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <Button 
                  className={`
                    w-full py-6 transition-all duration-300
                    ${plan.isPopular 
                      ? 'bg-primary hover:bg-primary/90 shadow-lg hover:shadow-primary/25' 
                      : 'bg-gray-900 hover:bg-gray-800'}
                  `}
                  onClick={handleContactClick}
                >
                  Falar com consultor
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center animate-fade-up" style={{ animationDelay: '450ms' }}>
          <p className="text-gray-600">
            Precisa de uma solução personalizada?{" "}
            <button 
              onClick={handleContactClick}
              className="text-primary hover:text-primary-dark hover:underline transition-colors"
            >
              Entre em contato
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;