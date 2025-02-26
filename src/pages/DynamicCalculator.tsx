
import { useState } from "react";
import NavigationMenuDemo from "@/components/NavigationMenu";
import StepCalculator from "@/components/calculator/StepCalculator";
import { Step } from "@/types/calculator-steps";
import { Plan, Task } from "@/types/calculator-types";

const DynamicCalculator = () => {
  const [currentStep, setCurrentStep] = useState<Step>("plan");
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [selectedTasks, setSelectedTasks] = useState<Task[]>([]);
  const [selectedExtensions, setSelectedExtensions] = useState<Set<string>>(new Set());
  const [monthlyRevenue, setMonthlyRevenue] = useState("");
  const [averageTicket, setAverageTicket] = useState("");
  const [monthlyOrders, setMonthlyOrders] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary to-primary-light">
      <NavigationMenuDemo />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-white">
              Calculadora de Preços
            </h1>
            <p className="text-lg text-white/90">
              Configure seu projeto e receba um orçamento personalizado
            </p>
          </div>

          <StepCalculator 
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            selectedPlan={selectedPlan}
            onPlanSelect={setSelectedPlan}
            selectedTasks={selectedTasks}
            onTasksChange={setSelectedTasks}
            selectedExtensions={selectedExtensions}
            onExtensionToggle={(extensionId: string, checked: boolean) => {
              const newExtensions = new Set(selectedExtensions);
              if (checked) {
                newExtensions.add(extensionId);
              } else {
                newExtensions.delete(extensionId);
              }
              setSelectedExtensions(newExtensions);
            }}
            monthlyRevenue={monthlyRevenue}
            setMonthlyRevenue={setMonthlyRevenue}
            averageTicket={averageTicket}
            setAverageTicket={setAverageTicket}
            monthlyOrders={monthlyOrders}
            setMonthlyOrders={setMonthlyOrders}
          />
        </div>
      </div>
    </div>
  );
};

export default DynamicCalculator;
