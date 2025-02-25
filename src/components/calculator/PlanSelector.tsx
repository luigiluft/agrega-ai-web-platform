
import { motion } from "framer-motion";
import { Check, Clock, Info, Zap, Shield, Tool, Users } from "lucide-react";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { Plan } from "@/types/calculator-types";

interface PlanSelectorProps {
  selectedPlan: Plan | null;
  onPlanSelect: (plan: Plan) => void;
}

const PlanSelector = ({ selectedPlan, onPlanSelect }: PlanSelectorProps) => {
  const plans: Plan[] = [
    {
      id: "express",
      name: "E-commerce Express",
      description: "Ideal para pequenos negócios iniciando no e-commerce",
      features: [
        "Layout personalizado básico",
        "Até 2 integrações",
        "Suporte por email",
        "Treinamento inicial",
        "Limite de 2.000 pedidos/mês",
        "4 horas de PO por mês",
      ],
      monthlyLimit: 2000,
      baseImplementationPrice: 15000,
      baseMaintenancePrice: 2000,
      basePOHours: 4,
      maxIntegrations: 2,
      supportLevel: "basic",
      layout: "standard"
    },
    {
      id: "standard",
      name: "E-commerce Pro",
      description: "Para negócios em crescimento",
      features: [
        "Tudo do Express",
        "Até 4 integrações avançadas",
        "Suporte prioritário",
        "Gestão de marketplaces",
        "Sem limite de pedidos",
        "8 horas de PO por mês",
      ],
      isPopular: true,
      baseImplementationPrice: 30000,
      baseMaintenancePrice: 4000,
      basePOHours: 8,
      maxIntegrations: 4,
      supportLevel: "priority",
      layout: "custom"
    },
    {
      id: "enterprise",
      name: "FullCommerce",
      description: "Solução completa para grandes operações",
      features: [
        "Tudo do Pro",
        "Até 8 integrações customizadas",
        "Suporte 24/7",
        "Layout totalmente customizado",
        "Infraestrutura dedicada",
        "16 horas de PO por mês",
      ],
      baseImplementationPrice: 50000,
      baseMaintenancePrice: 8000,
      basePOHours: 16,
      maxIntegrations: 8,
      supportLevel: "24/7",
      layout: "enterprise"
    },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getPlanIcon = (planId: string) => {
    switch (planId) {
      case "express":
        return <Zap className="w-12 h-12 text-primary" />;
      case "standard":
        return <Shield className="w-12 h-12 text-primary" />;
      case "enterprise":
        return <Tool className="w-12 h-12 text-primary" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold">Escolha seu Plano</h2>
        <p className="text-gray-600">Selecione o plano que melhor atende às suas necessidades</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <Card className={`relative h-full overflow-hidden ${
              selectedPlan?.id === plan.id
                ? "ring-2 ring-primary"
                : "hover:border-primary/50"
            }`}>
              {plan.isPopular && (
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2">
                  <Badge className="bg-primary text-white px-8 py-1 rounded-full transform rotate-45">
                    Popular
                  </Badge>
                </div>
              )}

              <CardContent className="p-6 space-y-6">
                <div className="text-center space-y-4">
                  {getPlanIcon(plan.id)}
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                  <p className="text-gray-600">{plan.description}</p>
                </div>

                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-primary">
                      {formatCurrency(plan.baseImplementationPrice)}
                    </p>
                    <p className="text-sm text-gray-500">Implementação base</p>
                  </div>

                  <div className="text-center">
                    <p className="text-xl font-semibold text-gray-700">
                      {formatCurrency(plan.baseMaintenancePrice)}
                    </p>
                    <p className="text-sm text-gray-500">Manutenção mensal</p>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-primary">
                    <Clock className="w-5 h-5" />
                    <span className="font-medium">{plan.basePOHours}h PO/mês</span>
                  </div>

                  {plan.monthlyLimit && (
                    <Badge variant="secondary" className="w-full justify-center">
                      Limite: {plan.monthlyLimit.toLocaleString()} pedidos/mês
                    </Badge>
                  )}
                </div>

                <div className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary mt-0.5" />
                      <span className="text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={() => onPlanSelect(plan)}
                  className={`w-full ${
                    selectedPlan?.id === plan.id
                      ? "bg-primary hover:bg-primary/90"
                      : "bg-primary/10 hover:bg-primary/20 text-primary"
                  }`}
                >
                  {selectedPlan?.id === plan.id ? "Plano Selecionado" : "Selecionar Plano"}
                </Button>

                {plan.id === "enterprise" && (
                  <p className="text-xs text-center text-primary">
                    Parcelamento em até 12x no plano anual
                  </p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PlanSelector;
