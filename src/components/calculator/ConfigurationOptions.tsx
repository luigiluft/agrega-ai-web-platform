import React, { useState } from 'react';
import { Plan } from "@/types/calculator-types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ConfigurationOptionsProps {
  selectedPlan: Plan;
  onConfigurationChange: (config: {
    poHours: number;
    customTheme: boolean;
    hasCRM: boolean;
    selectedERP: string | null;
    crmName?: string;
  }) => void;
}

const ConfigurationOptions = ({ selectedPlan, onConfigurationChange }: ConfigurationOptionsProps) => {
  const [poHours, setPOHours] = useState(selectedPlan.basePOHours);
  const [customTheme, setCustomTheme] = useState(false);
  const [hasCRM, setHasCRM] = useState(false);
  const [crmName, setCRMName] = useState('');
  const [selectedERP, setSelectedERP] = useState<string | null>(null);

  const handlePOHoursChange = (value: number[]) => {
    const hours = value[0];
    setPOHours(hours);
    onConfigurationChange({ poHours: hours, customTheme, hasCRM, selectedERP, crmName });
  };

  const handleThemeChange = (checked: boolean) => {
    setCustomTheme(checked);
    onConfigurationChange({ poHours, customTheme: checked, hasCRM, selectedERP, crmName });
  };

  const handleCRMChange = (checked: boolean) => {
    setHasCRM(checked);
    onConfigurationChange({ poHours, customTheme, hasCRM: checked, selectedERP, crmName });
  };

  const handleCRMNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    setCRMName(name);
    onConfigurationChange({ poHours, customTheme, hasCRM, selectedERP, crmName: name });
  };

  const handleERPChange = (value: string | null) => {
    setSelectedERP(value);
    onConfigurationChange({ poHours, customTheme, hasCRM, selectedERP: value, crmName });
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="po-hours">Horas de Product Owner (PO) por mês</Label>
        <Slider
          id="po-hours"
          defaultValue={[selectedPlan.basePOHours]}
          max={32}
          step={2}
          onValueChange={handlePOHoursChange}
          className="mt-2"
        />
        <p className="text-sm text-gray-500 mt-1">
          {poHours} horas
        </p>
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="custom-theme">Tema customizado</Label>
        <Switch
          id="custom-theme"
          checked={customTheme}
          onCheckedChange={handleThemeChange}
        />
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="has-crm">Integração com CRM</Label>
        <Switch
          id="has-crm"
          checked={hasCRM}
          onCheckedChange={handleCRMChange}
        />
      </div>

      {hasCRM && (
        <div>
          <Label htmlFor="crm-name">Nome do CRM</Label>
          <Input
            type="text"
            id="crm-name"
            placeholder="Nome do CRM"
            value={crmName}
            onChange={handleCRMNameChange}
            className="mt-2"
          />
        </div>
      )}

      <div>
        <Label htmlFor="erp-select">Integração com ERP</Label>
        <Select onValueChange={handleERPChange}>
          <SelectTrigger className="mt-2 w-full">
            <SelectValue placeholder="Selecione um ERP" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="bling">Bling</SelectItem>
            <SelectItem value="tiny">Tiny ERP</SelectItem>
            <SelectItem value="omni">OMNI</SelectItem>
            <SelectItem value={null}>Nenhum</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ConfigurationOptions;
