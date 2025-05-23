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
import PlatformStep, { PlatformType } from "./steps/PlatformStep";
import { Theme } from "@/components/theme/types";
import { ecommerceExtensions } from "@/data/ecommerceExtensions";
import { calculatorTasks } from "@/data/calculatorTasks";
import { ecommerceTasks } from "@/data/ecommerceTasks";
import { Step } from "@/types/calculator-steps";
import { Plan } from "@/types/calculator-types";
import StepProgress from "./StepProgress";
import StepNavigation from "./StepNavigation";
import { useSearchParams } from "react-router-dom";
import { scrollToTop } from "@/utils/scrollUtils";
import type { Dispatch, SetStateAction } from "react";

interface StepCalculatorProps {
  currentStep: Step;
  setCurrentStep: Dispatch<SetStateAction<Step>>;
  selectedPlan: Plan | null;
  onPlanSelect: (plan: Plan) => void;
  selectedTasks: Task[];
  onTasksChange: (tasks: Task[]) => void;
  selectedExtensions: Set<string>;
  onExtensionToggle: (extensionId: string, checked: boolean) => void;
  monthlyRevenue: string;
  setMonthlyRevenue: (value: string) => void;
  averageTicket: string;
  setAverageTicket: (value: string) => void;
  monthlyOrders: string;
  setMonthlyOrders: (value: string) => void;
}

const steps = [
  { step: "platform" as Step, label: "Plataforma" },
  { step: "plan" as Step, label: "Plano" },
  { step: "theme" as Step, label: "Tema" },
  { step: "tasks" as Step, label: "Tarefas" },
  { step: "summary" as Step, label: "Resumo" },
  { step: "contract" as Step, label: "Contrato" }
];

interface Configuration {
  poHours: number;
  customTheme: boolean;
  hasCRM: boolean;
  selectedERP: string | null;
  crmName?: string;
}

const StepCalculator = ({
  currentStep,
  setCurrentStep,
  selectedPlan,
  onPlanSelect,
  selectedTasks,
  onTasksChange,
  selectedExtensions,
  onExtensionToggle,
  monthlyRevenue,
  setMonthlyRevenue,
  averageTicket,
  setAverageTicket,
  monthlyOrders,
  setMonthlyOrders
}: StepCalculatorProps) => {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [paymentPlan, setPaymentPlan] = useState<Plan | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformType | null>(null);
  const [configuration, setConfiguration] = useState<Configuration>({
    poHours: 4,
    customTheme: false,
    hasCRM: false,
    selectedERP: null,
    crmName: undefined
  });

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
    onPlanSelect(plan);
    
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

    onTasksChange(preSelectedTasks);
  };

  const handleNext = () => {
    if (currentStep === "platform" && !selectedPlatform) {
      toast({
        title: "Selecione uma plataforma",
        description: "Por favor, selecione um tipo de plataforma para continuar.",
        variant: "destructive",
      });
      return;
    }

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
    if (currentStep === "platform") {
      nextStep = "plan";
    } else if (currentStep === "plan") {
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
    if (currentStep === "plan") {
      previousStep = "platform";
    } else if (currentStep === "tasks") {
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

  const handleConfigurationUpdate = (newConfig: Configuration) => {
    setConfiguration(newConfig);
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
      case "platform":
        return <PlatformStep selectedPlatform={selectedPlatform} onPlatformSelect={setSelectedPlatform} />;
      case "plan":
        return <PlanStep selectedPlan={selectedPlan} onPlanSelect={onPlanSelect} />;
      case "theme":
        return selectedPlan?.id === "express" && (
          <ThemeStep selectedTheme={selectedTheme} setSelectedTheme={setSelectedTheme} />
        );
      case "tasks":
        return selectedPlan && (
          <TasksStep 
            selectedPlan={selectedPlan}
            selectedTasks={selectedTasks}
            onTasksChange={onTasksChange}
            selectedExtensions={selectedExtensions}
            onExtensionToggle={onExtensionToggle}
            totalPrice={totalPrice}
            monthlyRevenue={monthlyRevenue}
            setMonthlyRevenue={setMonthlyRevenue}
            averageTicket={averageTicket}
            setAverageTicket={setAverageTicket}
            monthlyOrders={monthlyOrders}
            setMonthlyOrders={setMonthlyOrders}
            onConfigurationUpdate={handleConfigurationUpdate}
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
            selectedTheme={selectedTheme?.image}
            poFrequency={configuration.poHours.toString()}
            hasCRM={configuration.hasCRM}
            crmName={configuration.crmName}
            selectedERP={configuration.selectedERP}
            poHours={configuration.poHours}
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
    <Card className="border-0 shadow-none">
      <div className="mb-6">
        <StepProgress currentStep={currentStep} steps={steps} />
      </div>

      <motion.div
        key={currentStep}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="min-h-[400px] py-4"
      >
        {renderStepContent()}
      </motion.div>

      <div className="mt-6">
        <StepNavigation 
          currentStep={currentStep} 
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      </div>
    </Card>
  );
};

export default StepCalculator;
