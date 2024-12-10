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
import { Slider } from "./ui/slider";

type Plan = {
  name: string;
  implementationHours: number;
  maintenanceHours: number;
  revenueSharePercentage: number;
};

const defaultPlans: Plan[] = [
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
  const [selectedPlan, setSelectedPlan] = useState<Plan>(defaultPlans[0]);
  const [monthlyRevenue, setMonthlyRevenue] = useState<string>("50000");
  const [hourlyRate, setHourlyRate] = useState<string>("100");
  const [implementationMargin, setImplementationMargin] = useState<number>(10);
  const [maintenanceMargin, setMaintenanceMargin] = useState<number>(30);
  const [customImplementationHours, setCustomImplementationHours] = useState<string>(defaultPlans[0].implementationHours.toString());
  const [customMaintenanceHours, setCustomMaintenanceHours] = useState<string>(defaultPlans[0].maintenanceHours.toString());
  const [customRevenueShare, setCustomRevenueShare] = useState<number>(defaultPlans[0].revenueSharePercentage * 100);

  const calculatePrices = () => {
    const revenue = parseFloat(monthlyRevenue) || 0;
    const rate = parseFloat(hourlyRate) || 100;
    
    const implementationHours = parseFloat(customImplementationHours) || selectedPlan.implementationHours;
    const maintenanceHours = parseFloat(customMaintenanceHours) || selectedPlan.maintenanceHours;
    const revenueSharePercent = customRevenueShare / 100;
    
    const baseImplementationCost = implementationHours * rate;
    const implementationPrice = baseImplementationCost * (1 + implementationMargin / 100);
    
    const baseMaintenanceCost = maintenanceHours * rate;
    const maintenancePrice = baseMaintenanceCost * (1 + maintenanceMargin / 100);
    
    const revenueShare = revenue * revenueSharePercent;

    return {
      implementationPrice: implementationPrice.toFixed(2),
      maintenancePrice: maintenancePrice.toFixed(2),
      revenueShare: revenueShare.toFixed(2),
      baseImplementationCost: baseImplementationCost.toFixed(2),
      baseMaintenanceCost: baseMaintenanceCost.toFixed(2),
    };
  };

  const prices = calculatePrices();

  const handlePlanChange = (plan: Plan) => {
    setSelectedPlan(plan);
    setCustomImplementationHours(plan.implementationHours.toString());
    setCustomMaintenanceHours(plan.maintenanceHours.toString());
    setCustomRevenueShare(plan.revenueSharePercentage * 100);
  };

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
            Ajuste os parâmetros para simular diferentes cenários de precificação
          </SheetDescription>
        </SheetHeader>
        
        <div className="mt-8 space-y-6">
          <div className="space-y-2">
            <Label>Plano Base</Label>
            <div className="grid grid-cols-3 gap-2">
              {defaultPlans.map((plan) => (
                <Button
                  key={plan.name}
                  variant={selectedPlan.name === plan.name ? "default" : "outline"}
                  onClick={() => handlePlanChange(plan)}
                >
                  {plan.name}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Valor Hora (R$)</Label>
              <Input
                type="number"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(e.target.value)}
                min="0"
                step="10"
              />
            </div>

            <div className="space-y-2">
              <Label>Horas de Implementação</Label>
              <Input
                type="number"
                value={customImplementationHours}
                onChange={(e) => setCustomImplementationHours(e.target.value)}
                min="0"
                step="1"
              />
            </div>

            <div className="space-y-2">
              <Label>Horas de Manutenção Mensal</Label>
              <Input
                type="number"
                value={customMaintenanceHours}
                onChange={(e) => setCustomMaintenanceHours(e.target.value)}
                min="0"
                step="1"
              />
            </div>

            <div className="space-y-2">
              <Label>Margem de Implementação ({implementationMargin}%)</Label>
              <Slider
                value={[implementationMargin]}
                onValueChange={(value) => setImplementationMargin(value[0])}
                min={0}
                max={100}
                step={1}
              />
            </div>

            <div className="space-y-2">
              <Label>Margem de Manutenção ({maintenanceMargin}%)</Label>
              <Slider
                value={[maintenanceMargin]}
                onValueChange={(value) => setMaintenanceMargin(value[0])}
                min={0}
                max={100}
                step={1}
              />
            </div>

            <div className="space-y-2">
              <Label>Taxa sobre Receita ({customRevenueShare.toFixed(1)}%)</Label>
              <Slider
                value={[customRevenueShare]}
                onValueChange={(value) => setCustomRevenueShare(value[0])}
                min={0}
                max={5}
                step={0.1}
              />
            </div>

            <div className="space-y-2">
              <Label>Faturamento Mensal Estimado (R$)</Label>
              <Input
                type="number"
                value={monthlyRevenue}
                onChange={(e) => setMonthlyRevenue(e.target.value)}
                min="0"
                step="1000"
              />
            </div>
          </div>

          <div className="rounded-lg border p-4 space-y-4">
            <div>
              <div className="text-sm text-muted-foreground">Custo Base de Implementação</div>
              <div className="text-lg font-medium">R$ {prices.baseImplementationCost}</div>
              <div className="text-sm text-muted-foreground mt-2">Preço Final de Implementação (único)</div>
              <div className="text-2xl font-bold">R$ {prices.implementationPrice}</div>
            </div>
            
            <div>
              <div className="text-sm text-muted-foreground">Custo Base de Manutenção</div>
              <div className="text-lg font-medium">R$ {prices.baseMaintenanceCost}</div>
              <div className="text-sm text-muted-foreground mt-2">Preço Final de Manutenção Mensal</div>
              <div className="text-2xl font-bold">R$ {prices.maintenancePrice}</div>
            </div>
            
            <div>
              <div className="text-sm text-muted-foreground">
                Taxa sobre Receita ({customRevenueShare.toFixed(1)}%)
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