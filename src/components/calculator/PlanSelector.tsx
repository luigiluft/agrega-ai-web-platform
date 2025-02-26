import { motion } from "framer-motion";
import { Check, Clock, Zap, Shield, Wrench } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { Plan } from "@/types/calculator-types";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PlanSelectorProps {
  selectedPlan: Plan | null;
  onPlanSelect: (plan: Plan) => void;
}

interface OperationalQuestions {
  productSize: string;
  skuCount: string;
  averageTicket: string;
  monthlyOrders: string;
  stockLocation: string;
}

const PlanSelector = ({ selectedPlan, onPlanSelect }: PlanSelectorProps) => {
  const [showQuestions, setShowQuestions] = useState(false);
  const [operationalData, setOperationalData] = useState<OperationalQuestions>({
    productSize: "",
    skuCount: "",
    averageTicket: "",
    monthlyOrders: "",
    stockLocation: ""
  });

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

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

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

  const handlePlanSelect = (plan: Plan) => {
    if (plan.id === "enterprise") {
      setShowQuestions(true);
    } else {
      onPlanSelect(plan);
    }
  };

  const handleOperationalSubmit = () => {
    const enterprisePlan = plans.find(p => p.id === "enterprise");
    if (enterprisePlan) {
      onPlanSelect(enterprisePlan);
    }
    setShowQuestions(false);
  };

  return (
    <div className="space-y-10">
      <div className="text-center space-y-6">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
          Escolha o plano ideal para seu negócio
        </h2>
        <p className="text-gray-600 text-lg">
          Selecione a solução que melhor atende às necessidades da sua empresa
        </p>
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
            <Card 
              className={`relative h-full overflow-hidden border-2 transition-all duration-300 ${
                selectedPlan?.id === plan.id
                  ? "border-orange-500 shadow-lg shadow-orange-500/20"
                  : "border-transparent hover:border-orange-300"
              }`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2">
                  <Badge className="bg-orange-500 text-white px-6 py-1 rounded-full font-semibold">
                    Popular
                  </Badge>
                </div>
              )}

              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    {getPlanIcon(plan.id)}
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                      <p className="text-gray-600 mt-1">{plan.description}</p>
                    </div>
                  </div>

                  <div className="space-y-2 pt-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-orange-600">
                        {formatCurrency(plan.baseImplementationPrice)}
                      </span>
                      <span className="text-gray-600">implementação</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-semibold text-gray-800">
                        {formatCurrency(plan.baseMaintenancePrice)}
                      </span>
                      <span className="text-gray-600">/mês</span>
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3 text-gray-700">
                        <Check className="w-5 h-5 text-orange-500 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => handlePlanSelect(plan)}
                    className={`w-full text-lg py-6 ${
                      selectedPlan?.id === plan.id
                        ? "bg-orange-500 hover:bg-orange-600 text-white"
                        : "bg-orange-50 hover:bg-orange-100 text-orange-600"
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
