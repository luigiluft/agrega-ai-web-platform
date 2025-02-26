
import { motion } from "framer-motion";
import { Check, Zap, Shield, Wrench, Star } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { Plan } from "@/types/calculator-types";

interface PlanSelectorProps {
  selectedPlan: Plan | null;
  onPlanSelect: (plan: Plan) => void;
}

const PlanSelector = ({ selectedPlan, onPlanSelect }: PlanSelectorProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

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
      baseImplementationPrice: 15000,
      baseMaintenancePrice: 2000,
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
      description: "Solução completa e personalizada",
      features: [
        "8 integrações",
        "Suporte 24/7",
        "Infraestrutura dedicada",
        "16h PO/mês",
      ],
      baseImplementationPrice: 50000,
      baseMaintenancePrice: 8000,
      basePOHours: 16,
      maxIntegrations: 8,
      supportLevel: "24/7",
      layout: "enterprise"
    },
  ];

  const getPlanIcon = (planId: string) => {
    switch (planId) {
      case "express":
        return <Zap className="h-10 w-10 text-orange-500" />;
      case "standard":
        return <Shield className="h-10 w-10 text-orange-500" />;
      case "enterprise":
        return <Wrench className="h-10 w-10 text-orange-500" />;
      default:
        return null;
    }
  };

  const getPopularBadge = (isPopular: boolean | undefined) => {
    if (!isPopular) return null;
    return (
      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
        <div className="relative">
          <Star className="h-6 w-6 text-orange-500 absolute -top-3 left-1/2 -translate-x-1/2" />
          <Badge className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-1 rounded-full">
            Mais Popular
          </Badge>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold text-gray-900">
          Escolha o plano ideal para seu negócio
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Selecione a solução que melhor atende às necessidades da sua empresa
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <Card 
              className={`relative h-full overflow-hidden transition-all duration-300 ${
                selectedPlan?.id === plan.id
                  ? "ring-4 ring-orange-500 ring-opacity-50 shadow-xl scale-105"
                  : "hover:shadow-lg"
              }`}
            >
              {getPopularBadge(plan.isPopular)}

              <CardContent className="p-8">
                <div className="space-y-8">
                  <div className="text-center space-y-3">
                    <div className="flex justify-center">
                      {getPlanIcon(plan.id)}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                    <p className="text-gray-600">{plan.description}</p>
                  </div>

                  <div className="text-center space-y-1">
                    <div className="text-4xl font-bold text-orange-500">
                      {formatCurrency(plan.baseImplementationPrice)}
                    </div>
                    <p className="text-gray-600">implementação</p>
                    <div className="text-2xl font-semibold text-gray-900 mt-2">
                      {formatCurrency(plan.baseMaintenancePrice)}
                      <span className="text-gray-600 text-base">/mês</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {plan.features.map((feature, index) => (
                      <div 
                        key={index} 
                        className="flex items-center gap-3 text-gray-700"
                      >
                        <div className="flex-shrink-0">
                          <div className="rounded-full p-1 bg-orange-100">
                            <Check className="w-4 h-4 text-orange-500" />
                          </div>
                        </div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    onClick={() => onPlanSelect(plan)}
                    className={`w-full py-6 text-lg font-medium transition-all duration-300 ${
                      selectedPlan?.id === plan.id
                        ? "bg-orange-500 hover:bg-orange-600 text-white shadow-lg"
                        : "bg-orange-50 hover:bg-orange-100 text-orange-600"
                    }`}
                  >
                    {selectedPlan?.id === plan.id ? (
                      <span className="flex items-center gap-2">
                        <Check className="w-5 h-5" />
                        Selecionado
                      </span>
                    ) : (
                      "Selecionar plano"
                    )}
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
