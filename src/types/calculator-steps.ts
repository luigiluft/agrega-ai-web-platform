import { Task } from "./calculator-types";
import { Plan } from "@/components/calculator/PlanSelector";

export type Step = "plan" | "theme" | "tasks" | "summary" | "contract";

export interface SummaryStepProps {
  selectedTasks: Task[];
  selectedExtensions: Set<string>;
  totalPrice: number;
  monthlyRevenue?: string;
  onPlanSelect: (plan: Plan) => void;
  selectedPlan: Plan | null;
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