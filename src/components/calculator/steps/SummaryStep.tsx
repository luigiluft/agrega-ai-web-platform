import { motion } from "framer-motion";
import ConsoleOutput from "../ConsoleOutput";

const SummaryStep = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
        Resumo do projeto
      </h2>
      <ConsoleOutput
        implementationTasks={[]}
        maintenanceTasks={[]}
        implementationPrice="0"
        maintenancePrice="0"
        revenueShare="0"
        revenueSharePercent="0"
        totalHours={0}
      />
    </div>
  );
};

export default SummaryStep;