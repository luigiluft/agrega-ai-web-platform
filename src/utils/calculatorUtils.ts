
export const HOUR_RATE = 185; // Taxa padrão por hora
export const DESIGN_HOUR_RATE = 200; // Taxa de design por hora
export const INTEGRATION_MONTHLY_COST = 1500; // Custo mensal por integração
export const SECURITY_IMPLEMENTATION_COST = 2000; // Custo por feature de segurança
export const MARKETING_IMPLEMENTATION_COST = 1500; // Custo por feature de marketing
export const PERFORMANCE_IMPLEMENTATION_COST = 1800; // Custo por feature de performance
export const REVENUE_SHARE_PERCENT = 3;

interface CalculateHoursParams {
  implementationHours: number;
  extensionImplementationHours: number;
  hasTheme: boolean;
  hasCRM: boolean;
  hasERP: boolean;
  securityFeaturesCount: number;
  marketingFeaturesCount: number;
  performanceFeaturesCount: number;
}

export const calculateTotalHours = ({
  implementationHours,
  extensionImplementationHours,
  hasTheme,
  hasCRM,
  hasERP,
  securityFeaturesCount,
  marketingFeaturesCount,
  performanceFeaturesCount,
}: CalculateHoursParams) => {
  const THEME_HOURS = hasTheme ? 50 : 0;
  const CRM_HOURS = hasCRM ? 24 : 0;
  const ERP_HOURS = hasERP ? 24 : 0;
  const securityHours = securityFeaturesCount * 8;
  const marketingHours = marketingFeaturesCount * 6;
  const performanceHours = performanceFeaturesCount * 8;

  return (
    implementationHours +
    extensionImplementationHours +
    THEME_HOURS +
    CRM_HOURS +
    ERP_HOURS +
    securityHours +
    marketingHours +
    performanceHours
  );
};

interface CalculateCostsParams {
  implementationHours: number;
  extensionImplementationHours: number;
  hasTheme: boolean;
  securityFeaturesCount: number;
  marketingFeaturesCount: number;
  performanceFeaturesCount: number;
}

export const calculateImplementationCosts = ({
  implementationHours,
  extensionImplementationHours,
  hasTheme,
  securityFeaturesCount,
  marketingFeaturesCount,
  performanceFeaturesCount,
}: CalculateCostsParams) => {
  const baseImplementationCost = implementationHours * HOUR_RATE;
  const extensionsImplementationCost = extensionImplementationHours * HOUR_RATE;
  const securityImplementationCost = securityFeaturesCount * SECURITY_IMPLEMENTATION_COST;
  const marketingImplementationCost = marketingFeaturesCount * MARKETING_IMPLEMENTATION_COST;
  const performanceImplementationCost = performanceFeaturesCount * PERFORMANCE_IMPLEMENTATION_COST;
  const themeCustomizationCost = hasTheme ? 50 * DESIGN_HOUR_RATE : 0;

  return {
    baseImplementationCost,
    extensionsImplementationCost,
    securityImplementationCost,
    marketingImplementationCost,
    performanceImplementationCost,
    themeCustomizationCost,
    total:
      baseImplementationCost +
      extensionsImplementationCost +
      securityImplementationCost +
      marketingImplementationCost +
      performanceImplementationCost +
      themeCustomizationCost,
  };
};

interface CalculateMonthlyParams {
  maintenanceHours: number;
  integrationCount: number;
  poHours: number;
  monthlyRevenue: string;
}

export const calculateMonthlyCosts = ({
  maintenanceHours,
  integrationCount,
  poHours,
  monthlyRevenue,
}: CalculateMonthlyParams) => {
  const maintenanceTasksCost = maintenanceHours * HOUR_RATE;
  const integrationsMonthlyCost = integrationCount * INTEGRATION_MONTHLY_COST;
  const poMonthlyCost = poHours * HOUR_RATE;
  const revenueShare = (Number(monthlyRevenue) * REVENUE_SHARE_PERCENT) / 100;

  return {
    maintenanceTasksCost,
    integrationsMonthlyCost,
    poMonthlyCost,
    revenueShare,
    total: maintenanceTasksCost + integrationsMonthlyCost + poMonthlyCost + revenueShare,
  };
};
