import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

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
            className={`
              relative p-6 cursor-pointer transition-all duration-300
              ${selectedPlan?.id === plan.id 
                ? 'border-orange-500 ring-2 ring-orange-500/20 shadow-lg' 
                : 'hover:border-orange-500/20 hover:shadow-md'}
            `}
            onClick={() => onPlanSelect(plan)}
          >
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{plan.description}</p>
              </div>

              {plan.monthlyLimit && (
                <div className="bg-orange-100 text-orange-600 rounded-lg px-3 py-2 text-sm font-medium">
                  Até R${plan.monthlyLimit.toLocaleString('pt-BR')}/mês
                </div>
              )}

              <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                    <Check className="h-4 w-4 text-orange-500 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                variant={selectedPlan?.id === plan.id ? "default" : "outline"}
                className={`
                  w-full mt-4
                  ${selectedPlan?.id === plan.id 
                    ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                    : 'text-orange-500 border-orange-500 hover:bg-orange-50'}
                `}
                onClick={() => onPlanSelect(plan)}
              >
                {`Selecionar ${plan.name}`}
              </Button>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default PlanSelector;