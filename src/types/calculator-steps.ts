import { Plan } from "@/components/calculator/PlanSelector";
import { Theme } from "@/components/theme/types";
import { Task } from "./calculator-types";

export type Step = "plan" | "theme" | "tasks" | "summary" | "contract";

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

export interface ContractStepProps {
  selectedPlan: Plan | null;
  selectedTasks: Task[];
  implementationPrice: number;
  maintenancePrice: number;
  revenueShare: number;
  revenueSharePercent: number;
}