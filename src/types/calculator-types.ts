
export type TaskType = 'essential' | 'optional' | 'recurring';
export type SupportLevel = 'basic' | 'priority' | '24/7';
export type LayoutType = 'standard' | 'custom' | 'enterprise';

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
  maxPlanLevel?: 'express' | 'standard' | 'enterprise';
}

export interface Plan {
  id: string;
  name: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  monthlyLimit?: number;
  baseImplementationPrice: number;
  baseMaintenancePrice: number;
  basePOHours: number;
  maxIntegrations: number;
  supportLevel: SupportLevel;
  layout: LayoutType;
}

export interface Integration {
  id: string;
  name: string;
  price: number;
  implementationHours: number;
  maintenanceHours: number;
  description: string;
  isAvailable: (plan: Plan) => boolean;
}

export interface RevenueShareTier {
  maxRevenue: number | null;
  percentage: number;
}

export interface TaskCategorySectionProps {
  onTasksChange: (tasks: Task[]) => void;
  selectedPlan: Plan;
  selectedTasks: Task[];
  selectedExtensions: Set<string>;
  onExtensionToggle: (extensionId: string, isSelected: boolean) => void;
  prices: {
    implementation: number;
    maintenance: number;
  };
}

export interface TaskSelectorProps {
  onTasksChange: (tasks: Task[]) => void;
  filter?: string;
  selectedPlan: Plan;
  selectedTasks: Task[];
}
