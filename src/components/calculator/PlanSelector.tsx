import { motion } from "framer-motion";
import { Check, Clock } from "lucide-react";
import { Button } from "../ui/button";

export interface Plan {
  id: string;
  name: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  monthlyLimit?: number;
  baseImplementationPrice: number;
  baseMaintenancePrice: number;
  basePOHours: number;
  maxIntegrations: number;
}

interface PlanSelectorProps {
  selectedPlan: Plan | null;
  onPlanSelect: (plan: Plan) => void;
}

const PlanSelector = ({ selectedPlan, onPlanSelect }: PlanSelectorProps) => {
  const plans: Plan[] = [
    {
      id: "express",
      name: "E-commerce Express",
      description: "Ideal para pequenos negócios",
      features: [
        "Layout personalizado",
        "Integrações básicas",
        "Suporte por email",
        "Treinamento inicial",
      ],
      monthlyLimit: 2000,
      baseImplementationPrice: 15000,
      baseMaintenancePrice: 2000,
      basePOHours: 4,
      maxIntegrations: 2,
    },
    {
      id: "standard",
      name: "E-commerce Pro",
      description: "Para negócios em crescimento",
      features: [
        "Tudo do Express",
        "Integrações avançadas",
        "Suporte prioritário",
        "Gestão de marketplaces",
      ],
      isPopular: true,
      baseImplementationPrice: 30000,
      baseMaintenancePrice: 4000,
      basePOHours: 8,
      maxIntegrations: 4,
    },
    {
      id: "enterprise",
      name: "FullCommerce",
      description: "Solução completa para grandes operações",
      features: [
        "Tudo do Standard",
        "Integrações customizadas",
        "Suporte 24/7",
        "Infraestrutura dedicada",
      ],
      baseImplementationPrice: 50000,
      baseMaintenancePrice: 8000,
      basePOHours: 16,
      maxIntegrations: 8,
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
            <div className="mt-4 space-y-2">
              <p className="font-semibold text-lg">
                R$ {plan.baseImplementationPrice.toLocaleString('pt-BR')}
              </p>
              <p className="text-sm text-gray-500">Implementação base</p>
              <p className="text-xs text-green-600">
                Parcele em até 12x no plano anual
              </p>
              <p className="font-semibold text-lg">
                R$ {plan.baseMaintenancePrice.toLocaleString('pt-BR')}
              </p>
              <p className="text-sm text-gray-500">Manutenção mensal</p>
              <div className="flex items-center justify-center gap-2 text-primary">
                <Clock className="w-4 h-4" />
                <span>{plan.basePOHours}h PO/mês</span>
              </div>
            </div>
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