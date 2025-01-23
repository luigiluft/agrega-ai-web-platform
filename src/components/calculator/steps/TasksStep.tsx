import { motion } from "framer-motion";
import TaskCategorySection from "../TaskCategorySection";
import { Plan } from "../PlanSelector";
import { Task } from "@/types/calculator-types";
import { TaskCategorySectionProps } from "@/types/calculator-steps";

interface TasksStepProps extends TaskCategorySectionProps {
  selectedPlan: Plan;
}

const TasksStep = ({ 
  selectedPlan, 
  selectedTasks,
  onTasksChange,
  selectedExtensions,
  onExtensionToggle,
  totalPrice 
}: TasksStepProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
        Configure seu projeto
      </h2>
      <div className="text-2xl font-bold text-center text-orange-600">
        Valor Total: R$ {totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
      </div>
      <TaskCategorySection
        selectedPlan={selectedPlan}
        selectedTasks={selectedTasks}
        onTasksChange={onTasksChange}
        selectedExtensions={selectedExtensions}
        onExtensionToggle={onExtensionToggle}
        totalPrice={totalPrice}
      />
    </div>
  );
};

export default TasksStep;