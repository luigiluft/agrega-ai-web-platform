import { useState } from "react";
import NavigationMenuDemo from "@/components/NavigationMenu";
import { useToast } from "@/components/ui/use-toast";
import { Task } from "@/types/calculator-types";
import CalculatorHeader from "@/components/calculator/CalculatorHeader";
import CalculatorResults from "@/components/calculator/CalculatorResults";
import DeveloperAnimation from "@/components/calculator/DeveloperAnimation";
import TaskSelector from "@/components/calculator/TaskSelector";

const DynamicCalculator = () => {
  const { toast } = useToast();
  const [selectedTasks, setSelectedTasks] = useState<Task[]>([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState<string>("50000");

  const calculatePrices = () => {
    const implementationHours = selectedTasks
      .filter(task => task.type !== 'recurring')
      .reduce((total, task) => total + task.hours, 0);

    const monthlyHours = selectedTasks
      .filter(task => task.type === 'recurring')
      .reduce((total, task) => total + task.hours, 0);

    const rate = 150;
    const monthlyRate = 200;

    const implementationPrice = implementationHours * rate;
    const maintenancePrice = monthlyHours * monthlyRate;
    
    const revenue = parseFloat(monthlyRevenue) || 0;
    const revenueSharePercent = revenue <= 50000 ? 15 
      : revenue <= 100000 ? 12 
      : revenue <= 200000 ? 10 
      : 8;
    const revenueShare = (revenue * revenueSharePercent) / 100;

    return {
      implementationPrice: implementationPrice.toFixed(2),
      maintenancePrice: maintenancePrice.toFixed(2),
      revenueShare: revenueShare.toFixed(2),
      revenueSharePercent: revenueSharePercent.toString(),
      baseImplementationCost: (implementationHours * rate).toFixed(2),
      baseMaintenanceCost: (monthlyHours * monthlyRate).toFixed(2),
      totalHours: implementationHours + monthlyHours,
      totalImplementationHours: implementationHours,
    };
  };

  const handleContactClick = () => {
    toast({
      title: "Orçamento solicitado",
      description: "Em breve nossa equipe entrará em contato com você.",
    });
  };

  const prices = calculatePrices();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <NavigationMenuDemo />
      
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <CalculatorHeader />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          <div className="space-y-6 order-2 lg:order-1">
            <TaskSelector onTasksChange={setSelectedTasks} />
          </div>

          <div className="lg:sticky lg:top-4 h-fit order-1 lg:order-2">
            <div className="space-y-6">
              <DeveloperAnimation 
                totalHours={prices.totalHours || 0}
                layoutHours={selectedTasks
                  .filter(t => t.story === "Elaboração dos criativos")
                  .reduce((sum, t) => sum + t.hours, 0)}
                maintenanceHours={selectedTasks
                  .filter(t => t.type === "recurring")
                  .reduce((sum, t) => sum + t.hours, 0)}
                meetingHours={selectedTasks
                  .filter(t => t.story === "Briefing")
                  .reduce((sum, t) => sum + t.hours, 0)}
                campaignHours={0}
                functionalityHours={selectedTasks
                  .filter(t => t.story === "Implementação do layout")
                  .reduce((sum, t) => sum + t.hours, 0)}
                selectedPlanName="Plano Personalizado"
              />

              <CalculatorResults 
                {...prices}
                monthlyRevenue={monthlyRevenue}
                setMonthlyRevenue={setMonthlyRevenue}
                onContactClick={handleContactClick}
                layoutHours={0}
                maintenanceHours={0}
                meetingHours={0}
                campaignHours={0}
                functionalityHours={0}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicCalculator;