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
  layoutHours: number;
  maintenanceHours: number;
  meetingHours: number;
  campaignHours: number;
  revenueSharePercentage: number;
};

const defaultPlans: Plan[] = [
  {
    name: "Starter",
    layoutHours: 40,
    maintenanceHours: 10,
    meetingHours: 5,
    campaignHours: 10,
    revenueSharePercentage: 0.15,
  },
  {
    name: "Pro",
    layoutHours: 80,
    maintenanceHours: 15,
    meetingHours: 10,
    campaignHours: 20,
    revenueSharePercentage: 0.12,
  },
  {
    name: "Custom",
    layoutHours: 120,
    maintenanceHours: 30,
    meetingHours: 15,
    campaignHours: 30,
    revenueSharePercentage: 0.08,
  },
];

const calculateRevenueShare = (revenue: number) => {
  if (revenue <= 50000) return 0.15; // 15% até 50k
  if (revenue <= 100000) return 0.12; // 12% até 100k
  if (revenue <= 200000) return 0.10; // 10% até 200k
  return 0.08; // 8% acima de 200k
};

const PriceCalculator = ({ fullPage = false }: { fullPage?: boolean }) => {
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState<Plan>(defaultPlans[0]);
  const [monthlyRevenue, setMonthlyRevenue] = useState<string>("50000");
  const [hourlyRate, setHourlyRate] = useState<string>("100");
  const [implementationMargin, setImplementationMargin] = useState<number>(10);
  const [maintenanceMargin, setMaintenanceMargin] = useState<number>(30);
  const [customLayoutHours, setCustomLayoutHours] = useState<string>(defaultPlans[0].layoutHours.toString());
  const [customMaintenanceHours, setCustomMaintenanceHours] = useState<string>(defaultPlans[0].maintenanceHours.toString());
  const [customMeetingHours, setCustomMeetingHours] = useState<string>(defaultPlans[0].meetingHours.toString());
  const [customCampaignHours, setCustomCampaignHours] = useState<string>(defaultPlans[0].campaignHours.toString());

  const calculatePrices = () => {
    const revenue = parseFloat(monthlyRevenue) || 0;
    const rate = parseFloat(hourlyRate) || 100;
    
    const layoutHours = parseFloat(customLayoutHours) || selectedPlan.layoutHours;
    const maintenanceHours = parseFloat(customMaintenanceHours) || selectedPlan.maintenanceHours;
    const meetingHours = parseFloat(customMeetingHours) || selectedPlan.meetingHours;
    const campaignHours = parseFloat(customCampaignHours) || selectedPlan.campaignHours;
    
    const totalImplementationHours = layoutHours + meetingHours;
    const totalMaintenanceHours = maintenanceHours + campaignHours;
    
    const baseImplementationCost = totalImplementationHours * rate;
    const implementationPrice = baseImplementationCost * (1 + implementationMargin / 100);
    
    const baseMaintenanceCost = totalMaintenanceHours * rate;
    const maintenancePrice = baseMaintenanceCost * (1 + maintenanceMargin / 100);
    
    const revenueSharePercent = calculateRevenueShare(revenue);
    const revenueShare = revenue * revenueSharePercent;

    return {
      implementationPrice: implementationPrice.toFixed(2),
      maintenancePrice: maintenancePrice.toFixed(2),
      revenueShare: revenueShare.toFixed(2),
      baseImplementationCost: baseImplementationCost.toFixed(2),
      baseMaintenanceCost: baseMaintenanceCost.toFixed(2),
      revenueSharePercent: (revenueSharePercent * 100).toFixed(1),
    };
  };

  const prices = calculatePrices();

  const handlePlanChange = (plan: Plan) => {
    setSelectedPlan(plan);
    setCustomLayoutHours(plan.layoutHours.toString());
    setCustomMaintenanceHours(plan.maintenanceHours.toString());
    setCustomMeetingHours(plan.meetingHours.toString());
    setCustomCampaignHours(plan.campaignHours.toString());
  };

  const handleContactClick = () => {
    toast({
      title: "Orçamento solicitado",
      description: "Em breve nossa equipe entrará em contato com você.",
    });
  };

  const calculatorContent = (
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
          <Label>Horas para Personalização de Layout</Label>
          <Input
            type="number"
            value={customLayoutHours}
            onChange={(e) => setCustomLayoutHours(e.target.value)}
            min="0"
            step="1"
          />
        </div>

        <div className="space-y-2">
          <Label>Horas para Manutenção Mensal</Label>
          <Input
            type="number"
            value={customMaintenanceHours}
            onChange={(e) => setCustomMaintenanceHours(e.target.value)}
            min="0"
            step="1"
          />
        </div>

        <div className="space-y-2">
          <Label>Horas para Reuniões de Alinhamento</Label>
          <Input
            type="number"
            value={customMeetingHours}
            onChange={(e) => setCustomMeetingHours(e.target.value)}
            min="0"
            step="1"
          />
        </div>

        <div className="space-y-2">
          <Label>Horas para Implementação de Campanhas</Label>
          <Input
            type="number"
            value={customCampaignHours}
            onChange={(e) => setCustomCampaignHours(e.target.value)}
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
            Taxa sobre Receita ({prices.revenueSharePercent}%)
          </div>
          <div className="text-2xl font-bold">R$ {prices.revenueShare}/mês</div>
        </div>
      </div>

      <Button className="w-full" onClick={handleContactClick}>
        Solicitar Orçamento
      </Button>
    </div>
  );

  if (fullPage) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        {calculatorContent}
      </div>
    );
  }

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
        {calculatorContent}
      </SheetContent>
    </Sheet>
  );
};

export default PriceCalculator;