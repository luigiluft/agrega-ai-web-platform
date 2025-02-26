
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
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
          Escolha seu Plano
        </h2>
        <p className="text-gray-600">Selecione o plano ideal para seu negócio</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <Card className={`relative h-full overflow-hidden border-2 ${
              selectedPlan?.id === plan.id
                ? "border-primary shadow-lg"
                : "border-transparent hover:border-primary/30"
            }`}>
              {plan.isPopular && (
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2">
                  <Badge className="bg-primary text-white px-6 py-1 rounded-full">
                    Popular
                  </Badge>
                </div>
              )}

              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    {getPlanIcon(plan.id)}
                    <div>
                      <h3 className="text-xl font-bold">{plan.name}</h3>
                      <p className="text-sm text-gray-600">{plan.description}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-primary">
                        {formatCurrency(plan.baseImplementationPrice)}
                      </span>
                      <span className="text-sm text-gray-500">implementação</span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-lg font-semibold text-gray-700">
                        {formatCurrency(plan.baseMaintenancePrice)}
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
                    onClick={() => handlePlanSelect(plan)}
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

      <Dialog open={showQuestions} onOpenChange={setShowQuestions}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Informações Operacionais</DialogTitle>
            <DialogDescription>
              Para melhor adequarmos nossa solução, precisamos de algumas informações sobre sua operação.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="skuCount" className="col-span-4">
                Quantidade de SKUs
              </Label>
              <Input
                id="skuCount"
                placeholder="Ex: 1000"
                className="col-span-4"
                value={operationalData.skuCount}
                onChange={(e) => setOperationalData({...operationalData, skuCount: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="productSize" className="col-span-4">
                Tamanho médio dos produtos
              </Label>
              <Input
                id="productSize"
                placeholder="Ex: 30x20x10 cm"
                className="col-span-4"
                value={operationalData.productSize}
                onChange={(e) => setOperationalData({...operationalData, productSize: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="averageTicket" className="col-span-4">
                Ticket Médio (R$)
              </Label>
              <Input
                id="averageTicket"
                placeholder="Ex: 150"
                className="col-span-4"
                value={operationalData.averageTicket}
                onChange={(e) => setOperationalData({...operationalData, averageTicket: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="monthlyOrders" className="col-span-4">
                Pedidos por Mês
              </Label>
              <Input
                id="monthlyOrders"
                placeholder="Ex: 1000"
                className="col-span-4"
                value={operationalData.monthlyOrders}
                onChange={(e) => setOperationalData({...operationalData, monthlyOrders: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="stockLocation" className="col-span-4">
                Localização do Estoque
              </Label>
              <Input
                id="stockLocation"
                placeholder="Ex: São Paulo - SP"
                className="col-span-4"
                value={operationalData.stockLocation}
                onChange={(e) => setOperationalData({...operationalData, stockLocation: e.target.value})}
              />
            </div>
          </div>
          <Button onClick={handleOperationalSubmit} className="w-full">
            Continuar
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PlanSelector;
