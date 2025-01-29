import { useState } from "react";
import { Plan } from "./PlanSelector";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Minus, Plus, Settings2, Calendar, Palette, Network } from "lucide-react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { motion } from "framer-motion";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";

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
        return 2;
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
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <Card className="p-6 bg-gradient-to-br from-white to-gray-50">
        <div className="flex items-center gap-3 mb-6">
          <Settings2 className="w-6 h-6 text-primary" />
          <h3 className="text-xl font-semibold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Configurações do Projeto
          </h3>
        </div>
        
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              <Label className="text-lg font-medium">Frequência de Reuniões com o Nosso Time</Label>
            </div>
            <RadioGroup
              defaultValue="biweekly"
              onValueChange={(value) => handlePoFrequencyChange(value as POFrequency)}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {[
                { value: 'weekly', label: '1x por semana', desc: '4 reuniões/mês' },
                { value: 'biweekly', label: '1x por quinzena', desc: '2 reuniões/mês' },
                { value: 'monthly', label: '1x por mês', desc: '1 reunião/mês' },
                { value: 'hybrid', label: 'Híbrido', desc: '1º mês semanal, depois quinzenal' }
              ].map((option) => (
                <div
                  key={option.value}
                  className={`relative flex items-center space-x-2 rounded-lg border p-4 transition-colors
                    ${poFrequency === option.value ? 'border-primary bg-primary/5' : 'hover:border-primary/50'}`}
                >
                  <RadioGroupItem value={option.value} id={option.value} />
                  <div className="flex-1">
                    <Label htmlFor={option.value} className="font-medium">{option.label}</Label>
                    <p className="text-sm text-gray-500">{option.desc}</p>
                  </div>
                </div>
              ))}
            </RadioGroup>
            <Badge variant="secondary" className="ml-6">
              {poFrequency === 'hybrid' 
                ? `1º mês: ${getFirstMonthPoHours(poFrequency)}h, Depois: ${calculatePoHours(poFrequency)}h/mês`
                : `${calculatePoHours(poFrequency)}h/mês`
              }
            </Badge>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Palette className="w-5 h-5 text-primary" />
              <Label className="text-lg font-medium">Tema</Label>
            </div>
            <RadioGroup
              defaultValue="standard"
              onValueChange={handleThemeChange}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {[
                { value: 'standard', label: 'Tema Padrão', hours: '2h' },
                { value: 'custom', label: 'Tema Personalizado', hours: '20h' }
              ].map((option) => (
                <div
                  key={option.value}
                  className={`relative flex items-center space-x-2 rounded-lg border p-4 transition-colors
                    ${(option.value === 'custom' ? customTheme : !customTheme) ? 'border-primary bg-primary/5' : 'hover:border-primary/50'}`}
                >
                  <RadioGroupItem value={option.value} id={`theme-${option.value}`} />
                  <div className="flex-1">
                    <Label htmlFor={`theme-${option.value}`} className="font-medium">{option.label}</Label>
                    <p className="text-sm text-gray-500">Estimativa: {option.hours}</p>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Network className="w-5 h-5 text-primary" />
              <Label className="text-lg font-medium">Número de Integrações</Label>
            </div>
            <HoverCard>
              <HoverCardTrigger>
                <div className="flex items-center gap-4 p-4 border rounded-lg hover:border-primary/50 transition-colors">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleIntegrationCountChange(false)}
                    disabled={integrationCount <= 1}
                    className="h-8 w-8"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="font-medium text-lg min-w-[2ch] text-center">{integrationCount}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleIntegrationCountChange(true)}
                    disabled={integrationCount >= selectedPlan.maxIntegrations}
                    className="h-8 w-8"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Badge variant="secondary" className="ml-2">
                    Máx: {selectedPlan.maxIntegrations}
                  </Badge>
                </div>
              </HoverCardTrigger>
              <HoverCardContent>
                <p className="text-sm">
                  Selecione o número de integrações que seu projeto necessita.
                  Cada integração adiciona aproximadamente 8 horas ao projeto.
                </p>
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ConfigurationOptions;