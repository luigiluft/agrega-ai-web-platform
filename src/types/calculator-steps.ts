import { Task } from "./calculator-types";

export type Step = "plan" | "theme" | "tasks" | "summary" | "contract";

export interface SummaryStepProps {
  selectedTasks: Task[];
  selectedExtensions: Set<string>;
  totalPrice: number;
  monthlyRevenue?: string;
}