export type Step = "plan" | "theme" | "tasks" | "summary";

export interface TaskCategorySectionProps {
  selectedPlan: any;
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