import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "../ui/card";
import { useToast } from "../ui/use-toast";
import { Task } from "@/types/calculator-types";
import PlanStep from "./steps/PlanStep";
import ThemeStep from "./steps/ThemeStep";
import TasksStep from "./steps/TasksStep";
import SummaryStep from "./steps/SummaryStep";
import ContractStep from "./ContractStep";
import { Theme } from "@/components/theme/types";
import { ecommerceExtensions } from "@/data/ecommerceExtensions";
import { calculatorTasks } from "@/data/calculatorTasks";
import { ecommerceTasks } from "@/data/ecommerceTasks";
import { Step } from "@/types/calculator-steps";
import { Plan } from "./PlanSelector";
import StepProgress from "./StepProgress";
import StepNavigation from "./StepNavigation";
import { useSearchParams } from "react-router-dom";
import { scrollToTop } from "@/utils/scrollUtils";

const steps = [
  { step: "plan" as Step, label: "Plano" },
  { step: "theme" as Step, label: "Tema" },
  { step: "tasks" as Step, label: "Tarefas" },
  { step: "summary" as Step, label: "Resumo" },
  { step: "contract" as Step, label: "Contrato" }
];

const StepCalculator = () => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<Step>("plan");
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
  const [selectedTasks, setSelectedTasks] = useState<Task[]>([]);
  const [selectedExtensions, setSelectedExtensions] = useState<Set<string>>(new Set());
  const [monthlyRevenue, setMonthlyRevenue] = useState<string>("50000");
  const [averageTicket, setAverageTicket] = useState<string>("150");
  const [monthlyOrders, setMonthlyOrders] = useState<string>("100");
  const [paymentPlan, setPaymentPlan] = useState<Plan | null>(null);

  useEffect(() => {
    const planId = searchParams.get('plan');
    if (planId) {
      const plan = { id: planId } as Plan;
      handlePlanSelect(plan);
    }
  }, [searchParams]);

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

    if (currentStep === "summary" && !paymentPlan) {
      toast({
        title: "Selecione uma opção de pagamento",
        description: "Por favor, selecione entre o plano mensal ou anual para continuar.",
        variant: "destructive",
      });
      return;
    }

    let nextStep: Step;
    if (currentStep === "plan") {
      nextStep = selectedPlan?.id === "express" ? "theme" : "tasks";
    } else if (currentStep === "theme") {
      nextStep = "tasks";
    } else if (currentStep === "tasks") {
      nextStep = "summary";
    } else if (currentStep === "summary") {
      nextStep = "contract";
    } else {
      return;
    }

    setCurrentStep(nextStep);
    scrollToTop();
  };

  const handlePrevious = () => {
    let previousStep: Step;
    if (currentStep === "tasks") {
      previousStep = selectedPlan?.id === "express" ? "theme" : "plan";
    } else if (currentStep === "theme") {
      previousStep = "plan";
    } else if (currentStep === "summary") {
      previousStep = "tasks";
    } else if (currentStep === "contract") {
      previousStep = "summary";
    } else {
      return;
    }

    setCurrentStep(previousStep);
    scrollToTop();
  };

  const renderStepContent = () => {
    const totalPrice = calculatePrice();
    const implementationPrice = totalPrice;
    const maintenancePrice = selectedTasks
      .filter(task => task.type === "recurring")
      .reduce((acc, task) => acc + (task.hours * 200), 0);
    const revenue = parseFloat(monthlyRevenue) || 0;
    const revenueSharePercent = revenue <= 100000 ? 15 : revenue <= 500000 ? 12 : revenue <= 1000000 ? 10 : 5;
    const revenueShare = (revenue * revenueSharePercent) / 100;

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
            monthlyRevenue={monthlyRevenue}
            onPlanSelect={setPaymentPlan}
            selectedPlan={paymentPlan}
          />
        );
      case "contract":
        return paymentPlan && (
          <ContractStep
            selectedPlan={paymentPlan}
            selectedTasks={selectedTasks}
            implementationPrice={implementationPrice}
            maintenancePrice={maintenancePrice}
            revenueShare={revenueShare}
            revenueSharePercent={revenueSharePercent}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 to-orange-600 p-6">
      <Card className="max-w-5xl mx-auto p-8 shadow-xl">
        <StepProgress currentStep={currentStep} steps={steps} />

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

        <StepNavigation 
          currentStep={currentStep} 
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      </Card>
    </div>
  );
};

export default StepCalculator;
