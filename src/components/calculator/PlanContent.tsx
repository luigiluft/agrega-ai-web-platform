import { motion } from "framer-motion";
import { Plan } from "./PlanSelector";
import TaskCategorySection from "./TaskCategorySection";
import RevenueShareStep from "./steps/RevenueShareStep";
import ConsoleOutput from "./ConsoleOutput";
import { PricingResult } from "./pricing/PricingLogic";
import { Task } from "@/types/calculator-types";
import { Button } from "../ui/button";
import { Mail, PhoneCall } from "lucide-react";

interface PlanContentProps {
  selectedPlan: Plan | null;
  selectedTasks: Task[];
  selectedExtensions: Set<string>;
  monthlyRevenue: string;
  averageTicket: string;
  monthlyOrders: string;
  prices: PricingResult;
  onTasksChange: (tasks: Task[]) => void;
  onExtensionToggle: (extensionId: string, checked: boolean) => void;
  setMonthlyRevenue: (value: string) => void;
  setAverageTicket: (value: string) => void;
  setMonthlyOrders: (value: string) => void;
  onContactClick: () => void;
  setSelectedPlan: (plan: Plan | null) => void;
}

const PlanContent = ({
  selectedPlan,
  selectedTasks,
  selectedExtensions,
  monthlyRevenue,
  averageTicket,
  monthlyOrders,
  prices,
  onTasksChange,
  onExtensionToggle,
  setMonthlyRevenue,
  setAverageTicket,
  setMonthlyOrders,
  onContactClick,
  setSelectedPlan,
}: PlanContentProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-8"
    >
      <div className="space-y-6">
        <TaskCategorySection
          onTasksChange={onTasksChange}
          selectedExtensions={selectedExtensions}
          onExtensionToggle={onExtensionToggle}
          prices={prices}
          selectedPlan={selectedPlan}
        />
        
        <RevenueShareStep
          monthlyRevenue={monthlyRevenue}
          setMonthlyRevenue={setMonthlyRevenue}
          averageTicket={averageTicket}
          setAverageTicket={setAverageTicket}
          monthlyOrders={monthlyOrders}
          setMonthlyOrders={setMonthlyOrders}
        />
      </div>
      
      <div className="space-y-6">
        <ConsoleOutput
          implementationTasks={prices.implementationTasks}
          maintenanceTasks={prices.maintenanceTasks}
          implementationPrice={prices.implementationPrice}
          maintenancePrice={prices.maintenancePrice}
          revenueShare={prices.revenueShare}
          revenueSharePercent={prices.revenueSharePercent}
          totalHours={prices.totalHours}
          selectedPlan={selectedPlan}
          onPlanSelect={setSelectedPlan}
        />

        <div className="grid grid-cols-2 gap-4">
          <Button 
            variant="outline"
            className="w-full space-x-2"
            onClick={onContactClick}
          >
            <Mail className="w-4 h-4" />
            <span>Receber por Email</span>
          </Button>
          
          <Button 
            variant="default"
            className="w-full space-x-2"
            onClick={onContactClick}
          >
            <PhoneCall className="w-4 h-4" />
            <span>Falar com Consultor</span>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default PlanContent;