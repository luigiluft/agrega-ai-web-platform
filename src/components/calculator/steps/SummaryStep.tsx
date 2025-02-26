
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

  // Cálculos de custos
  const maintenanceTasks = selectedTasks.filter(task => task.type === "recurring");
  const HOUR_RATE = 185;
  const maintenancePrice = maintenanceTasks.reduce((acc, task) => acc + task.hours * HOUR_RATE, 0);
  const REVENUE_SHARE_PERCENT = "3";
  const revenueShare = (Number(monthlyRevenue) * Number(REVENUE_SHARE_PERCENT)) / 100;

  const selectedExtensionDetails = Array.from(selectedExtensions).map(id => 
    ecommerceExtensions.find(ext => ext.id === id)
  ).filter(Boolean);

  // Cálculo do total de horas e custos
  const implementationHours = selectedTasks.reduce((acc, task) => 
    task.type !== "recurring" ? acc + task.hours : acc, 0);
  const extensionHours = selectedExtensionDetails.reduce((acc, ext) => 
    acc + (ext?.implementationHours || 0), 0);
  const totalHours = implementationHours + extensionHours;

  // Custos adicionais baseados nas features selecionadas
  const securityCost = security?.length ? security.length * 2000 : 0;
  const marketingCost = marketing?.length ? marketing.length * 1500 : 0;
  const performanceCost = performance?.length ? performance.length * 1800 : 0;
  const themeCustomizationCost = selectedTheme ? 50 * HOUR_RATE : 0;
  
  // Custos totais
  const implementationCost = totalPrice + securityCost + marketingCost + performanceCost + themeCustomizationCost;
  const monthlyMaintenanceCost = maintenancePrice + (poHours ? poHours * HOUR_RATE : 0);

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
            totalHours={totalHours}
          />
          <SelectedExtensions selectedExtensions={selectedExtensions} />
        </div>

        <InvestmentSummary
          totalPrice={implementationCost}
          maintenancePrice={monthlyMaintenanceCost}
          revenueShare={revenueShare}
          totalHours={totalHours}
          onPlanSelect={onPlanSelect}
          selectedPlan={selectedPlan}
          securityCost={securityCost}
          marketingCost={marketingCost}
          performanceCost={performanceCost}
          supportCost={poHours ? poHours * HOUR_RATE : 0}
        />
      </div>
    </div>
  );
};

export default SummaryStep;
