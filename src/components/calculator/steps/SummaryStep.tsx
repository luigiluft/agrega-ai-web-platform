import { motion } from "framer-motion";
import ConsoleOutput from "../ConsoleOutput";
import { SummaryStepProps } from "@/types/calculator-steps";
import { ecommerceExtensions } from "@/data/ecommerceExtensions";

const SummaryStep = ({ 
  selectedTasks, 
  selectedExtensions, 
  totalPrice,
  monthlyRevenue = "0"
}: SummaryStepProps) => {
  const maintenanceTasks = selectedTasks.filter(task => task.type === "recurring");
  const implementationTasks = selectedTasks.filter(task => task.type !== "recurring");
  
  // Calculate maintenance price (sum of maintenance tasks hours * rate)
  const HOUR_RATE = 185;
  const maintenancePrice = maintenanceTasks.reduce((acc, task) => {
    return acc + (task.hours * HOUR_RATE);
  }, 0);

  // Calculate revenue share (3% of monthly revenue)
  const REVENUE_SHARE_PERCENT = "3";
  const revenueShare = (Number(monthlyRevenue) * Number(REVENUE_SHARE_PERCENT) / 100).toString();

  // Get selected extensions details
  const selectedExtensionDetails = Array.from(selectedExtensions).map(id => 
    ecommerceExtensions.find(ext => ext.id === id)
  ).filter(Boolean);

  // Calculate total hours including extensions
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