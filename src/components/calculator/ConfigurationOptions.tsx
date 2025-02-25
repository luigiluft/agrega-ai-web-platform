
import { useState } from "react";
import { Plan } from "./PlanSelector";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Settings2, Calendar, Palette } from "lucide-react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { motion } from "framer-motion";
import { Checkbox } from "../ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

type POFrequency = 'weekly' | 'biweekly' | 'monthly' | 'hybrid';
type ERPOption = 'omie' | 'bling' | 'tiny' | null;

interface ConfigurationOptionsProps {
  selectedPlan: Plan;
  onConfigurationChange: (config: {
    poHours: number;
    customTheme: boolean;
    hasCRM: boolean;
    selectedERP: ERPOption;
  }) => void;
}

const ConfigurationOptions = ({
  selectedPlan,
  onConfigurationChange,
}: ConfigurationOptionsProps) => {
  const [poFrequency, setPoFrequency] = useState<POFrequency>('biweekly');
  const [customTheme, setCustomTheme] = useState(false);
  const [hasCRM, setHasCRM] = useState(false);
  const [selectedERP, setSelectedERP] = useState<ERPOption>(null);

  const updateConfiguration = (updates: Partial<{
    poFrequency: POFrequency;
    customTheme: boolean;
    hasCRM: boolean;
    selectedERP: ERPOption;
  }>) => {
    const newFrequency = updates.poFrequency ?? poFrequency;
    const newConfig = {
      poHours: calculatePoHours(newFrequency),
      firstMonthPoHours: getFirstMonthPoHours(newFrequency),
      customTheme: updates.customTheme ?? customTheme,
      hasCRM: updates.hasCRM ?? hasCRM,
      selectedERP: updates.selectedERP ?? selectedERP,
    };
    
    onConfigurationChange(newConfig);
  };

  const calculatePoHours = (frequency: POFrequency) => {
    switch (frequency) {
      case 'weekly': return 4;
      case 'biweekly': return 2;
      case 'monthly': return 1;
      case 'hybrid': return 2;
      default: return 2;
    }
  };

  const getFirstMonthPoHours = (frequency: POFrequency) => {
    return frequency === 'hybrid' ? 6 : calculatePoHours(frequency);
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
          {/* PO Frequency Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              <Label className="text-lg font-medium">Frequência de Reuniões com o Nosso Time</Label>
            </div>
            <RadioGroup
              defaultValue="biweekly"
              onValueChange={(value) => {
                setPoFrequency(value as POFrequency);
                updateConfiguration({ poFrequency: value as POFrequency });
              }}
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
          </div>

          {/* Theme Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Palette className="w-5 h-5 text-primary" />
              <Label className="text-lg font-medium">Tema</Label>
            </div>
            <RadioGroup
              defaultValue="standard"
              onValueChange={(value) => {
                const isCustom = value === 'custom';
                setCustomTheme(isCustom);
                updateConfiguration({ customTheme: isCustom });
              }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {[
                { value: 'standard', label: 'Tema Padrão', hours: '2h' },
                { value: 'custom', label: 'Tema Personalizado', hours: '50h' }
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

          {/* Integrations Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Label className="text-lg font-medium">Integrações</Label>
            </div>

            {/* CRM Integration */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="crm"
                checked={hasCRM}
                onCheckedChange={(checked) => {
                  setHasCRM(checked as boolean);
                  updateConfiguration({ hasCRM: checked as boolean });
                }}
              />
              <label
                htmlFor="crm"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Integração com CRM
              </label>
            </div>

            {/* ERP Integration */}
            <div className="space-y-2">
              <Label>ERP</Label>
              <Select
                value={selectedERP || ""}
                onValueChange={(value) => {
                  setSelectedERP(value as ERPOption);
                  updateConfiguration({ selectedERP: value as ERPOption });
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione um ERP" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="omie">
                    <div className="flex items-center gap-2">
                      <img src="/lovable-uploads/2dbe71b6-85c4-47f0-a5a8-8e14a59cd1b0.png" alt="Omie" className="h-6" />
                      Omie
                    </div>
                  </SelectItem>
                  <SelectItem value="bling">
                    <div className="flex items-center gap-2">
                      <img src="/lovable-uploads/40bf9c1d-1e96-40c7-aa9f-37dd7e113858.png" alt="Bling" className="h-6" />
                      Bling
                    </div>
                  </SelectItem>
                  <SelectItem value="tiny">
                    <div className="flex items-center gap-2">
                      <img src="/lovable-uploads/2735e670-a85d-45f9-ac3b-2aa7605c25ca.png" alt="Tiny" className="h-6" />
                      Tiny
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ConfigurationOptions;
