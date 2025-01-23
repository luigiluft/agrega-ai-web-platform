import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "../ui/button";

export interface Plan {
  id: string;
  name: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  monthlyLimit?: number;
}

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
        "Layout personalizado",
        "Integrações básicas",
        "Suporte por email",
        "Treinamento inicial",
      ],
      monthlyLimit: 2000,
    },
    {
      id: "standard",
      name: "Standard",
      description: "Para negócios em crescimento",
      features: [
        "Tudo do Express",
        "Integrações avançadas",
        "Suporte prioritário",
        "Gestão de marketplaces",
      ],
      isPopular: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      description: "Solução completa para grandes operações",
      features: [
        "Tudo do Standard",
        "Integrações customizadas",
        "Suporte 24/7",
        "Infraestrutura dedicada",
      ],
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {plans.map((plan) => (
        <motion.div
          key={plan.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`relative rounded-xl border p-6 shadow-lg transition-all duration-300 ${
            selectedPlan?.id === plan.id
              ? "border-primary bg-primary/5"
              : "border-gray-200 hover:border-primary/50"
          }`}
        >
          {plan.isPopular && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="bg-primary text-white text-sm px-3 py-1 rounded-full">
                Mais Popular
              </span>
            </div>
          )}

          <div className="text-center mb-6">
            <h3 className="text-xl font-bold">{plan.name}</h3>
            <p className="text-gray-600 mt-2">{plan.description}</p>
          </div>

          <ul className="space-y-3 mb-6">
            {plan.features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <Check className="w-5 h-5 text-primary" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <Button
            onClick={() => onPlanSelect(plan)}
            className={`w-full ${
              selectedPlan?.id === plan.id
                ? "bg-primary hover:bg-primary/90"
                : "bg-gray-100 hover:bg-gray-200 text-gray-900"
            }`}
          >
            Selecionar
          </Button>
        </motion.div>
      ))}
    </div>
  );
};

export default PlanSelector;