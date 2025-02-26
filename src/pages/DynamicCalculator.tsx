
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
    <div className="min-h-screen bg-gradient-to-tr from-orange-600 via-orange-500 to-orange-400">
      <NavigationMenuDemo />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center space-y-6">
            <h1 className="text-5xl font-bold text-white drop-shadow-lg">
              Calculadora de Preços
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Configure seu projeto e receba um orçamento personalizado para sua loja virtual
            </p>
          </div>

          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">
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
    </div>
  );
};

export default DynamicCalculator;
