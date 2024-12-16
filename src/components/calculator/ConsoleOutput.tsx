import { motion } from "framer-motion";
import { Card } from "../ui/card";
import { Task } from "@/types/calculator-types";
import { Badge } from "../ui/badge";
import { Calculator, Clock, DollarSign, Percent } from "lucide-react";

interface ConsoleOutputProps {
  implementationTasks: Task[];
  maintenanceTasks: Task[];
  implementationPrice: string;
  maintenancePrice: string;
  revenueShare: string;
  revenueSharePercent: string;
  totalHours: number;
}

const ConsoleOutput = ({
  implementationTasks,
  maintenanceTasks,
  implementationPrice,
  maintenancePrice,
  revenueShare,
  revenueSharePercent,
  totalHours,
}: ConsoleOutputProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-4 space-y-4"
    >
      <Card className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Resumo do Orçamento</h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-white/5">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-4 h-4 text-primary" />
                <span className="text-sm text-gray-300">Implementação</span>
              </div>
              <p className="text-2xl font-bold">R$ {implementationPrice}</p>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-4 h-4 text-primary" />
                <span className="text-sm text-gray-300">Mensalidade</span>
              </div>
              <p className="text-2xl font-bold">R$ {maintenancePrice}</p>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <div className="flex items-center gap-2 mb-2">
                <Percent className="w-4 h-4 text-primary" />
                <span className="text-sm text-gray-300">Revenue Share</span>
              </div>
              <p className="text-2xl font-bold">{revenueSharePercent}%</p>
              <p className="text-sm text-gray-400">R$ {revenueShare}/mês</p>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-sm text-gray-300">Horas Totais</span>
              </div>
              <p className="text-2xl font-bold">{totalHours}h</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-300">Tarefas de Implementação</h4>
              <div className="flex flex-wrap gap-2">
                {implementationTasks.map((task) => (
                  <Badge
                    key={task.id}
                    variant="secondary"
                    className="bg-white/10 text-white hover:bg-white/20"
                  >
                    {task.name} ({task.hours}h)
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-300">Tarefas de Manutenção</h4>
              <div className="flex flex-wrap gap-2">
                {maintenanceTasks.map((task) => (
                  <Badge
                    key={task.id}
                    variant="secondary"
                    className="bg-white/10 text-white hover:bg-white/20"
                  >
                    {task.name} ({task.hours}h)
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ConsoleOutput;