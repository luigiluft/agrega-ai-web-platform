export interface Feature {
  id: string;
  name: string;
  description: string;
  hours?: number;
  monthlyHours?: number;
}

export interface Category {
  id: string;
  name: string;
  totalHours?: number;
  features: Feature[];
}

export interface CalculatorResultsProps {
  implementationPrice: string;
  maintenancePrice: string;
  revenueShare: string;
  revenueSharePercent: string;
  monthlyRevenue?: string;
  setMonthlyRevenue?: (value: string) => void;
  onContactClick: () => void;
  layoutHours: number;
  maintenanceHours: number;
  meetingHours: number;
  campaignHours: number;
  functionalityHours: number;
  baseImplementationCost?: string;
  baseMaintenanceCost?: string;
  totalHours?: number;
  rouletteDiscount?: number;
  totalImplementationHours?: number;
  prices?: {
    implementationPrice: string;
    maintenancePrice: string;
    revenueShare: string;
    baseImplementationCost: string;
    baseMaintenanceCost: string;
    revenueSharePercent: string;
    totalHours: number;
    rouletteDiscount: number;
    totalImplementationHours: number;
  };
}