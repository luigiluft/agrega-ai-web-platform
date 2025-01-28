import { motion } from "framer-motion";
import { Card } from "../ui/card";
import { Task } from "@/types/calculator-types";
import { Badge } from "../ui/badge";
import { Calculator, Clock, DollarSign, Percent } from "lucide-react";
import { Separator } from "../ui/separator";

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
  implementationTasks = [],
  maintenanceTasks = [],
  implementationPrice = "0",
  maintenancePrice = "0",
  revenueShare = "0",
  revenueSharePercent = "0",
  totalHours = 0,
}: ConsoleOutputProps) => {
  const formatCurrency = (value: string) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(parseFloat(value));
  };

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
              <p className="text-2xl font-bold">{formatCurrency(implementationPrice)}</p>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-4 h-4 text-primary" />
                <span className="text-sm text-gray-300">Mensalidade</span>
              </div>
              <p className="text-2xl font-bold">{formatCurrency(maintenancePrice)}</p>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <div className="flex items-center gap-2 mb-2">
                <Percent className="w-4 h-4 text-primary" />
                <span className="text-sm text-gray-300">Comissão sobre Faturamento</span>
              </div>
              <p className="text-2xl font-bold">{revenueSharePercent}%</p>
              <p className="text-sm text-gray-400">{formatCurrency(revenueShare)}/mês</p>
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
              <h4 className="text-sm font-medium text-gray-300">Escopo de Implementação</h4>
              <div className="flex flex-wrap gap-2">
                {implementationTasks?.map((task) => (
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

            <Separator className="bg-white/10" />

            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-300">Escopo de Manutenção</h4>
              <div className="flex flex-wrap gap-2">
                {maintenanceTasks?.map((task) => (
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