import { useState } from "react";
import { Plan } from "./PlanSelector";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Minus, Plus } from "lucide-react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";

type POFrequency = 'weekly' | 'biweekly' | 'monthly' | 'hybrid';

interface ConfigurationOptionsProps {
  selectedPlan: Plan;
  onConfigurationChange: (config: {
    poHours: number;
    customTheme: boolean;
    integrationCount: number;
    firstMonthPoHours?: number;
  }) => void;
}

const ConfigurationOptions = ({
  selectedPlan,
  onConfigurationChange,
}: ConfigurationOptionsProps) => {
  const [poFrequency, setPoFrequency] = useState<POFrequency>('biweekly');
  const [customTheme, setCustomTheme] = useState(false);
  const [integrationCount, setIntegrationCount] = useState(1);

  const calculatePoHours = (frequency: POFrequency) => {
    switch (frequency) {
      case 'weekly':
        return 4;
      case 'biweekly':
        return 2;
      case 'monthly':
        return 1;
      case 'hybrid':
        return 2; // Regular months after first month
      default:
        return 2;
    }
  };

  const getFirstMonthPoHours = (frequency: POFrequency) => {
    return frequency === 'hybrid' ? 6 : calculatePoHours(frequency);
  };

  const updateConfiguration = (updates: Partial<{
    poFrequency: POFrequency;
    customTheme: boolean;
    integrationCount: number;
  }>) => {
    const newFrequency = updates.poFrequency ?? poFrequency;
    const newConfig = {
      poHours: calculatePoHours(newFrequency),
      firstMonthPoHours: getFirstMonthPoHours(newFrequency),
      customTheme: updates.customTheme ?? customTheme,
      integrationCount: updates.integrationCount ?? integrationCount,
    };
    
    onConfigurationChange(newConfig);
  };

  const handlePoFrequencyChange = (value: POFrequency) => {
    setPoFrequency(value);
    updateConfiguration({ poFrequency: value });
  };

  const handleThemeChange = (value: string) => {
    const isCustom = value === 'custom';
    setCustomTheme(isCustom);
    updateConfiguration({ customTheme: isCustom });
  };

  const handleIntegrationCountChange = (increment: boolean) => {
    const newCount = increment 
      ? Math.min(selectedPlan.maxIntegrations, integrationCount + 1)
      : Math.max(1, integrationCount - 1);
    setIntegrationCount(newCount);
    updateConfiguration({ integrationCount: newCount });
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Configurações do Projeto</h3>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Frequência de Reuniões com o Nosso Time</Label>
            <RadioGroup
              defaultValue="biweekly"
              onValueChange={(value) => handlePoFrequencyChange(value as POFrequency)}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="weekly" id="weekly" />
                <Label htmlFor="weekly">1x por semana (4h/mês)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="biweekly" id="biweekly" />
                <Label htmlFor="biweekly">1x por quinzena (2h/mês)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="monthly" id="monthly" />
                <Label htmlFor="monthly">1x por mês (1h/mês)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="hybrid" id="hybrid" />
                <Label htmlFor="hybrid">1º mês semanal, depois quinzenal (6h 1º mês, 2h/mês depois)</Label>
              </div>
            </RadioGroup>
            <div className="mt-2">
              <Badge variant="secondary">
                {poFrequency === 'hybrid' 
                  ? `1º mês: ${getFirstMonthPoHours(poFrequency)}h, Depois: ${calculatePoHours(poFrequency)}h/mês`
                  : `${calculatePoHours(poFrequency)}h/mês`
                }
              </Badge>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Tema</Label>
            <RadioGroup
              defaultValue="standard"
              onValueChange={handleThemeChange}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="standard" id="standard" />
                <Label htmlFor="standard">Tema Padrão (2h)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="custom" id="custom" />
                <Label htmlFor="custom">Tema Personalizado (20h)</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Número de Integrações</Label>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleIntegrationCountChange(false)}
                disabled={integrationCount <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="font-medium">{integrationCount}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleIntegrationCountChange(true)}
                disabled={integrationCount >= selectedPlan.maxIntegrations}
              >
                <Plus className="h-4 w-4" />
              </Button>
              <Badge variant="secondary">
                Máx: {selectedPlan.maxIntegrations}
              </Badge>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ConfigurationOptions;