import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Calculator } from "lucide-react";
import { useToast } from "./ui/use-toast";

const HOURLY_RATE = 100;
const IMPLEMENTATION_MARGIN = 0.10;
const MAINTENANCE_MARGIN = 0.30;

type Plan = {
  name: string;
  implementationHours: number;
  maintenanceHours: number;
  revenueSharePercentage: number;
};

const plans: Plan[] = [
  {
    name: "Starter",
    implementationHours: 85,
    maintenanceHours: 10,
    revenueSharePercentage: 0.02,
  },
  {
    name: "Pro",
    implementationHours: 226,
    maintenanceHours: 15,
    revenueSharePercentage: 0.015,
  },
  {
    name: "Custom",
    implementationHours: 414,
    maintenanceHours: 30,
    revenueSharePercentage: 0.01,
  },
];

const PriceCalculator = () => {
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState<Plan>(plans[0]);
  const [monthlyRevenue, setMonthlyRevenue] = useState<string>("50000");

  const calculatePrices = () => {
    const revenue = parseFloat(monthlyRevenue) || 0;
    
    const baseImplementationCost = selectedPlan.implementationHours * HOURLY_RATE;
    const implementationPrice = baseImplementationCost * (1 + IMPLEMENTATION_MARGIN);
    
    const baseMaintenanceCost = selectedPlan.maintenanceHours * HOURLY_RATE;
    const maintenancePrice = baseMaintenanceCost * (1 + MAINTENANCE_MARGIN);
    
    const revenueShare = revenue * selectedPlan.revenueSharePercentage;

    return {
      implementationPrice: implementationPrice.toFixed(2),
      maintenancePrice: maintenancePrice.toFixed(2),
      revenueShare: revenueShare.toFixed(2),
    };
  };

  const prices = calculatePrices();

  const handleContactClick = () => {
    toast({
      title: "Orçamento solicitado",
      description: "Em breve nossa equipe entrará em contato com você.",
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Calculator className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Calculadora de Preços</SheetTitle>
          <SheetDescription>
            Simule os custos baseados no seu plano e faturamento mensal
          </SheetDescription>
        </SheetHeader>
        
        <div className="mt-8 space-y-6">
          <div className="space-y-2">
            <Label>Plano</Label>
            <div className="grid grid-cols-3 gap-2">
              {plans.map((plan) => (
                <Button
                  key={plan.name}
                  variant={selectedPlan.name === plan.name ? "default" : "outline"}
                  onClick={() => setSelectedPlan(plan)}
                >
                  {plan.name}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="revenue">Faturamento Mensal Estimado (R$)</Label>
            <Input
              id="revenue"
              type="number"
              value={monthlyRevenue}
              onChange={(e) => setMonthlyRevenue(e.target.value)}
              min="0"
              step="1000"
            />
          </div>

          <div className="rounded-lg border p-4 space-y-4">
            <div>
              <div className="text-sm text-muted-foreground">Implementação (único)</div>
              <div className="text-2xl font-bold">R$ {prices.implementationPrice}</div>
            </div>
            
            <div>
              <div className="text-sm text-muted-foreground">Manutenção Mensal</div>
              <div className="text-2xl font-bold">R$ {prices.maintenancePrice}</div>
            </div>
            
            <div>
              <div className="text-sm text-muted-foreground">
                Taxa sobre Receita ({(selectedPlan.revenueSharePercentage * 100).toFixed(1)}%)
              </div>
              <div className="text-2xl font-bold">R$ {prices.revenueShare}/mês</div>
            </div>
          </div>

          <Button className="w-full" onClick={handleContactClick}>
            Solicitar Orçamento
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default PriceCalculator;