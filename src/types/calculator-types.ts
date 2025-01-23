export type TaskType = 'essential' | 'optional' | 'recurring';

export interface Task {
  id: string;
  name: string;
  description: string;
  hours: number;
  type: TaskType;
  story: string;
  category: string;
  price?: number;
  isBasic?: boolean;
  isStandard?: boolean;
  dependencies?: {
    essential: string[];
    recurring: string[];
  };
}

export interface TaskCategory {
  id: string;
  name: string;
  tasks: Task[];
}

export interface Extension {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  implementationHours: number;
  maintenanceHours: number;
  implementationCost?: number;
  maintenanceCost?: number;
  isBasic?: boolean;
}

export interface Plan {
  id: string;
  name: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  monthlyLimit?: number;
}

export interface TaskCategorySectionProps {
  onTasksChange: (tasks: Task[]) => void;
  selectedPlan: Plan;
  selectedExtensions: Set<string>;
  onExtensionToggle: (extensionId: string, checked: boolean) => void;
  prices: {
    implementationTasks: Task[];
    maintenanceTasks: Task[];
    implementationPrice: string;
    maintenancePrice: string;
    revenueShare: string;
    revenueSharePercent: string;
    totalHours: number;
  };
}

export interface TaskSelectorProps {
  onTasksChange: (tasks: Task[]) => void;
  filter?: "implementation" | "maintenance";
  selectedPlan: Plan;
  selectedTasks: Task[];
}