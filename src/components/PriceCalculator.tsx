
import { useState } from "react";
import { motion } from "framer-motion";
import { Task } from "@/types/calculator-types";
import { Plan } from "@/types/calculator-types";
import StepCalculator from "./calculator/StepCalculator";
import { Step } from "@/types/calculator-steps";
import ConsoleOutput from "./calculator/ConsoleOutput";
import { calculatePrices } from "./calculator/pricing/PricingLogic";
import { ecommerceExtensions } from "@/data/ecommerceExtensions";
import PlanContent from "./calculator/PlanContent";
import { useToast } from "./ui/use-toast";
import type { PricingResult } from "./calculator/pricing/PricingLogic";

const PriceCalculator = () => {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [selectedTasks, setSelectedTasks] = useState<Task[]>([]);
  const [selectedExtensions] = useState<Set<string>>(new Set());
  const [currentStep, setCurrentStep] = useState<Step>("plan");
  const [monthlyRevenue, setMonthlyRevenue] = useState("");
  const [averageTicket, setAverageTicket] = useState("");
  const [monthlyOrders, setMonthlyOrders] = useState("");
  const { toast } = useToast();

  const handleTasksChange = (tasks: Task[]) => {
    setSelectedTasks(tasks);
  };

  const handlePlanSelect = (plan: Plan) => {
    setSelectedPlan(plan);
    toast({
      title: "Plano selecionado",
      description: `Você selecionou o plano ${plan.name}`,
    });
  };

  const handleExtensionToggle = (extensionId: string, checked: boolean) => {
    const extension = ecommerceExtensions.find((ext) => ext.id === extensionId);
    if (!extension) return;

    const message = checked
      ? `${extension.name} adicionado ao seu projeto`
      : `${extension.name} removido do seu projeto`;

    toast({
      title: checked ? "Recurso adicionado" : "Recurso removido",
      description: message,
    });
  };

  const prices = calculatePrices(selectedTasks, selectedPlan, monthlyRevenue);

  const renderCurrentStep = () => {
    if (!selectedPlan) return null;

    return (
      <PlanContent
        selectedPlan={selectedPlan}
        selectedTasks={selectedTasks}
        selectedExtensions={selectedExtensions}
        onTasksChange={handleTasksChange}
        onExtensionToggle={handleExtensionToggle}
        prices={prices}
        monthlyRevenue={monthlyRevenue}
        setMonthlyRevenue={setMonthlyRevenue}
        averageTicket={averageTicket}
        setAverageTicket={setAverageTicket}
        monthlyOrders={monthlyOrders}
        setMonthlyOrders={setMonthlyOrders}
        onContactClick={() => setCurrentStep("contract")}
      />
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <StepCalculator
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            selectedPlan={selectedPlan}
            onPlanSelect={handlePlanSelect}
            selectedTasks={selectedTasks}
            onTasksChange={handleTasksChange}
            selectedExtensions={selectedExtensions}
            onExtensionToggle={handleExtensionToggle}
            monthlyRevenue={monthlyRevenue}
            setMonthlyRevenue={setMonthlyRevenue}
            averageTicket={averageTicket}
            setAverageTicket={setAverageTicket}
            monthlyOrders={monthlyOrders}
            setMonthlyOrders={setMonthlyOrders}
          />

          {selectedPlan && currentStep === "tasks" && (
            <div className="mt-8">
              <ConsoleOutput
                implementationTasks={prices.implementationTasks}
                maintenanceTasks={prices.maintenanceTasks}
                implementationPrice={prices.implementationPrice}
                maintenancePrice={prices.maintenancePrice}
                revenueShare={prices.revenueShare}
                revenueSharePercent={prices.revenueSharePercent}
                totalHours={prices.totalHours}
                selectedPlan={selectedPlan}
              />
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default PriceCalculator;
