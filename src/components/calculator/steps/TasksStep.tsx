
import { motion } from "framer-motion";
import { TasksStepProps } from "@/types/calculator-steps";
import ConfigurationOptions from "../ConfigurationOptions";
import ExtensionSelector from "../ExtensionSelector";
import RevenueShareStep from "./RevenueShareStep";
import AdditionalFeatures from "../AdditionalFeatures";
import { useState } from "react";
import { ecommerceExtensions } from "@/data/ecommerceExtensions";
import { 
  SupportLevel,
  SecurityFeature,
  MarketingFeature,
  PerformanceFeature,
  Documentation
} from "@/types/calculator-new-features";

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

  const [additionalFeatures, setAdditionalFeatures] = useState({
    support: 'standard' as SupportLevel,
    security: [] as SecurityFeature[],
    marketing: [] as MarketingFeature[],
    performance: [] as PerformanceFeature[],
    documentation: {
      technical: true,
      userGuide: true,
      training: false
    } as Documentation
  });

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

  const handleAdditionalFeaturesChange = (features: {
    support: SupportLevel;
    security: SecurityFeature[];
    marketing: MarketingFeature[];
    performance: PerformanceFeature[];
    documentation: Documentation;
  }) => {
    setAdditionalFeatures(features);
    // Aqui você pode adicionar a lógica para atualizar o preço total
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
        <h3 className="text-xl font-semibold mb-4">Recursos Adicionais</h3>
        <AdditionalFeatures onFeaturesChange={handleAdditionalFeaturesChange} />
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
