import PricingCard from "../PricingCard";
import { useNavigate } from "react-router-dom";

const PricingSection = () => {
  const navigate = useNavigate();

  const pricingPlans = [
    {
      title: "Starter",
      price: "Sob Consulta",
      features: [
        "Plataforma e-commerce básica",
        "Integrações essenciais",
        "Suporte por email",
        "Treinamento inicial",
      ],
      expandedFeatures: [
        "Escolha entre temas padrão",
        "Sem personalização de layout",
        "Até 1.000 produtos",
        "1 usuário administrador",
        "Checkout padrão",
        "Relatórios básicos",
        "SSL gratuito",
        "Backup diário",
      ],
    },
    {
      title: "Pro",
      price: "Sob Consulta",
      features: [
        "Plataforma e-commerce completa",
        "Integrações avançadas",
        "Suporte prioritário",
        "Gestão de marketplaces",
        "Dashboard analytics",
      ],
      expandedFeatures: [
        "Personalização moderada de temas",
        "Até 10.000 produtos",
        "5 usuários administradores",
        "Checkout personalizado",
        "API REST completa",
        "Múltiplas moedas",
        "Sistema de cupons avançado",
        "Integração com ERP",
      ],
      isPopular: true,
    },
    {
      title: "Custom",
      price: "Sob Consulta",
      features: [
        "Solução full-commerce",
        "Integrações customizadas",
        "Suporte 24/7",
        "Gerente de sucesso dedicado",
        "SLA garantido",
      ],
      expandedFeatures: [
        "Personalização total do tema",
        "Produtos ilimitados",
        "Usuários ilimitados",
        "Checkout white-label",
        "Infraestrutura dedicada",
        "Alta disponibilidade",
        "Ambiente de staging",
        "Consultoria especializada",
      ],
    },
  ];

  const handlePlanClick = (planTitle: string) => {
    // Navigate to calculator with the selected plan as a parameter
    navigate(`/calculadora?plano=${encodeURIComponent(planTitle.toLowerCase())}`);
  };

  return (
    <section id="pricing-section" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Soluções para cada fase do seu negócio
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <PricingCard 
              key={index} 
              {...plan} 
              onClick={() => handlePlanClick(plan.title)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;