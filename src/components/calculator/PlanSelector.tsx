
import { motion } from "framer-motion";
import { Check, Clock, Info } from "lucide-react";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Badge } from "../ui/badge";

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
  supportLevel: "basic" | "priority" | "24/7";
  layout: "standard" | "custom" | "enterprise";
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
              <div className="flex flex-col items-center gap-1">
                <p className="font-semibold text-lg">
                  {formatCurrency(plan.baseImplementationPrice)}
                </p>
                <p className="text-sm text-gray-500">Implementação base</p>
              </div>

              <div className="flex flex-col items-center gap-1">
                <p className="font-semibold text-lg">
                  {formatCurrency(plan.baseMaintenancePrice)}
                </p>
                <p className="text-sm text-gray-500">Manutenção mensal</p>
              </div>

              <div className="flex items-center justify-center gap-2 text-primary">
                <Clock className="w-4 h-4" />
                <span>{plan.basePOHours}h PO/mês</span>
              </div>

              {plan.monthlyLimit && (
                <Badge variant="secondary">
                  Limite: {plan.monthlyLimit.toLocaleString()} pedidos/mês
                </Badge>
              )}

              {plan.layout === "enterprise" && (
                <Badge variant="default" className="bg-primary">
                  Layout totalmente customizado incluso
                </Badge>
              )}
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

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
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
              </TooltipTrigger>
              <TooltipContent>
                <p>Clique para configurar seu {plan.name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {plan.id === "enterprise" && (
            <div className="mt-4 text-xs text-center text-primary">
              Parcelamento em até 12x no plano anual
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default PlanSelector;
