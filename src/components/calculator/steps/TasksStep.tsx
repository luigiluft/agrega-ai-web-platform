import { motion } from "framer-motion";
import TaskCategorySection from "../TaskCategorySection";
import { Plan } from "../PlanSelector";
import { Task } from "@/types/calculator-types";

interface TasksStepProps {
  selectedPlan: Plan;
  selectedTasks: Task[];
  setSelectedTasks: (tasks: Task[]) => void;
}

const TasksStep = ({ selectedPlan, selectedTasks, setSelectedTasks }: TasksStepProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
        Configure seu projeto
      </h2>
      <TaskCategorySection
        selectedPlan={selectedPlan}
        onTasksChange={setSelectedTasks}
        selectedExtensions={new Set()}
        onExtensionToggle={() => {}}
        prices={{}}
        initialTasks={selectedTasks}
      />
    </div>
  );
};

export default TasksStep;