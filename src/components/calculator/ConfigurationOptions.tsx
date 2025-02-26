
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Clock } from "lucide-react";

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
    image: "/lovable-uploads/b1910f66-63c7-4505-a6fd-295bb3b1d219.png"
  },
  {
    id: "rdstation",
    name: "RD Station",
    description: "Integração com RD Station CRM",
    image: "/lovable-uploads/ac5f6e35-0177-479e-a49d-edec43580ebe.png"
  },
  {
    id: "pipedrive",
    name: "Pipedrive",
    description: "Integração com Pipedrive CRM",
    image: "/lovable-uploads/53cf28a0-7d18-4838-8723-92f2ed91b3ad.png"
  }
];

const poHourOptions = [
  {
    value: "4",
    label: "4 horas/mês",
    description: "1 reunião mensal de alinhamento + pequenas alterações",
  },
  {
    value: "8",
    label: "8 horas/mês",
    description: "2 reuniões mensais + implementação de melhorias",
  },
  {
    value: "16",
    label: "16 horas/mês",
    description: "Reuniões semanais + desenvolvimento contínuo",
  },
  {
    value: "32",
    label: "32 horas/mês",
    description: "Dedicação parcial + desenvolvimento avançado",
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
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            <Label className="text-lg font-medium">Suporte mensal do Product Owner</Label>
          </div>
          <p className="text-sm text-muted-foreground">
            Selecione a quantidade de horas mensais para reuniões de alinhamento e implementação de melhorias no site
          </p>
          <RadioGroup
            defaultValue={String(poHours)}
            onValueChange={handlePOChange}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {poHourOptions.map((option) => (
              <div key={option.value}>
                <RadioGroupItem
                  value={option.value}
                  id={`po-hours-${option.value}`}
                  className="peer sr-only"
                />
                <Label
                  htmlFor={`po-hours-${option.value}`}
                  className="flex flex-col h-full p-4 border rounded-lg cursor-pointer hover:bg-accent peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                >
                  <span className="font-semibold">{option.label}</span>
                  <span className="text-sm text-muted-foreground">
                    {option.description}
                  </span>
                </Label>
              </div>
            ))}
          </RadioGroup>
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
