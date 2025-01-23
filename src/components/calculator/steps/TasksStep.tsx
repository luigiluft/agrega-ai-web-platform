import { motion } from "framer-motion";
import TaskCategorySection from "../TaskCategorySection";
import { TasksStepProps } from "@/types/calculator-steps";

const TasksStep = ({ 
  selectedPlan, 
  selectedTasks,
  onTasksChange,
  selectedExtensions,
  onExtensionToggle,
  totalPrice 
}: TasksStepProps) => {
  const prices = {
    implementationTasks: selectedTasks.filter(task => task.type !== "recurring"),
    maintenanceTasks: selectedTasks.filter(task => task.type === "recurring"),
    implementationPrice: totalPrice.toString(), // Convert to string
    maintenancePrice: "0", // Set as string
    revenueShare: "0",
    revenueSharePercent: "0",
    totalHours: selectedTasks.reduce((acc, task) => acc + task.hours, 0)
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
        Configure seu projeto
      </h2>
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