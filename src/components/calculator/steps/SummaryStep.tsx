import { motion } from "framer-motion";
import ConsoleOutput from "../ConsoleOutput";
import { SummaryStepProps } from "@/types/calculator-steps";
import { ecommerceExtensions } from "@/data/ecommerceExtensions";
import { Plan } from "../PlanSelector";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const SummaryStep = ({ 
  selectedTasks, 
  selectedExtensions, 
  totalPrice,
  monthlyRevenue = "0",
  onPlanSelect,
  selectedPlan
}: SummaryStepProps & { 
  onPlanSelect: (plan: Plan) => void;
  selectedPlan: Plan | null;
}) => {
  const { toast } = useToast();
  const maintenanceTasks = selectedTasks.filter(task => task.type === "recurring");
  const implementationTasks = selectedTasks.filter(task => task.type !== "recurring");
  
  const HOUR_RATE = 185;
  const maintenancePrice = maintenanceTasks.reduce((acc, task) => acc + task.hours * HOUR_RATE, 0);
  const REVENUE_SHARE_PERCENT = "3";
  const revenueShare = (Number(monthlyRevenue) * Number(REVENUE_SHARE_PERCENT)) / 100;

  const selectedExtensionDetails = Array.from(selectedExtensions).map(id => 
    ecommerceExtensions.find(ext => ext.id === id)
  ).filter(Boolean);

  const totalHours = selectedTasks.reduce((acc, task) => acc + task.hours, 0) +
    selectedExtensionDetails.reduce((acc, ext) => acc + (ext?.implementationHours || 0), 0);

  const handlePlanSelect = (plan: Plan) => {
    onPlanSelect(plan);
    toast({
      title: "Plano selecionado",
      description: `Você selecionou o plano ${plan.name}`,
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
        Resumo do projeto
      </h2>
      <ConsoleOutput
        implementationTasks={implementationTasks}
        maintenanceTasks={maintenanceTasks}
        implementationPrice={totalPrice.toString()}
        maintenancePrice={maintenancePrice.toString()}
        revenueShare={revenueShare.toString()}
        revenueSharePercent={REVENUE_SHARE_PERCENT}
        totalHours={totalHours}
        selectedPlan={selectedPlan}
        onPlanSelect={handlePlanSelect}
      />
    </div>
  );
};

export default SummaryStep;