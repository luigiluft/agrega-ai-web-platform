import { motion } from "framer-motion";
import TaskCategorySection from "../TaskCategorySection";
import { TasksStepProps } from "@/types/calculator-steps";
import ConfigurationOptions from "../ConfigurationOptions";
import { useState, useEffect } from "react";

const HOUR_RATE = 185;

const TasksStep = ({ 
  selectedPlan, 
  selectedTasks,
  onTasksChange,
  selectedExtensions,
  onExtensionToggle,
  totalPrice 
}: TasksStepProps) => {
  const [configPrice, setConfigPrice] = useState({
    implementation: selectedPlan.baseImplementationPrice,
    maintenance: selectedPlan.baseMaintenancePrice
  });

  const handleConfigurationChange = (config: {
    poHours: number;
    customTheme: boolean;
    integrationCount: number;
  }) => {
    const additionalPoHours = Math.max(0, config.poHours - selectedPlan.basePOHours);
    const themeHours = config.customTheme ? 20 : 2;
    const integrationHours = config.integrationCount * 8;

    const implementationPrice = selectedPlan.baseImplementationPrice + 
      (themeHours * HOUR_RATE) + 
      (integrationHours * HOUR_RATE);

    const maintenancePrice = selectedPlan.baseMaintenancePrice + 
      (additionalPoHours * HOUR_RATE);

    setConfigPrice({
      implementation: implementationPrice,
      maintenance: maintenancePrice
    });
  };

  const prices = {
    implementationTasks: selectedTasks.filter(task => task.type !== "recurring"),
    maintenanceTasks: selectedTasks.filter(task => task.type === "recurring"),
    implementationPrice: configPrice.implementation.toString(),
    maintenancePrice: configPrice.maintenance.toString(),
    revenueShare: "0",
    revenueSharePercent: "0",
    totalHours: selectedTasks.reduce((acc, task) => acc + task.hours, 0)
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
        Configure seu projeto
      </h2>
      
      <ConfigurationOptions
        selectedPlan={selectedPlan}
        onConfigurationChange={handleConfigurationChange}
      />

      <TaskCategorySection
        selectedPlan={selectedPlan}
        onTasksChange={onTasksChange}
        selectedExtensions={selectedExtensions}
        onExtensionToggle={onExtensionToggle}
        prices={prices}
      />
    </div>
  );
};

export default TasksStep;