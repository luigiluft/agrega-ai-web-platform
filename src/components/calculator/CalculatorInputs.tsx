import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import HoursSlider from "./HoursSlider";
import { Layout, Wrench, Users, Megaphone, Code } from "lucide-react";

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
      <div className="space-y-3">
        <Label className="text-lg font-semibold">Plano Base</Label>
        <div className="grid grid-cols-3 gap-2">
          {defaultPlans.map((plan) => (
            <Button
              key={plan.name}
              variant={selectedPlan.name === plan.name ? "default" : "outline"}
              onClick={() => onPlanChange(plan)}
              className="relative overflow-hidden"
            >
              {selectedPlan.name === plan.name && (
                <div className="absolute inset-0 bg-primary/10 animate-pulse" />
              )}
              {plan.name}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <HoursSlider
          label="Personalização de Layout"
          value={parseInt(customLayoutHours) || 0}
          onChange={(value) => setCustomLayoutHours(value.toString())}
          icon={<Layout className="h-4 w-4" />}
        />

        <HoursSlider
          label="Implementação de Funcionalidades"
          value={parseInt(customFunctionalityHours) || 0}
          onChange={(value) => setCustomFunctionalityHours(value.toString())}
          max={200}
          icon={<Code className="h-4 w-4" />}
        />

        <HoursSlider
          label="Manutenção Mensal"
          value={parseInt(customMaintenanceHours) || 0}
          onChange={(value) => setCustomMaintenanceHours(value.toString())}
          icon={<Wrench className="h-4 w-4" />}
        />

        <HoursSlider
          label="Reuniões de Alinhamento"
          value={parseInt(customMeetingHours) || 0}
          onChange={(value) => setCustomMeetingHours(value.toString())}
          max={50}
          icon={<Users className="h-4 w-4" />}
        />

        <HoursSlider
          label="Implementação de Campanhas"
          value={parseInt(customCampaignHours) || 0}
          onChange={(value) => setCustomCampaignHours(value.toString())}
          icon={<Megaphone className="h-4 w-4" />}
        />
      </div>

      <div className="space-y-3 p-4 rounded-lg bg-secondary/5 border border-secondary/10">
        <Label className="font-medium">Faturamento Mensal Estimado (R$)</Label>
        <Input
          type="number"
          value={monthlyRevenue}
          onChange={(e) => setMonthlyRevenue(e.target.value)}
          min="0"
          step="1000"
          className="bg-background"
        />
      </div>
    </div>
  );
};

export default CalculatorInputs;