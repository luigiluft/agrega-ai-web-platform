import { useState } from "react";
import { motion } from "framer-motion";
import PlanSelector, { Plan } from "./PlanSelector";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { useToast } from "../ui/use-toast";
import TaskCategorySection from "./TaskCategorySection";
import ConsoleOutput from "./ConsoleOutput";
import { calculatorTasks } from "@/data/calculatorTasks";
import { ecommerceTasks } from "@/data/ecommerceTasks";
import ThemeSelector from "../theme/ThemeSelector";
import { themes } from "../theme/themeData";
import { Theme } from "../theme/types";
import { Task } from "@/types/calculator-types";

type Step = "plan" | "theme" | "tasks" | "summary";

const HOURLY_RATE = 185;

const calculateRevenueShare = (revenue: number): number => {
  if (revenue <= 50000) return 0.15;
  else if (revenue <= 100000) return 0.12;
  else if (revenue <= 200000) return 0.10;
  else return 0.08;
};

const StepCalculator = () => {
  const [currentStep, setCurrentStep] = useState<Step>("plan");
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
  const [selectedTasks, setSelectedTasks] = useState<Task[]>([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState<string>("50000");
  const { toast } = useToast();

  const handlePlanSelect = (plan: Plan) => {
    setSelectedPlan(plan);
    
    // Preset task selection based on plan
    const essentialTasks = [
      ...calculatorTasks.flatMap(category => 
        category.tasks.filter(task => task.type === "essential")
      ),
      ...ecommerceTasks.flatMap(category => 
        category.tasks.filter(task => task.type === "essential")
      )
    ];

    if (plan.id === 'express') {
      const basicTasks = essentialTasks.filter(task => 
        !task.name.includes("Avançad") && !task.name.includes("Premium")
      );
      setSelectedTasks(basicTasks);
    } else if (plan.id === 'standard') {
      const standardTasks = [
        ...essentialTasks,
        ...calculatorTasks.flatMap(category => 
          category.tasks.filter(task => 
            task.type === "optional" && !task.name.includes("Premium")
          )
        )
      ];
      setSelectedTasks(standardTasks);
    } else {
      const allTasks = [
        ...calculatorTasks.flatMap(category => category.tasks),
        ...ecommerceTasks.flatMap(category => category.tasks)
      ];
      setSelectedTasks(allTasks);
    }
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
    
    const implementationPrice = implementationHours * HOURLY_RATE;
    const maintenancePrice = maintenanceHours * HOURLY_RATE;
    
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

  const steps: { step: Step; label: string }[] = [
    { step: "plan" as Step, label: "Escolha seu plano" },
    { step: "theme" as Step, label: "Selecione o tema" },
    { step: "tasks" as Step, label: "Configure seu projeto" },
    { step: "summary" as Step, label: "Resumo do projeto" },
  ].filter(({ step }) => {
    if (step === "theme") {
      return selectedPlan?.id === "express";
    }
    return true;
  });

  const prices = calculatePrices();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 to-orange-600 p-6">
      <Card className="max-w-5xl mx-auto p-8 shadow-xl">
        {/* Progress Steps */}
        <div className="flex justify-between items-center mb-12 relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -z-10" />
          {steps.map(({ step, label }, index) => (
            <div key={step} className="flex flex-col items-center gap-2 bg-white p-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-semibold
                  ${currentStep === step
                    ? "bg-orange-500 text-white"
                    : "bg-gray-200 text-gray-600"
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

        {/* Step Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="min-h-[400px]"
        >
          {currentStep === "plan" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-center mb-8">Escolha seu plano</h2>
              <PlanSelector
                selectedPlan={selectedPlan}
                onPlanSelect={handlePlanSelect}
              />
            </div>
          )}

          {currentStep === "theme" && selectedPlan?.id === "express" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-center mb-8">Selecione o tema do seu e-commerce</h2>
              <ThemeSelector
                themes={themes}
                selectedTheme={selectedTheme}
                onThemeSelect={setSelectedTheme}
              />
            </div>
          )}

          {currentStep === "tasks" && selectedPlan && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Configure seu projeto</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <TaskCategorySection
                  onTasksChange={setSelectedTasks}
                  selectedExtensions={new Set()}
                  onExtensionToggle={() => {}}
                  prices={prices}
                  selectedPlan={selectedPlan}
                />
                <ConsoleOutput
                  implementationTasks={prices.implementationTasks}
                  maintenanceTasks={prices.maintenanceTasks}
                  implementationPrice={prices.implementationPrice}
                  maintenancePrice={prices.maintenancePrice}
                  revenueShare={prices.revenueShare}
                  revenueSharePercent={prices.revenueSharePercent}
                  totalHours={prices.totalHours}
                />
              </div>
            </div>
          )}

          {currentStep === "summary" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Resumo do projeto</h2>
              <ConsoleOutput
                implementationTasks={prices.implementationTasks}
                maintenanceTasks={prices.maintenanceTasks}
                implementationPrice={prices.implementationPrice}
                maintenancePrice={prices.maintenancePrice}
                revenueShare={prices.revenueShare}
                revenueSharePercent={prices.revenueSharePercent}
                totalHours={prices.totalHours}
              />
            </div>
          )}
        </motion.div>

        {/* Navigation Button */}
        {currentStep !== "summary" && (
          <div className="flex justify-end mt-8">
            <Button
              onClick={handleNext}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full flex items-center gap-2"
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