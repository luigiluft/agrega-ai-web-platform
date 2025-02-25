
import { Integration, RevenueShareTier, Plan } from "@/types/calculator-types";

export const HOUR_RATE = 200;
export const THEME_CUSTOMIZATION_HOURS = 50;
export const THEME_BASIC_HOURS = 2;

export const integrations: Integration[] = [
  {
    id: "crm",
    name: "CRM",
    price: 1600,
    implementationHours: 8,
    maintenanceHours: 2,
    description: "Integração com sistema de CRM",
    isAvailable: (plan: Plan) => true,
  },
  {
    id: "erp",
    name: "ERP",
    price: 2400,
    implementationHours: 12,
    maintenanceHours: 3,
    description: "Integração com sistema ERP",
    isAvailable: (plan: Plan) => true,
  },
  {
    id: "marketplace",
    name: "Marketplace",
    price: 3000,
    implementationHours: 16,
    maintenanceHours: 4,
    description: "Integração com marketplaces",
    isAvailable: (plan: Plan) => plan.id !== "express",
  },
];

export const revenueShareTiers: RevenueShareTier[] = [
  { maxRevenue: 100000, percentage: 15 },
  { maxRevenue: 500000, percentage: 12 },
  { maxRevenue: 1000000, percentage: 10 },
  { maxRevenue: null, percentage: 5 },
];

export const calculateRevenueShare = (monthlyRevenue: number, isAnnualPlan: boolean): number => {
  const tier = revenueShareTiers.find(
    tier => tier.maxRevenue === null || monthlyRevenue <= tier.maxRevenue
  );
  const basePercentage = tier?.percentage || 5;
  return isAnnualPlan ? basePercentage - 1 : basePercentage;
};

export const calculateThemeCost = (plan: Plan, isCustomTheme: boolean): number => {
  if (plan.layout === "enterprise") return 0; // Já incluso no preço base
  return isCustomTheme ? THEME_CUSTOMIZATION_HOURS * HOUR_RATE : THEME_BASIC_HOURS * HOUR_RATE;
};

export const getMaxIntegrations = (plan: Plan): number => {
  switch (plan.id) {
    case "express":
      return 2;
    case "standard":
      return 4;
    case "enterprise":
      return 8;
    default:
      return 2;
  }
};
