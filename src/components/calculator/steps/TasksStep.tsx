
import { motion } from "framer-motion";
import { TasksStepProps } from "@/types/calculator-steps";
import ConfigurationOptions from "../ConfigurationOptions";
import ExtensionSelector from "../ExtensionSelector";
import RevenueShareStep from "./RevenueShareStep";
import { useState } from "react";
import { ecommerceExtensions } from "@/data/ecommerceExtensions";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { 
  SupportLevel,
  SecurityFeature,
  MarketingFeature,
  PerformanceFeature,
  Documentation
} from "@/types/calculator-new-features";

const erpOptions = [
  {
    id: "bling",
    name: "Bling",
    description: "Integração completa com Bling ERP",
    image: "/lovable-uploads/127f1152-e8da-4bef-b098-3d5a01fc61a5.png",
    price: 2400,
    implementationHours: 24,
    maintenanceHours: 4
  },
  {
    id: "tiny",
    name: "Tiny",
    description: "Integração completa com Tiny ERP",
    image: "/lovable-uploads/bf82d247-a2d9-41cc-af14-4a13c149bec2.png",
    price: 2400,
    implementationHours: 24,
    maintenanceHours: 4
  }
];

const TasksStep = ({ 
  selectedPlan, 
  selectedTasks,
  onTasksChange,
  selectedExtensions,
  onExtensionToggle,
  totalPrice,
  monthlyRevenue,
  setMonthlyRevenue,
  averageTicket,
  setAverageTicket,
  monthlyOrders,
  setMonthlyOrders
}: TasksStepProps) => {
  const [configPrice, setConfigPrice] = useState({
    implementation: selectedPlan.baseImplementationPrice,
    maintenance: selectedPlan.baseMaintenancePrice
  });

  const [selectedERP, setSelectedERP] = useState<string | null>(null);

  const handleConfigurationChange = (config: {
    poHours: number;
    customTheme: boolean;
    hasCRM: boolean;
    selectedERP: string | null;
    crmName?: string;
  }) => {
    const themeHours = config.customTheme ? 50 : 2;

    const implementationPrice = selectedPlan.baseImplementationPrice + 
      (themeHours * 200) + 
      (config.hasCRM ? 1600 : 0) + 
      (config.selectedERP ? 2400 : 0);

    const maintenancePrice = selectedPlan.baseMaintenancePrice + 
      (config.poHours * 200);

    setConfigPrice({
      implementation: implementationPrice,
      maintenance: maintenancePrice
    });
  };

  const handleERPSelect = (erpId: string) => {
    setSelectedERP(selectedERP === erpId ? null : erpId);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
        Configure seu projeto
      </h2>
      
      <ConfigurationOptions
        selectedPlan={selectedPlan}
        onConfigurationChange={handleConfigurationChange}
      />

      {selectedPlan.id === 'fullcommerce' && (
        <RevenueShareStep
          monthlyRevenue={monthlyRevenue}
          setMonthlyRevenue={setMonthlyRevenue}
          averageTicket={averageTicket}
          setAverageTicket={setAverageTicket}
          monthlyOrders={monthlyOrders}
          setMonthlyOrders={setMonthlyOrders}
        />
      )}

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Integração com ERP</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {erpOptions.map((erp) => (
            <Card
              key={erp.id}
              className={cn(
                "p-4 cursor-pointer transition-all hover:shadow-md",
                selectedERP === erp.id && "ring-2 ring-primary shadow-lg"
              )}
              onClick={() => handleERPSelect(erp.id)}
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 flex items-center justify-center">
                  <img
                    src={erp.image}
                    alt={erp.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold">{erp.name}</h4>
                  <p className="text-sm text-gray-600">{erp.description}</p>
                  <p className="text-sm font-medium text-primary mt-1">
                    R$ {erp.price.toLocaleString('pt-BR')}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Extensões Disponíveis</h3>
        <ExtensionSelector
          extensions={ecommerceExtensions}
          selectedExtensions={selectedExtensions}
          onExtensionToggle={onExtensionToggle}
        />
      </div>
    </div>
  );
};

export default TasksStep;
