
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
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

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
    description: "Integração com HubSpot CRM",
    image: "/lovable-uploads/b507c896-698a-4cde-968a-925f5288b4be.png"
  },
  {
    id: "rdstation",
    name: "RD Station",
    description: "Integração com RD Station CRM",
    image: "/lovable-uploads/d588d50d-ae20-4d85-bdc9-eda09646e347.png"
  },
  {
    id: "pipedrive",
    name: "Pipedrive",
    description: "Integração com Pipedrive CRM",
    image: "/lovable-uploads/73f995a5-6a9f-4274-8593-e4fec168a2d4.png"
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

  const handleCRMSelect = (crmId: string) => {
    const newSelectedCRM = selectedCRM === crmId ? "" : crmId;
    setSelectedCRM(newSelectedCRM);
    const hasSelectedCRM = newSelectedCRM !== "";
    setHasCRM(hasSelectedCRM);
    updateConfiguration(poHours, customTheme, hasSelectedCRM, newSelectedCRM);
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
          <div className="space-y-2">
            <Label>Integração com CRM (+8h)</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {crmOptions.map((crm) => (
                <Card
                  key={crm.id}
                  className={cn(
                    "p-4 cursor-pointer transition-all hover:shadow-md",
                    selectedCRM === crm.id && "ring-2 ring-primary shadow-lg"
                  )}
                  onClick={() => handleCRMSelect(crm.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 flex items-center justify-center">
                      <img
                        src={crm.image}
                        alt={crm.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold">{crm.name}</h4>
                      <p className="text-sm text-gray-600">{crm.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigurationOptions;
