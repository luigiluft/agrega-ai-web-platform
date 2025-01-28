import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { useToast } from "../ui/use-toast";
import { Task } from "@/types/calculator-types";
import PlanStep from "./steps/PlanStep";
import ThemeStep from "./steps/ThemeStep";
import TasksStep from "./steps/TasksStep";
import SummaryStep from "./steps/SummaryStep";
import { Theme } from "@/components/theme/types";
import { ecommerceExtensions } from "@/data/ecommerceExtensions";
import { calculatorTasks } from "@/data/calculatorTasks";
import { ecommerceTasks } from "@/data/ecommerceTasks";
import { Step } from "@/types/calculator-steps";
import { Plan } from "./PlanSelector";

const StepCalculator = () => {
  const [currentStep, setCurrentStep] = useState<Step>("plan");
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
  const [selectedTasks, setSelectedTasks] = useState<Task[]>([]);
  const [selectedExtensions, setSelectedExtensions] = useState<Set<string>>(new Set());
  const [monthlyRevenue, setMonthlyRevenue] = useState<string>("50000");
  const [averageTicket, setAverageTicket] = useState<string>("150");
  const [monthlyOrders, setMonthlyOrders] = useState<string>("100");
  const { toast } = useToast();

  const shouldShowStep = (step: Step): boolean => {
    if (step === "theme") {
      return selectedPlan?.id === "express";
    }
    return true;
  };

  const steps: Array<{ step: Step; label: string }> = [
    { step: "plan" as Step, label: "Escolha seu plano" },
    { step: "theme" as Step, label: "Selecione o tema" },
    { step: "tasks" as Step, label: "Configure seu projeto" },
    { step: "summary" as Step, label: "Resumo do projeto" }
  ].filter(({ step }) => shouldShowStep(step));

  const calculatePrice = () => {
    const HOUR_RATE = 200;
    const totalHours = selectedTasks.reduce((acc, task) => acc + task.hours, 0);
    const basePrice = totalHours * HOUR_RATE;
    const extensionsPrice = Array.from(selectedExtensions).reduce((acc, extensionId) => {
      const extension = ecommerceExtensions.find(ext => ext.id === extensionId);
      return acc + (extension?.price || 0);
    }, 0);
    return basePrice + extensionsPrice;
  };

  const handlePlanSelect = (plan: Plan) => {
    setSelectedPlan(plan);
    
    const allTasks = [
      ...calculatorTasks.flatMap(category => category.tasks),
      ...ecommerceTasks.flatMap(category => category.tasks)
    ];

    let preSelectedTasks: Task[] = [];
    
    if (plan.id === 'express') {
      preSelectedTasks = allTasks.filter(task => 
        (task.story === "Briefing" && task.hours <= 4) ||
        (task.story === "Implementação do layout" && task.hours <= 8) ||
        (task.name.includes("Base") && task.hours <= 4) ||
        (task.type === "recurring" && task.hours <= 4)
      );
    } else if (plan.id === 'standard') {
      preSelectedTasks = allTasks.filter(task => 
        (task.story === "Briefing" && task.hours <= 8) ||
        (task.story === "Implementação do layout" && task.hours <= 16) ||
        (task.story === "Elaboração dos criativos" && task.hours <= 16) ||
        (task.name.includes("Avançad") && task.hours <= 8) ||
        (task.type === "recurring" && task.hours <= 6)
      );
    } else {
      preSelectedTasks = allTasks.filter(task => 
        task.type === "essential" ||
        (task.type === "optional" && task.hours <= 32) ||
        (task.type === "recurring" && task.hours <= 12)
      );
    }

    setSelectedTasks(preSelectedTasks);
  };

  const handleNext = () => {
    if (currentStep === "plan" && !selectedPlan) {
      toast({
        title: "Selecione um plano",
        description: "Por favor, selecione um plano para continuar.",
        variant: "destructive",
      });
      return;
    }

    if (currentStep === "theme" && selectedPlan?.id === "express" && !selectedTheme) {
      toast({
        title: "Selecione um tema",
        description: "Por favor, selecione um tema para continuar.",
        variant: "destructive",
      });
      return;
    }

    if (currentStep === "plan") {
      if (selectedPlan?.id === "express") {
        setCurrentStep("theme");
      } else {
        setCurrentStep("tasks");
      }
    } else if (currentStep === "theme") {
      setCurrentStep("tasks");
    } else if (currentStep === "tasks") {
      setCurrentStep("summary");
    }
  };

  const renderStepContent = () => {
    const totalPrice = calculatePrice();

    switch (currentStep) {
      case "plan":
        return <PlanStep selectedPlan={selectedPlan} onPlanSelect={handlePlanSelect} />;
      case "theme":
        return selectedPlan?.id === "express" && (
          <ThemeStep selectedTheme={selectedTheme} setSelectedTheme={setSelectedTheme} />
        );
      case "tasks":
        return selectedPlan && (
          <TasksStep 
            selectedPlan={selectedPlan}
            selectedTasks={selectedTasks}
            onTasksChange={setSelectedTasks}
            selectedExtensions={selectedExtensions}
            onExtensionToggle={(extensionId, checked) => {
              const newExtensions = new Set(selectedExtensions);
              if (checked) {
                newExtensions.add(extensionId);
              } else {
                newExtensions.delete(extensionId);
              }
              setSelectedExtensions(newExtensions);
            }}
            totalPrice={totalPrice}
            monthlyRevenue={monthlyRevenue}
            setMonthlyRevenue={setMonthlyRevenue}
            averageTicket={averageTicket}
            setAverageTicket={setAverageTicket}
            monthlyOrders={monthlyOrders}
            setMonthlyOrders={setMonthlyOrders}
          />
        );
      case "summary":
        return (
          <SummaryStep 
            selectedTasks={selectedTasks}
            selectedExtensions={selectedExtensions}
            totalPrice={totalPrice}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 to-orange-600 p-6">
      <Card className="max-w-5xl mx-auto p-8 shadow-xl">
        <div className="flex justify-between items-center mb-12 relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -z-10" />
          {steps.map(({ step, label }, index) => (
            <div key={step} className="flex flex-col items-center gap-2 bg-white p-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-semibold transition-colors duration-300
                  ${currentStep === step
                    ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white"
                    : "bg-gray-100 text-gray-600"
                  }`}
              >
                {index + 1}
              </div>
              <span className="text-sm font-medium text-gray-600">
                {label}
              </span>
            </div>
          ))}
        </div>

        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="min-h-[400px]"
        >
          {renderStepContent()}
        </motion.div>

        {currentStep !== "summary" && (
          <div className="flex justify-end mt-8">
            <Button
              onClick={handleNext}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-2 rounded-full flex items-center gap-2 transition-all duration-300 transform hover:scale-105"
            >
              Próximo
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default StepCalculator;