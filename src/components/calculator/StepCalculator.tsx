import { useState } from "react";
import { motion } from "framer-motion";
import { Plan } from "./PlanSelector";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { useToast } from "../ui/use-toast";
import { Theme } from "../theme/types";
import PlanStep from "./steps/PlanStep";
import ThemeStep from "./steps/ThemeStep";
import TasksStep from "./steps/TasksStep";
import SummaryStep from "./steps/SummaryStep";
import { calculatorTasks } from "@/data/calculatorTasks";
import { ecommerceTasks } from "@/data/ecommerceTasks";

type Step = "plan" | "theme" | "tasks" | "summary";

const StepCalculator = () => {
  const [currentStep, setCurrentStep] = useState<Step>("plan");
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
  const { toast } = useToast();

  const shouldShowStep = (step: Step): boolean => {
    if (step === "theme") {
      return selectedPlan?.id === "express";
    }
    return true;
  };

  const handlePlanSelect = (plan: Plan) => {
    setSelectedPlan(plan);
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
    } else if (plan.id === 'standard') {
      const standardTasks = [
        ...essentialTasks,
        ...calculatorTasks.flatMap(category => 
          category.tasks.filter(task => 
            task.type === "optional" && !task.name.includes("Premium")
          )
        )
      ];
    } else {
      const allTasks = [
        ...calculatorTasks.flatMap(category => category.tasks),
        ...ecommerceTasks.flatMap(category => category.tasks)
      ];
    }
  };

  const steps = [
    { step: "plan" as Step, label: "Escolha seu plano" },
    { step: "theme" as Step, label: "Selecione o tema" },
    { step: "tasks" as Step, label: "Configure seu projeto" },
    { step: "summary" as Step, label: "Resumo do projeto" }
  ].filter(({ step }) => shouldShowStep(step));

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
    switch (currentStep) {
      case "plan":
        return <PlanStep selectedPlan={selectedPlan} onPlanSelect={handlePlanSelect} />;
      case "theme":
        return selectedPlan?.id === "express" && (
          <ThemeStep selectedTheme={selectedTheme} setSelectedTheme={setSelectedTheme} />
        );
      case "tasks":
        return selectedPlan && <TasksStep selectedPlan={selectedPlan} />;
      case "summary":
        return <SummaryStep />;
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