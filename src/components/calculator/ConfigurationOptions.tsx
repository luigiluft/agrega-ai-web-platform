
import React, { useState } from 'react';
import { Plan } from "@/types/calculator-types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

const crmOptions = [
  {
    id: "salesforce",
    name: "Salesforce",
    image: "https://www.salesforce.com/news/wp-content/uploads/sites/3/2021/05/Salesforce-logo.jpg",
  },
  {
    id: "hubspot",
    name: "HubSpot",
    image: "https://www.hubspot.com/hubfs/HubSpot_Logos/HubSpot-Logos-Full-Color.png",
  },
  {
    id: "rdstation",
    name: "RD Station",
    image: "https://rdstation.com/blog/wp-content/uploads/2019/10/rd-station-logo.png",
  },
  {
    id: "pipedrive",
    name: "Pipedrive",
    image: "https://www.pipedrive.com/en/brand/logo",
  },
  {
    id: "outro",
    name: "Outro CRM",
    image: null,
  },
];

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
  const [selectedCRM, setSelectedCRM] = useState<string | null>(null);
  const [customCRMName, setCustomCRMName] = useState('');
  const [selectedERP, setSelectedERP] = useState<string | null>(null);

  const handlePOHoursChange = (value: number[]) => {
    const hours = value[0];
    setPOHours(hours);
    updateConfiguration();
  };

  const handleThemeChange = (checked: boolean) => {
    setCustomTheme(checked);
    updateConfiguration();
  };

  const handleCRMSelect = (crmId: string) => {
    setSelectedCRM(crmId);
    setHasCRM(true);
    if (crmId === 'outro') {
      setCustomCRMName('');
    } else {
      setCustomCRMName(crmOptions.find(crm => crm.id === crmId)?.name || '');
    }
    updateConfiguration();
  };

  const updateConfiguration = () => {
    onConfigurationChange({
      poHours,
      customTheme,
      hasCRM: hasCRM,
      selectedERP,
      crmName: customCRMName || selectedCRM,
    });
  };

  const poPrice = poHours * 80; // Novo valor por hora de atendimento

  return (
    <div className="space-y-6">
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
        <div className="flex justify-between mt-1 text-sm text-gray-500">
          <span>{poHours} horas</span>
          <span>R$ {poPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="custom-theme">Tema customizado (+50h)</Label>
          <Switch
            id="custom-theme"
            checked={customTheme}
            onCheckedChange={handleThemeChange}
          />
        </div>
        {customTheme && (
          <p className="text-sm text-gray-500">
            Adicional de 50 horas para personalização completa do tema
          </p>
        )}
      </div>

      <div className="space-y-4">
        <Label>Integração com CRM</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {crmOptions.map((crm) => (
            <motion.div
              key={crm.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                className={`p-4 cursor-pointer transition-all ${
                  selectedCRM === crm.id
                    ? "ring-2 ring-primary shadow-lg"
                    : "hover:shadow-md"
                }`}
                onClick={() => handleCRMSelect(crm.id)}
              >
                <div className="flex flex-col items-center gap-2">
                  {crm.image ? (
                    <img
                      src={crm.image}
                      alt={crm.name}
                      className="h-8 object-contain"
                    />
                  ) : (
                    <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-gray-500 text-xs">+</span>
                    </div>
                  )}
                  <span className="text-sm font-medium text-center">{crm.name}</span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
        
        {selectedCRM === 'outro' && (
          <div className="mt-2">
            <Input
              type="text"
              placeholder="Digite o nome do CRM"
              value={customCRMName}
              onChange={(e) => {
                setCustomCRMName(e.target.value);
                updateConfiguration();
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfigurationOptions;
