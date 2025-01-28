import { Plan } from "@/components/calculator/PlanSelector";
import { Task } from "./calculator-types";
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
  monthlyRevenue?: string;
}

export interface TasksStepProps {
  selectedPlan: Plan;
  selectedTasks: Task[];
  onTasksChange: (tasks: Task[]) => void;
  selectedExtensions: Set<string>;
  onExtensionToggle: (extensionId: string, checked: boolean) => void;
  totalPrice: number;
  monthlyRevenue: string;
  setMonthlyRevenue: (value: string) => void;
  averageTicket: string;
  setAverageTicket: (value: string) => void;
  monthlyOrders: string;
  setMonthlyOrders: (value: string) => void;
}

export interface PlanStepProps {
  selectedPlan: Plan | null;
  onPlanSelect: (plan: Plan) => void;
}

export interface ThemeStepProps {
  selectedTheme: Theme | null;
  setSelectedTheme: (theme: Theme | null) => void;
}
