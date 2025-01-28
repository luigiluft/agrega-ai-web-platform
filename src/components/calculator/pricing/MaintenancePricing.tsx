import { Task } from "@/types/calculator-types";

interface MaintenancePricingProps {
  tasks: Task[];
  hourlyRate?: number;
}

export const calculateMaintenancePrice = (tasks: Task[], hourlyRate: number = 185): number => {
  return tasks.reduce((acc, task) => {
    if (task.type === "recurring") {
      return acc + (task.hours * hourlyRate);
    }
    return acc;
  }, 0);
};

const MaintenancePricing = ({ tasks, hourlyRate = 185 }: MaintenancePricingProps) => {
  const maintenancePrice = calculateMaintenancePrice(tasks, hourlyRate);
  
  return (
    <div className="p-4 rounded-lg bg-white/5">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm text-gray-300">Mensalidade</span>
      </div>
      <p className="text-2xl font-bold">
        {new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(maintenancePrice)}
      </p>
    </div>
  );
};

export default MaintenancePricing;