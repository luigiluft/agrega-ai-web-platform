
import { Plan } from "@/types/calculator-types";

export const useAnnualPlan = (
  totalPrice: number,
  poHours: number | undefined,
  selectedPlan: Plan | null,
  onPlanSelect: (plan: Plan) => void
) => {
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
};
