import { useState, useEffect } from "react";
import { Calculator, Mail, PhoneCall } from "lucide-react";
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
import { Task } from "@/types/calculator-types";
import TaskCategorySection from "./calculator/TaskCategorySection";
import ConsoleOutput from "./calculator/ConsoleOutput";

const calculateRevenueShare = (revenue: number): number => {
  if (revenue <= 50000) {
    return 0.15;
  } else if (revenue <= 100000) {
    return 0.12;
  } else if (revenue <= 200000) {
    return 0.10;
  } else {
    return 0.08;
  }
};

const PriceCalculator = ({ fullPage = false }: { fullPage?: boolean }) => {
  const { toast } = useToast();
  const [selectedTasks, setSelectedTasks] = useState<Task[]>([]);
  const [selectedExtensions, setSelectedExtensions] = useState<Set<string>>(new Set());
  const [monthlyRevenue, setMonthlyRevenue] = useState<string>("50000");

  const handleExtensionToggle = (extensionId: string, checked: boolean) => {
    const newSelectedExtensions = new Set(selectedExtensions);
    if (checked) {
      newSelectedExtensions.add(extensionId);
    } else {
      newSelectedExtensions.delete(extensionId);
    }
    setSelectedExtensions(newSelectedExtensions);
  };

  const calculatePrices = () => {
    const implementationTasks = selectedTasks.filter(task => 
      task.type === 'essential' || task.type === 'optional'
    );
    
    const maintenanceTasks = selectedTasks.filter(task => 
      task.type === 'recurring'
    );

    const implementationHours = implementationTasks.reduce(
      (total, task) => total + task.hours, 
      0
    );

    const maintenanceHours = maintenanceTasks.reduce(
      (total, task) => total + task.hours, 
      0
    );

    const rate = 100;
    const maintenanceRate = 130;
    
    const implementationPrice = implementationHours * rate;
    const maintenancePrice = maintenanceHours * maintenanceRate;
    
    const revenue = parseFloat(monthlyRevenue) || 0;
    const revenueSharePercent = calculateRevenueShare(revenue);
    const revenueShare = revenue * revenueSharePercent;

    return {
      implementationPrice: implementationPrice.toFixed(2),
      maintenancePrice: maintenancePrice.toFixed(2),
      revenueShare: revenueShare.toFixed(2),
      revenueSharePercent: (revenueSharePercent * 100).toFixed(1),
      implementationTasks,
      maintenanceTasks,
      totalHours: implementationHours + maintenanceHours
    };
  };

  const prices = calculatePrices();

  const handleContactClick = () => {
    toast({
      title: "Orçamento solicitado",
      description: "Em breve nossa equipe entrará em contato com você.",
    });
  };

  const calculatorContent = (
    <div className="mt-8 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <TaskCategorySection
          onTasksChange={setSelectedTasks}
          selectedExtensions={selectedExtensions}
          onExtensionToggle={handleExtensionToggle}
        />
        
        <div className="space-y-6">
          <ConsoleOutput
            implementationTasks={prices.implementationTasks}
            maintenanceTasks={prices.maintenanceTasks}
            implementationPrice={prices.implementationPrice}
            maintenancePrice={prices.maintenancePrice}
            revenueShare={prices.revenueShare}
            revenueSharePercent={prices.revenueSharePercent}
            totalHours={prices.totalHours}
          />

          <div className="grid grid-cols-2 gap-4">
            <Button 
              variant="outline"
              className="w-full space-x-2"
              onClick={handleContactClick}
            >
              <Mail className="w-4 h-4" />
              <span>Receber por Email</span>
            </Button>
            
            <Button 
              variant="default"
              className="w-full space-x-2"
              onClick={handleContactClick}
            >
              <PhoneCall className="w-4 h-4" />
              <span>Falar com Consultor</span>
            </Button>
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
      <SheetContent className="w-[400px] sm:w-[540px] lg:w-[900px] overflow-y-auto">
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