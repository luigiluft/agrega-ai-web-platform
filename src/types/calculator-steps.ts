import { Task } from "./calculator-types";
import { Theme } from "@/components/theme/types";
import { Plan } from "@/components/calculator/PlanSelector";

export type Step = "plan" | "theme" | "tasks" | "summary";

export interface TaskCategorySectionProps {
  selectedPlan: Plan;
  selectedTasks: Task[];
  onTasksChange: (tasks: Task[]) => void;
  selectedExtensions: Set<string>;
  onExtensionToggle: (extensionId: string, checked: boolean) => void;
  totalPrice: number;
}

export interface SummaryStepProps {
  selectedTasks: Task[];
  selectedExtensions: Set<string>;
  totalPrice: number;
}

export interface TasksStepProps extends TaskCategorySectionProps {
  selectedPlan: Plan;
}