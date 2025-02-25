import { useEffect, useState } from "react";
import { Plan } from "@/types/calculator-types";
import { Task } from "@/types/calculator-types";
import TaskCategorySection from "./TaskCategorySection";
import { PricingResult } from "./pricing/PricingLogic";

interface PlanContentProps {
  selectedPlan: Plan;
  selectedTasks: Task[];
  selectedExtensions: Set<string>;
  onTasksChange: (tasks: Task[]) => void;
  onExtensionToggle: (extensionId: string, checked: boolean) => void;
  prices: PricingResult;
  monthlyRevenue: string;
  averageTicket: string;
  monthlyOrders: string;
  setMonthlyRevenue: (value: string) => void;
  setAverageTicket: (value: string) => void;
  setMonthlyOrders: (value: string) => void;
}

const PlanContent = ({
  selectedPlan,
  selectedTasks,
  selectedExtensions,
  onTasksChange,
  onExtensionToggle,
  prices,
  monthlyRevenue,
  averageTicket,
  monthlyOrders,
  setMonthlyRevenue,
  setAverageTicket,
  setMonthlyOrders,
}: PlanContentProps) => {
  return (
    <div className="space-y-8">
      <TaskCategorySection
        selectedPlan={selectedPlan}
        selectedTasks={selectedTasks}
        onTasksChange={onTasksChange}
        selectedExtensions={selectedExtensions}
        onExtensionToggle={onExtensionToggle}
        prices={prices}
      />
    </div>
  );
};

export default PlanContent;
