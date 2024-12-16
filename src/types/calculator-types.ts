export interface Task {
  id: string;
  name: string;
  description: string;
  hours: number;
  type: TaskType;
  story: string;
  dependencies?: {
    essential: string[];
    recurring: string[];
  };
}

export type TaskType = 'essential' | 'optional' | 'recurring';

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
}

export interface CalculatorResultsProps {
  implementationPrice: string;
  maintenancePrice: string;
  revenueShare: string;
  revenueSharePercent: string;
  monthlyRevenue: string;
  setMonthlyRevenue?: (value: string) => void;
  onContactClick: () => void;
  layoutHours: number;
  maintenanceHours: number;
  meetingHours: number;
  campaignHours: number;
  functionalityHours: number;
  baseImplementationCost: string;
  baseMaintenanceCost: string;
  totalHours: number;
  rouletteDiscount: number;
  totalImplementationHours: number;
}