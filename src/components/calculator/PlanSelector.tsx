
import { motion } from "framer-motion";
import { Check, Clock, Zap, Shield, Wrench } from "lucide-react";
import { Button } from "../ui/button";
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
      name: "Express",
      description: "Ideal para pequenos negócios",
      features: [
        "2 integrações",
        "Suporte básico",
        "2.000 pedidos/mês",
        "4h PO/mês",
      ],
      monthlyLimit: 2000,
      baseImplementationPrice: 15000,
      baseMaintenancePrice: 3000,
      basePOHours: 4,
      maxIntegrations: 2,
      supportLevel: "basic",
      layout: "standard"
    },
    {
      id: "standard",
      name: "Pro",
      description: "Para negócios em crescimento",
      features: [
        "4 integrações",
        "Suporte prioritário",
        "Pedidos ilimitados",
        "8h PO/mês",
      ],
      baseImplementationPrice: 30000,
      baseMaintenancePrice: 5000,
      basePOHours: 8,
      maxIntegrations: 4,
      supportLevel: "priority",
      layout: "custom"
    },
    {
      id: "enterprise",
      name: "FullCommerce",
      description: "Solução completa e personalizada",
      features: [
        "4 integrações",
        "Suporte 24/7",
        "Infraestrutura dedicada",
        "24h PO/mês",
      ],
      baseImplementationPrice: 50000,
      baseMaintenancePrice: 12000,
      basePOHours: 24,
      maxIntegrations: 4,
      supportLevel: "24/7",
      layout: "enterprise"
    },
  ];

  const getPlanIcon = (planId: string) => {
    switch (planId) {
      case "express":
        return <Zap className="w-8 h-8 text-primary" />;
      case "standard":
        return <Shield className="w-8 h-8 text-primary" />;
      case "enterprise":
        return <Wrench className="w-8 h-8 text-primary" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <Card 
              className={`relative h-full overflow-hidden border-2 ${
                selectedPlan?.id === plan.id
                  ? "border-primary shadow-lg"
                  : "border-transparent hover:border-primary/30"
              }`}
            >
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    {getPlanIcon(plan.id)}
                    <div>
                      <h3 className="text-xl font-bold">{plan.name}</h3>
                      <p className="text-sm text-gray-600">{plan.description}</p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-base font-medium text-gray-600">A partir de</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-primary">
                        {plan.baseMaintenancePrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </span>
                      <span className="text-sm text-gray-500">/mês</span>
                    </div>
                  </div>

                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-primary shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => onPlanSelect(plan)}
                    className={`w-full ${
                      selectedPlan?.id === plan.id
                        ? "bg-primary hover:bg-primary/90"
                        : "bg-primary/10 hover:bg-primary/20 text-primary"
                    }`}
                  >
                    {selectedPlan?.id === plan.id ? "Selecionado" : "Selecionar"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PlanSelector;
