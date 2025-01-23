import { useState } from "react";
import { motion } from "framer-motion";
import PlanSelector, { Plan } from "./PlanSelector";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useToast } from "../ui/use-toast";
import TaskCategorySection from "./TaskCategorySection";
import ConsoleOutput from "./ConsoleOutput";

type Step = "plan" | "tasks" | "summary";

const StepCalculator = () => {
  const [currentStep, setCurrentStep] = useState<Step>("plan");
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const { toast } = useToast();

  const handlePlanSelect = (plan: Plan) => {
    setSelectedPlan(plan);
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

  const handleBack = () => {
    if (currentStep === "tasks") setCurrentStep("plan");
    else if (currentStep === "summary") setCurrentStep("tasks");
  };

  return (
    <Card className="p-6 space-y-6">
      {/* Progress Steps */}
      <div className="flex justify-between items-center mb-8">
        {["plan", "tasks", "summary"].map((step, index) => (
          <div key={step} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep === step
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {index + 1}
            </div>
            {index < 2 && (
              <div
                className={`h-1 w-24 mx-2 ${
                  currentStep === "summary"
                    ? "bg-primary"
                    : index === 0 && currentStep === "tasks"
                    ? "bg-primary"
                    : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        {currentStep === "plan" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Escolha seu plano</h2>
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

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        {currentStep !== "plan" && (
          <Button
            variant="outline"
            onClick={handleBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Button>
        )}
        {currentStep !== "summary" && (
          <Button
            onClick={handleNext}
            className="flex items-center gap-2 ml-auto"
          >
            Próximo
            <ArrowRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </Card>
  );
};

export default StepCalculator;