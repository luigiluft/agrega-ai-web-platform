
import { Plan } from "@/types/calculator-types";
import { SummaryStepProps } from "@/types/calculator-steps";
import { useToast } from "@/components/ui/use-toast";
import ProjectConfiguration from "../summary/ProjectConfiguration";
import SelectedExtensions from "../summary/SelectedExtensions";
import InvestmentSummary from "../summary/InvestmentSummary";
import { ecommerceExtensions } from "@/data/ecommerceExtensions";

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
  security?: string[];
  marketing?: string[];
  performance?: string[];
  poHours?: number;
}) => {
  const { toast } = useToast();
  const maintenanceTasks = selectedTasks.filter(task => task.type === "recurring");
  const HOUR_RATE = 185;
  const maintenancePrice = maintenanceTasks.reduce((acc, task) => acc + task.hours * HOUR_RATE, 0);
  const REVENUE_SHARE_PERCENT = "3";
  const revenueShare = (Number(monthlyRevenue) * Number(REVENUE_SHARE_PERCENT)) / 100;

  const selectedExtensionDetails = Array.from(selectedExtensions).map(id => 
    ecommerceExtensions.find(ext => ext.id === id)
  ).filter(Boolean);

  const totalHours = selectedTasks.reduce((acc, task) => acc + task.hours, 0) +
    selectedExtensionDetails.reduce((acc, ext) => acc + (ext?.implementationHours || 0), 0);

  // Automaticamente seleciona o plano anual se não houver plano selecionado
  if (!selectedPlan) {
    const annualPlan = {
      id: 'annual',
      name: 'Plano Anual',
      description: '',
      features: [],
      baseImplementationPrice: 0,
      baseMaintenancePrice: 0,
      basePOHours: 0,
      maxIntegrations: 0
    } as Plan;
    
    onPlanSelect(annualPlan);
  }

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
          totalPrice={totalPrice}
          maintenancePrice={maintenancePrice}
          revenueShare={revenueShare}
          totalHours={totalHours}
          onPlanSelect={onPlanSelect}
          selectedPlan={selectedPlan}
        />
      </div>
    </div>
  );
};

export default SummaryStep;
