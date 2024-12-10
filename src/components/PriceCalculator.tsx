import { useState } from "react";
import { Calculator } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import CalculatorInputs from "./calculator/CalculatorInputs";
import CalculatorResults from "./calculator/CalculatorResults";

type Plan = {
  name: string;
  layoutHours: number;
  maintenanceHours: number;
  meetingHours: number;
  campaignHours: number;
  functionalityHours: number;
  revenueSharePercentage: number;
};

const defaultPlans: Plan[] = [
  {
    name: "Starter",
    layoutHours: 5,
    maintenanceHours: 10,
    meetingHours: 5,
    campaignHours: 10,
    functionalityHours: 20,
    revenueSharePercentage: 0.15,
  },
  {
    name: "Pro",
    layoutHours: 80,
    maintenanceHours: 15,
    meetingHours: 10,
    campaignHours: 20,
    functionalityHours: 40,
    revenueSharePercentage: 0.12,
  },
  {
    name: "Custom",
    layoutHours: 120,
    maintenanceHours: 30,
    meetingHours: 15,
    campaignHours: 30,
    functionalityHours: 60,
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
  const [customLayoutHours, setCustomLayoutHours] = useState<string>(defaultPlans[0].layoutHours.toString());
  const [customMaintenanceHours, setCustomMaintenanceHours] = useState<string>(defaultPlans[0].maintenanceHours.toString());
  const [customMeetingHours, setCustomMeetingHours] = useState<string>(defaultPlans[0].meetingHours.toString());
  const [customCampaignHours, setCustomCampaignHours] = useState<string>(defaultPlans[0].campaignHours.toString());
  const [customFunctionalityHours, setCustomFunctionalityHours] = useState<string>(defaultPlans[0].functionalityHours.toString());

  const calculatePrices = () => {
    const revenue = parseFloat(monthlyRevenue) || 0;
    const rate = parseFloat(hourlyRate) || 100;
    
    const layoutHours = parseFloat(customLayoutHours) || selectedPlan.layoutHours;
    const maintenanceHours = parseFloat(customMaintenanceHours) || selectedPlan.maintenanceHours;
    const meetingHours = parseFloat(customMeetingHours) || selectedPlan.meetingHours;
    const campaignHours = parseFloat(customCampaignHours) || selectedPlan.campaignHours;
    const functionalityHours = parseFloat(customFunctionalityHours) || selectedPlan.functionalityHours;
    
    const totalImplementationHours = layoutHours + meetingHours + functionalityHours;
    const totalMaintenanceHours = maintenanceHours + campaignHours;
    
    const baseImplementationCost = totalImplementationHours * rate;
    const implementationPrice = baseImplementationCost * 1.1; // Fixed 10% margin
    
    const baseMaintenanceCost = totalMaintenanceHours * rate;
    const maintenancePrice = baseMaintenanceCost * 1.3; // Fixed 30% margin
    
    const revenueSharePercent = calculateRevenueShare(revenue);
    const revenueShare = revenue * revenueSharePercent;

    // Calculate discount based on total hours
    const totalHours = totalImplementationHours + totalMaintenanceHours;
    const discountAmount = Math.floor(totalHours / 50) * 50;
    
    if (discountAmount > 0) {
      toast({
        title: "Desconto Aplicado!",
        description: `Você ganhou R$${discountAmount} de desconto na implementação por contratar ${totalHours} horas!`,
      });
    }

    return {
      implementationPrice: (implementationPrice - discountAmount).toFixed(2),
      maintenancePrice: maintenancePrice.toFixed(2),
      revenueShare: revenueShare.toFixed(2),
      baseImplementationCost: baseImplementationCost.toFixed(2),
      baseMaintenanceCost: baseMaintenanceCost.toFixed(2),
      revenueSharePercent: (revenueSharePercent * 100).toFixed(1),
      totalHours,
    };
  };

  const prices = calculatePrices();

  const handlePlanChange = (plan: Plan) => {
    setSelectedPlan(plan);
    setCustomLayoutHours(plan.layoutHours.toString());
    setCustomMaintenanceHours(plan.maintenanceHours.toString());
    setCustomMeetingHours(plan.meetingHours.toString());
    setCustomCampaignHours(plan.campaignHours.toString());
    setCustomFunctionalityHours(plan.functionalityHours.toString());
  };

  const handleContactClick = () => {
    toast({
      title: "Orçamento solicitado",
      description: "Em breve nossa equipe entrará em contato com você.",
    });
  };

  const calculatorContent = (
    <div className="mt-8 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <CalculatorInputs
            hourlyRate={hourlyRate}
            setHourlyRate={setHourlyRate}
            customLayoutHours={customLayoutHours}
            setCustomLayoutHours={setCustomLayoutHours}
            customMaintenanceHours={customMaintenanceHours}
            setCustomMaintenanceHours={setCustomMaintenanceHours}
            customMeetingHours={customMeetingHours}
            setCustomMeetingHours={setCustomMeetingHours}
            customCampaignHours={customCampaignHours}
            setCustomCampaignHours={setCustomCampaignHours}
            customFunctionalityHours={customFunctionalityHours}
            setCustomFunctionalityHours={setCustomFunctionalityHours}
            monthlyRevenue={monthlyRevenue}
            setMonthlyRevenue={setMonthlyRevenue}
            selectedPlan={selectedPlan}
            defaultPlans={defaultPlans}
            onPlanChange={handlePlanChange}
          />
        </div>
        <div className="relative">
          <div className="sticky top-4">
            <div className="rounded-lg overflow-hidden shadow-xl bg-white">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
              </div>
              <div className="p-4">
                <img
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
                  alt="Developer coding"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <div className="space-y-4">
                  {prices.totalHours >= 50 && (
                    <div className="relative">
                      <img
                        src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"
                        alt="New features"
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
                        <span className="text-white font-medium">
                          + Novas funcionalidades desbloqueadas
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <CalculatorResults prices={prices} onContactClick={handleContactClick} />
          </div>
        </div>
      </div>
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