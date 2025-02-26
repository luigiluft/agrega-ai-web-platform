
import { Plan } from "@/types/calculator-types";
import { SummaryStepProps } from "@/types/calculator-steps";
import ProjectConfiguration from "../summary/ProjectConfiguration";
import SelectedExtensions from "../summary/SelectedExtensions";
import InvestmentSummary from "../summary/InvestmentSummary";
import { ecommerceExtensions } from "@/data/ecommerceExtensions";
import { SecurityFeature, MarketingFeature, PerformanceFeature } from "@/types/calculator-new-features";

const SummaryStep = ({ 
  selectedTasks, 
  selectedExtensions, 
  totalPrice,
  monthlyRevenue = "0",
  onPlanSelect,
  selectedPlan,
  selectedTheme,
  poFrequency,
  hasCRM,
  crmName,
  selectedERP,
  security,
  marketing,
  performance,
  poHours
}: SummaryStepProps & { 
  onPlanSelect: (plan: Plan) => void;
  selectedPlan: Plan | null;
  selectedTheme?: string;
  poFrequency?: string;
  hasCRM?: boolean;
  crmName?: string;
  selectedERP?: string | null;
  security?: SecurityFeature[];
  marketing?: MarketingFeature[];
  performance?: PerformanceFeature[];
  poHours?: number;
}) => {
  // Automaticamente define o plano como anual
  if (!selectedPlan) {
    const annualPlan = {
      id: 'annual',
      name: 'Plano Anual',
      description: 'Pagamento em 12x',
      features: [],
      baseImplementationPrice: totalPrice,
      baseMaintenancePrice: 0,
      basePOHours: poHours || 0,
      maxIntegrations: 4,
      supportLevel: 'priority',
      layout: 'custom'
    } as Plan;
    onPlanSelect(annualPlan);
  }

  // Constantes de custos
  const HOUR_RATE = 185; // Taxa padrão por hora
  const DESIGN_HOUR_RATE = 200; // Taxa de design por hora
  const INTEGRATION_MONTHLY_COST = 1500; // Custo mensal por integração
  const SECURITY_IMPLEMENTATION_COST = 2000; // Custo de implementação por feature de segurança
  const MARKETING_IMPLEMENTATION_COST = 1500; // Custo de implementação por feature de marketing
  const PERFORMANCE_IMPLEMENTATION_COST = 1800; // Custo de implementação por feature de performance
  const THEME_HOURS = selectedTheme ? 50 : 0; // Horas para tema personalizado
  const CRM_HOURS = hasCRM ? 24 : 0; // Horas para integração CRM
  const ERP_HOURS = selectedERP ? 24 : 0; // Horas para integração ERP

  // Cálculos de horas de implementação
  const implementationHours = selectedTasks.reduce((acc, task) => 
    task.type !== "recurring" ? acc + task.hours : acc, 0);
  
  const selectedExtensionDetails = Array.from(selectedExtensions).map(id => 
    ecommerceExtensions.find(ext => ext.id === id)
  ).filter(Boolean);

  const extensionImplementationHours = selectedExtensionDetails.reduce((acc, ext) => 
    acc + (ext?.implementationHours || 0), 0);

  // Horas de recursos adicionais
  const securityHours = (security?.length || 0) * 8; // 8 horas por feature
  const marketingHours = (marketing?.length || 0) * 6; // 6 horas por feature
  const performanceHours = (performance?.length || 0) * 8; // 8 horas por feature

  // Total de horas
  const totalImplementationHours = 
    implementationHours + 
    extensionImplementationHours + 
    THEME_HOURS +
    CRM_HOURS +
    ERP_HOURS +
    securityHours +
    marketingHours +
    performanceHours;

  // Cálculos de custos de implementação
  const baseImplementationCost = implementationHours * HOUR_RATE;
  const extensionsImplementationCost = extensionImplementationHours * HOUR_RATE;
  const securityImplementationCost = security?.length ? security.length * SECURITY_IMPLEMENTATION_COST : 0;
  const marketingImplementationCost = marketing?.length ? marketing.length * MARKETING_IMPLEMENTATION_COST : 0;
  const performanceImplementationCost = performance?.length ? performance.length * PERFORMANCE_IMPLEMENTATION_COST : 0;
  const themeCustomizationCost = selectedTheme ? THEME_HOURS * DESIGN_HOUR_RATE : 0;
  
  const totalImplementationCost = 
    baseImplementationCost + 
    extensionsImplementationCost +
    securityImplementationCost + 
    marketingImplementationCost + 
    performanceImplementationCost + 
    themeCustomizationCost;

  // Cálculos de custos mensais (sustentação)
  const maintenanceTasks = selectedTasks.filter(task => task.type === "recurring");
  const maintenanceHours = maintenanceTasks.reduce((acc, task) => acc + task.hours, 0);
  const maintenanceTasksCost = maintenanceHours * HOUR_RATE;
  
  // Custos mensais de integrações
  const numberOfIntegrations = (hasCRM ? 1 : 0) + (selectedERP ? 1 : 0);
  const integrationsMonthlyCost = numberOfIntegrations * INTEGRATION_MONTHLY_COST;
  
  // Custo mensal do PO
  const poMonthlyCost = poHours ? poHours * HOUR_RATE : 0;

  // Revenue share
  const REVENUE_SHARE_PERCENT = 3;
  const revenueShare = (Number(monthlyRevenue) * REVENUE_SHARE_PERCENT) / 100;

  // Total mensal (sustentação)
  const totalMonthlyCost = 
    maintenanceTasksCost + 
    integrationsMonthlyCost + 
    poMonthlyCost +
    revenueShare;

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
        Resumo do projeto
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <ProjectConfiguration
            poFrequency={poFrequency}
            selectedTheme={selectedTheme}
            hasCRM={hasCRM}
            crmName={crmName}
            selectedERP={selectedERP}
            security={security}
            marketing={marketing}
            performance={performance}
            poHours={poHours}
            totalHours={totalImplementationHours}
          />
          <SelectedExtensions selectedExtensions={selectedExtensions} />
        </div>

        <InvestmentSummary
          totalPrice={totalImplementationCost}
          maintenancePrice={totalMonthlyCost}
          revenueShare={revenueShare}
          totalHours={totalImplementationHours}
          onPlanSelect={onPlanSelect}
          selectedPlan={selectedPlan}
          securityCost={securityImplementationCost}
          marketingCost={marketingImplementationCost}
          performanceCost={performanceImplementationCost}
          supportCost={poMonthlyCost}
          integrationsCost={integrationsMonthlyCost}
          maintenanceTasksCost={maintenanceTasksCost}
          baseImplementationCost={baseImplementationCost}
          extensionsImplementationCost={extensionsImplementationCost}
          themeCustomizationCost={themeCustomizationCost}
        />
      </div>
    </div>
  );
};

export default SummaryStep;
