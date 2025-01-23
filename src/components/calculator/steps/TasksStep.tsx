import { motion } from "framer-motion";
import TaskCategorySection from "../TaskCategorySection";
import { Plan } from "../PlanSelector";
import { Task } from "@/types/calculator-types";

interface TasksStepProps {
  selectedPlan: Plan;
  selectedTasks: Task[];
  setSelectedTasks: (tasks: Task[]) => void;
  selectedExtensions: Set<string>;
  setSelectedExtensions: (extensions: Set<string>) => void;
  totalPrice: number;
}

const TasksStep = ({ 
  selectedPlan, 
  selectedTasks, 
  setSelectedTasks,
  selectedExtensions,
  setSelectedExtensions,
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
      />
    </div>
  );
};

export default TasksStep;