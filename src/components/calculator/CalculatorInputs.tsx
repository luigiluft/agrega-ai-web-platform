import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import HoursSlider from "./HoursSlider";

type CalculatorInputsProps = {
  customLayoutHours: string;
  setCustomLayoutHours: (value: string) => void;
  customMaintenanceHours: string;
  setCustomMaintenanceHours: (value: string) => void;
  customMeetingHours: string;
  setCustomMeetingHours: (value: string) => void;
  customCampaignHours: string;
  setCustomCampaignHours: (value: string) => void;
  customFunctionalityHours: string;
  setCustomFunctionalityHours: (value: string) => void;
  monthlyRevenue: string;
  setMonthlyRevenue: (value: string) => void;
  selectedPlan: any;
  defaultPlans: any[];
  onPlanChange: (plan: any) => void;
};

const CalculatorInputs = ({
  customLayoutHours,
  setCustomLayoutHours,
  customMaintenanceHours,
  setCustomMaintenanceHours,
  customMeetingHours,
  setCustomMeetingHours,
  customCampaignHours,
  setCustomCampaignHours,
  customFunctionalityHours,
  setCustomFunctionalityHours,
  monthlyRevenue,
  setMonthlyRevenue,
  selectedPlan,
  defaultPlans,
  onPlanChange,
}: CalculatorInputsProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Plano Base</Label>
        <div className="grid grid-cols-3 gap-2">
          {defaultPlans.map((plan) => (
            <Button
              key={plan.name}
              variant={selectedPlan.name === plan.name ? "default" : "outline"}
              onClick={() => onPlanChange(plan)}
            >
              {plan.name}
            </Button>
          ))}
        </div>
      </div>

      <HoursSlider
        label="Horas para Personalização de Layout"
        value={parseInt(customLayoutHours) || 0}
        onChange={(value) => setCustomLayoutHours(value.toString())}
      />

      <HoursSlider
        label="Horas para Implementação de Funcionalidades"
        value={parseInt(customFunctionalityHours) || 0}
        onChange={(value) => setCustomFunctionalityHours(value.toString())}
        max={200}
      />

      <HoursSlider
        label="Horas para Manutenção Mensal"
        value={parseInt(customMaintenanceHours) || 0}
        onChange={(value) => setCustomMaintenanceHours(value.toString())}
      />

      <HoursSlider
        label="Horas para Reuniões de Alinhamento"
        value={parseInt(customMeetingHours) || 0}
        onChange={(value) => setCustomMeetingHours(value.toString())}
        max={50}
      />

      <HoursSlider
        label="Horas para Implementação de Campanhas"
        value={parseInt(customCampaignHours) || 0}
        onChange={(value) => setCustomCampaignHours(value.toString())}
      />

      <div className="space-y-2">
        <Label>Faturamento Mensal Estimado (R$)</Label>
        <Input
          type="number"
          value={monthlyRevenue}
          onChange={(e) => setMonthlyRevenue(e.target.value)}
          min="0"
          step="1000"
        />
      </div>
    </div>
  );
};

export default CalculatorInputs;