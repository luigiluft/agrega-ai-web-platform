import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

type CalculatorInputsProps = {
  hourlyRate: string;
  setHourlyRate: (value: string) => void;
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
  hourlyRate,
  setHourlyRate,
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
    <div className="space-y-4">
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

      <div className="space-y-2">
        <Label>Valor Hora (R$)</Label>
        <Input
          type="number"
          value={hourlyRate}
          onChange={(e) => setHourlyRate(e.target.value)}
          min="0"
          step="10"
        />
      </div>

      <div className="space-y-2">
        <Label>Horas para Personalização de Layout</Label>
        <Input
          type="number"
          value={customLayoutHours}
          onChange={(e) => setCustomLayoutHours(e.target.value)}
          min="0"
          step="1"
        />
      </div>

      <div className="space-y-2">
        <Label>Horas para Implementação de Funcionalidades</Label>
        <Input
          type="number"
          value={customFunctionalityHours}
          onChange={(e) => setCustomFunctionalityHours(e.target.value)}
          min="0"
          step="1"
        />
      </div>

      <div className="space-y-2">
        <Label>Horas para Manutenção Mensal</Label>
        <Input
          type="number"
          value={customMaintenanceHours}
          onChange={(e) => setCustomMaintenanceHours(e.target.value)}
          min="0"
          step="1"
        />
      </div>

      <div className="space-y-2">
        <Label>Horas para Reuniões de Alinhamento</Label>
        <Input
          type="number"
          value={customMeetingHours}
          onChange={(e) => setCustomMeetingHours(e.target.value)}
          min="0"
          step="1"
        />
      </div>

      <div className="space-y-2">
        <Label>Horas para Implementação de Campanhas</Label>
        <Input
          type="number"
          value={customCampaignHours}
          onChange={(e) => setCustomCampaignHours(e.target.value)}
          min="0"
          step="1"
        />
      </div>

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