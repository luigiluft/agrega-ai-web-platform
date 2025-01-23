import { Task } from "./calculator-types";

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

export interface SummaryStepProps {
  selectedTasks: Task[];
  selectedExtensions: Set<string>;
  totalPrice: number;
}