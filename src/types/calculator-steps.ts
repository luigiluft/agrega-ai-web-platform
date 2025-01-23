import { Task } from "./calculator-types";
import { Plan } from "@/components/calculator/PlanSelector";
import { Theme } from "@/components/theme/types";

export type Step = "plan" | "theme" | "tasks" | "summary";

export interface TaskCategorySectionProps {
  selectedPlan: Plan;
  selectedTasks: Task[];
  onTasksChange: (tasks: Task[]) => void;
  selectedExtensions: Set<string>;
  onExtensionToggle: (extensionId: string, checked: boolean) => void;
  prices: any;
}

export interface SummaryStepProps {
  selectedTasks: Task[];
  selectedExtensions: Set<string>;
  totalPrice: number;
}

export interface TasksStepProps {
  selectedPlan: Plan;
  selectedTasks: Task[];
  onTasksChange: (tasks: Task[]) => void;
  selectedExtensions: Set<string>;
  onExtensionToggle: (extensionId: string, checked: boolean) => void;
  totalPrice: number;
}

export interface ThemeStepProps {
  selectedTheme: Theme | null;
  setSelectedTheme: (theme: Theme | null) => void;
}

export interface PlanStepProps {
  selectedPlan: Plan | null;
  onPlanSelect: (plan: Plan) => void;
}