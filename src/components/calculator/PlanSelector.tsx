import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { motion } from "framer-motion";

export type Plan = {
  id: 'express' | 'standard' | 'premium';
  name: string;
  description: string;
  monthlyLimit?: number;
  features: string[];
};

interface PlanSelectorProps {
  selectedPlan: Plan | null;
  onPlanSelect: (plan: Plan) => void;
}

const plans: Plan[] = [
  {
    id: 'express',
    name: 'E-commerce Express',
    description: 'Solução básica padronizada com temas predefinidos',
    monthlyLimit: 2000,
    features: [
      'Temas predefinidos',
      'Até R$2.000/mês',
      'Configuração simplificada',
      'Suporte básico'
    ]
  },
  {
    id: 'standard',
    name: 'E-Commerce Pro',
    description: 'Personalização moderada com recursos avançados',
    features: [
      'Personalização moderada',
      'Integrações padrão',
      'Suporte dedicado',
      'Manutenção mensal'
    ]
  },
  {
    id: 'premium',
    name: 'Full-commerce Enterprise',
    description: 'Personalização completa com integrações customizadas',
    features: [
      'Personalização total',
      'Integrações customizadas',
      'Suporte premium 24/7',
      'Consultoria especializada'
    ]
  }
];

export const PlanSelector = ({ selectedPlan, onPlanSelect }: PlanSelectorProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {plans.map((plan) => (
        <motion.div
          key={plan.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card
            className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-lg ${
              selectedPlan?.id === plan.id
                ? 'border-primary ring-2 ring-primary/20'
                : 'hover:border-primary/20'
            }`}
            onClick={() => onPlanSelect(plan)}
          >
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{plan.description}</p>
              </div>

              {plan.monthlyLimit && (
                <div className="bg-primary/10 text-primary rounded-lg px-3 py-2 text-sm">
                  Até R${plan.monthlyLimit.toLocaleString('pt-BR')}/mês
                </div>
              )}

              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                variant={selectedPlan?.id === plan.id ? "default" : "outline"}
                className="w-full"
                onClick={() => onPlanSelect(plan)}
              >
                Selecionar {plan.name}
              </Button>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default PlanSelector;