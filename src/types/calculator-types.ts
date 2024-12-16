export type TaskType = 'optional' | 'essential' | 'recurring';

export interface Task {
  id: string;
  category: string;
  story: string;
  name: string;
  description: string;
  type: TaskType;
  hours: number;
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

export interface TaskDependency {
  taskId: string;
  dependencyType: 'essential' | 'recurring';
  hours: number;
}

export interface Extension {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  implementationHours: number;
  maintenanceHours: number;
  implementationCost: number;
  maintenanceCost: number;
}