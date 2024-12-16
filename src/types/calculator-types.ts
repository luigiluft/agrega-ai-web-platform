export type TaskType = 'optional' | 'essential' | 'recurring';

export interface Task {
  id: string;
  category: string;
  story: string;
  name: string;
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