import { motion } from "framer-motion";
import ConsoleOutput from "../ConsoleOutput";
import { SummaryStepProps } from "@/types/calculator-steps";

const SummaryStep = ({ selectedTasks, selectedExtensions, totalPrice }: SummaryStepProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
        Resumo do projeto
      </h2>
      <ConsoleOutput
        implementationTasks={selectedTasks.filter(task => task.type !== "recurring")}
        maintenanceTasks={selectedTasks.filter(task => task.type === "recurring")}
        implementationPrice={totalPrice.toString()}
        maintenancePrice="0"
        revenueShare="0"
        revenueSharePercent="0"
        totalHours={selectedTasks.reduce((acc, task) => acc + task.hours, 0)}
      />
    </div>
  );
};

export default SummaryStep;