
import { useState } from "react";
import { Plan } from "@/types/calculator-types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

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

const crmOptions = [
  {
    id: "hubspot",
    name: "HubSpot",
    description: "Integração com HubSpot CRM"
  },
  {
    id: "rdstation",
    name: "RD Station",
    description: "Integração com RD Station CRM"
  },
  {
    id: "pipedrive",
    name: "Pipedrive",
    description: "Integração com Pipedrive CRM"
  }
];

const ConfigurationOptions = ({
  selectedPlan,
  onConfigurationChange
}: ConfigurationOptionsProps) => {
  const [poHours, setPOHours] = useState(selectedPlan.basePOHours);
  const [customTheme, setCustomTheme] = useState(false);
  const [hasCRM, setHasCRM] = useState(false);
  const [selectedCRM, setSelectedCRM] = useState<string>("");

  const handlePOChange = (value: string) => {
    const hours = parseInt(value);
    setPOHours(hours);
    updateConfiguration(hours, customTheme, hasCRM, selectedCRM);
  };

  const handleThemeChange = (checked: boolean) => {
    setCustomTheme(checked);
    updateConfiguration(poHours, checked, hasCRM, selectedCRM);
  };

  const handleCRMChange = (checked: boolean) => {
    setHasCRM(checked);
    if (!checked) {
      setSelectedCRM("");
    }
    updateConfiguration(poHours, customTheme, checked, checked ? selectedCRM : "");
  };

  const handleCRMSelect = (value: string) => {
    setSelectedCRM(value);
    updateConfiguration(poHours, customTheme, hasCRM, value);
  };

  const updateConfiguration = (
    hours: number,
    theme: boolean,
    crm: boolean,
    crmName: string
  ) => {
    onConfigurationChange({
      poHours: hours,
      customTheme: theme,
      hasCRM: crm,
      selectedERP: null,
      crmName: crmName
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex flex-col space-y-2">
          <Label htmlFor="po-hours">Horas de Product Owner por mês</Label>
          <Select onValueChange={handlePOChange} defaultValue={String(poHours)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione as horas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="4">4 horas/mês</SelectItem>
              <SelectItem value="8">8 horas/mês</SelectItem>
              <SelectItem value="16">16 horas/mês</SelectItem>
              <SelectItem value="32">32 horas/mês</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="custom-theme"
            checked={customTheme}
            onCheckedChange={handleThemeChange}
          />
          <Label htmlFor="custom-theme">Tema personalizado (+50h)</Label>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="crm-integration"
              checked={hasCRM}
              onCheckedChange={handleCRMChange}
            />
            <Label htmlFor="crm-integration">Integração com CRM (+8h)</Label>
          </div>

          {hasCRM && (
            <Select onValueChange={handleCRMSelect} value={selectedCRM}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione o CRM" />
              </SelectTrigger>
              <SelectContent>
                {crmOptions.map((crm) => (
                  <SelectItem key={crm.id} value={crm.id}>
                    {crm.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfigurationOptions;
