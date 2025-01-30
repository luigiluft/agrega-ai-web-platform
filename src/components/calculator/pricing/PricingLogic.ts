import { Plan } from "../PlanSelector";
import { Task } from "@/types/calculator-types";

export interface PricingResult {
  implementationPrice: string;
  maintenancePrice: string;
  revenueShare: string;
  revenueSharePercent: string;
  implementationTasks: Task[];
  maintenanceTasks: Task[];
  totalHours: number;
}

export const HOURLY_RATE = 185;

export const calculateRevenueShare = (revenue: number): number => {
  if (revenue <= 100000) {
    return 0.15; // 15%
  } else if (revenue <= 500000) {
    return 0.12; // 12%
  } else if (revenue <= 1000000) {
    return 0.10; // 10%
  } else {
    return 0.05; // 5%
  }
};

export const calculatePrices = (
  selectedTasks: Task[],
  selectedPlan: Plan | null,
  monthlyRevenue: string
): PricingResult => {
  const implementationTasks = selectedTasks.filter(task => 
    task.type === 'essential' || task.type === 'optional'
  );
  
  const maintenanceTasks = selectedTasks.filter(task => 
    task.type === 'recurring'
  );

  const implementationHours = implementationTasks.reduce(
    (total, task) => total + task.hours, 
    0
  );

  const maintenanceHours = maintenanceTasks.reduce(
    (total, task) => total + task.hours, 
    0
  );
  
  const implementationPrice = implementationHours * HOURLY_RATE;
  const maintenancePrice = maintenanceHours * HOURLY_RATE;
  
  const revenue = parseFloat(monthlyRevenue) || 0;
  const revenueSharePercent = calculateRevenueShare(revenue);
  const revenueShare = revenue * revenueSharePercent;

  return {
    implementationPrice: implementationPrice.toFixed(2),
    maintenancePrice: maintenancePrice.toFixed(2),
    revenueShare: revenueShare.toFixed(2),
    revenueSharePercent: (revenueSharePercent * 100).toFixed(1),
    implementationTasks,
    maintenanceTasks,
    totalHours: implementationHours + maintenanceHours
  };
};