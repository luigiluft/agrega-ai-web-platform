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

type Step = "plan" | "tasks" | "summary";

const StepCalculator = () => {
  const [currentStep, setCurrentStep] = useState<Step>("plan");
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
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
      // For express, only select essential tasks with basic configuration
      const basicTasks = essentialTasks.filter(task => 
        !task.name.includes("Avançad") && !task.name.includes("Premium")
      );
      // TODO: Set selected tasks state
    } else if (plan.id === 'standard') {
      // For standard, select all essential tasks and some optional ones
      const standardTasks = [
        ...essentialTasks,
        ...calculatorTasks.flatMap(category => 
          category.tasks.filter(task => 
            task.type === "optional" && !task.name.includes("Premium")
          )
        )
      ];
      // TODO: Set selected tasks state
    } else {
      // For premium, select all available tasks
      const allTasks = [
        ...calculatorTasks.flatMap(category => category.tasks),
        ...ecommerceTasks.flatMap(category => category.tasks)
      ];
      // TODO: Set selected tasks state
    }
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

    if (currentStep === "plan") setCurrentStep("tasks");
    else if (currentStep === "tasks") setCurrentStep("summary");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 to-orange-600 p-6">
      <Card className="max-w-5xl mx-auto p-8 shadow-xl">
        {/* Progress Steps */}
        <div className="flex justify-between items-center mb-12 relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -z-10" />
          {["plan", "tasks", "summary"].map((step, index) => (
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
                {step === "plan" ? "Escolha seu plano" :
                 step === "tasks" ? "Configure seu projeto" :
                 "Resumo do projeto"}
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

          {currentStep === "tasks" && selectedPlan && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Configure seu projeto</h2>
              <TaskCategorySection
                selectedPlan={selectedPlan}
                onTasksChange={() => {}}
                selectedExtensions={new Set()}
                onExtensionToggle={() => {}}
                prices={{}}
              />
            </div>
          )}

          {currentStep === "summary" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Resumo do projeto</h2>
              <ConsoleOutput
                implementationTasks={[]}
                maintenanceTasks={[]}
                implementationPrice="0"
                maintenancePrice="0"
                revenueShare="0"
                revenueSharePercent="0"
                totalHours={0}
              />
            </div>
          )}
        </motion.div>

        {/* Navigation Button */}
        {currentStep === "plan" && selectedPlan && (
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