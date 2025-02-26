
import { Plan } from "@/types/calculator-types";
import { SummaryStepProps } from "@/types/calculator-steps";
import ProjectConfiguration from "../summary/ProjectConfiguration";
import SelectedExtensions from "../summary/SelectedExtensions";
import InvestmentSummary from "../summary/InvestmentSummary";
import { ecommerceExtensions } from "@/data/ecommerceExtensions";
import { SecurityFeature, MarketingFeature, PerformanceFeature } from "@/types/calculator-new-features";
import { 
  calculateTotalHours, 
  calculateImplementationCosts, 
  calculateMonthlyCosts 
} from "@/utils/calculatorUtils";
import { useAnnualPlan } from "@/hooks/useAnnualPlan";

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
  // Configuração do plano anual
  useAnnualPlan(totalPrice, poHours, selectedPlan, onPlanSelect);

  // Cálculo das horas de implementação
  const implementationHours = selectedTasks.reduce((acc, task) => 
    task.type !== "recurring" ? acc + task.hours : acc, 0);
  
  const selectedExtensionDetails = Array.from(selectedExtensions).map(id => 
    ecommerceExtensions.find(ext => ext.id === id)
  ).filter(Boolean);

  const extensionImplementationHours = selectedExtensionDetails.reduce((acc, ext) => 
    acc + (ext?.implementationHours || 0), 0);

  // Cálculo do total de horas
  const totalImplementationHours = calculateTotalHours({
    implementationHours,
    extensionImplementationHours,
    hasTheme: !!selectedTheme,
    hasCRM: !!hasCRM,
    hasERP: !!selectedERP,
    securityFeaturesCount: security?.length || 0,
    marketingFeaturesCount: marketing?.length || 0,
    performanceFeaturesCount: performance?.length || 0,
  });

  // Cálculo dos custos de implementação
  const implementationCosts = calculateImplementationCosts({
    implementationHours,
    extensionImplementationHours,
    hasTheme: !!selectedTheme,
    securityFeaturesCount: security?.length || 0,
    marketingFeaturesCount: marketing?.length || 0,
    performanceFeaturesCount: performance?.length || 0,
  });

  // Cálculo dos custos mensais
  const maintenanceTasks = selectedTasks.filter(task => task.type === "recurring");
  const maintenanceHours = maintenanceTasks.reduce((acc, task) => acc + task.hours, 0);
  const numberOfIntegrations = (hasCRM ? 1 : 0) + (selectedERP ? 1 : 0);

  const monthlyCosts = calculateMonthlyCosts({
    maintenanceHours,
    integrationCount: numberOfIntegrations,
    poHours: poHours || 0,
    monthlyRevenue,
  });

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
          totalPrice={implementationCosts.total}
          maintenancePrice={monthlyCosts.total}
          revenueShare={monthlyCosts.revenueShare}
          totalHours={totalImplementationHours}
          onPlanSelect={onPlanSelect}
          selectedPlan={selectedPlan}
          securityCost={implementationCosts.securityImplementationCost}
          marketingCost={implementationCosts.marketingImplementationCost}
          performanceCost={implementationCosts.performanceImplementationCost}
          supportCost={monthlyCosts.poMonthlyCost}
          integrationsCost={monthlyCosts.integrationsMonthlyCost}
          maintenanceTasksCost={monthlyCosts.maintenanceTasksCost}
          baseImplementationCost={implementationCosts.baseImplementationCost}
          extensionsImplementationCost={implementationCosts.extensionsImplementationCost}
          themeCustomizationCost={implementationCosts.themeCustomizationCost}
        />
      </div>
    </div>
  );
};

export default SummaryStep;
