import { useState } from 'react';
import { Plan } from './PlanSelector';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Minus, Plus } from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';

interface ConfigurationOptionsProps {
  selectedPlan: Plan;
  onConfigurationChange: (config: {
    poHours: number;
    customTheme: boolean;
    integrationCount: number;
  }) => void;
}

const ConfigurationOptions = ({
  selectedPlan,
  onConfigurationChange,
}: ConfigurationOptionsProps) => {
  const [poHours, setPoHours] = useState(selectedPlan.basePOHours);
  const [customTheme, setCustomTheme] = useState(false);
  const [integrationCount, setIntegrationCount] = useState(1);

  const updateConfiguration = (updates: Partial<{
    poHours: number;
    customTheme: boolean;
    integrationCount: number;
  }>) => {
    const newConfig = {
      poHours: updates.poHours ?? poHours,
      customTheme: updates.customTheme ?? customTheme,
      integrationCount: updates.integrationCount ?? integrationCount,
    };
    
    onConfigurationChange(newConfig);
  };

  const handlePoHoursChange = (increment: boolean) => {
    const newHours = increment ? poHours + 1 : Math.max(selectedPlan.basePOHours, poHours - 1);
    setPoHours(newHours);
    updateConfiguration({ poHours: newHours });
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
            <Label>Horas de Reunião com PO</Label>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePoHoursChange(false)}
                disabled={poHours <= selectedPlan.basePOHours}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="font-medium">{poHours}h/mês</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePoHoursChange(true)}
              >
                <Plus className="h-4 w-4" />
              </Button>
              <Badge variant="secondary">
                Base: {selectedPlan.basePOHours}h
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