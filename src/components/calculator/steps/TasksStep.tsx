import { motion } from "framer-motion";
import TaskCategorySection from "../TaskCategorySection";
import { Plan } from "../PlanSelector";

interface TasksStepProps {
  selectedPlan: Plan;
}

const TasksStep = ({ selectedPlan }: TasksStepProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
        Configure seu projeto
      </h2>
      <TaskCategorySection
        selectedPlan={selectedPlan}
        onTasksChange={() => {}}
        selectedExtensions={new Set()}
        onExtensionToggle={() => {}}
        prices={{}}
      />
    </div>
  );
};

export default TasksStep;