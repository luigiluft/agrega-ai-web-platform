import { motion } from "framer-motion";
import ConsoleOutput from "../ConsoleOutput";
import { SummaryStepProps } from "@/types/calculator-steps";
import { ecommerceExtensions } from "@/data/ecommerceExtensions";
import MaintenancePricing, { calculateMaintenancePrice } from "../pricing/MaintenancePricing";
import RevenueSharePricing, { calculateRevenueShare } from "../pricing/RevenueSharePricing";

const SummaryStep = ({ 
  selectedTasks, 
  selectedExtensions, 
  totalPrice,
  monthlyRevenue = "0"
}: SummaryStepProps) => {
  const maintenanceTasks = selectedTasks.filter(task => task.type === "recurring");
  const implementationTasks = selectedTasks.filter(task => task.type !== "recurring");
  
  const HOUR_RATE = 185;
  const maintenancePrice = calculateMaintenancePrice(maintenanceTasks, HOUR_RATE);
  const REVENUE_SHARE_PERCENT = "3";
  const revenueShare = calculateRevenueShare(monthlyRevenue, REVENUE_SHARE_PERCENT);

  const selectedExtensionDetails = Array.from(selectedExtensions).map(id => 
    ecommerceExtensions.find(ext => ext.id === id)
  ).filter(Boolean);

  const totalHours = selectedTasks.reduce((acc, task) => acc + task.hours, 0) +
    selectedExtensionDetails.reduce((acc, ext) => acc + (ext?.implementationHours || 0), 0);

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
        Resumo do projeto
      </h2>
      <ConsoleOutput
        implementationTasks={implementationTasks}
        maintenanceTasks={maintenanceTasks}
        implementationPrice={totalPrice.toString()}
        maintenancePrice={maintenancePrice.toString()}
        revenueShare={revenueShare}
        revenueSharePercent={REVENUE_SHARE_PERCENT}
        totalHours={totalHours}
      />
    </div>
  );
};

export default SummaryStep;