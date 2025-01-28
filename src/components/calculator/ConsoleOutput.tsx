import { Task } from "@/types/calculator-types";
import { Card } from "../ui/card";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";

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
  const formatPrice = (price: string | number) => {
    return Number(price).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const annualRevenueSharePercent = Number(revenueSharePercent) - 1;
  const annualRevenueShare = (Number(revenueShare) * annualRevenueSharePercent / Number(revenueSharePercent)).toFixed(2);

  return (
    <Card className="p-6 space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Plano Mensal</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-baseline mb-1">
              <span className="text-sm text-gray-600">Implementação (3x)</span>
              <span className="font-semibold">
                {formatPrice(Number(implementationPrice) / 3)}/mês
              </span>
            </div>
            <div className="text-xs text-gray-500">
              Total: {formatPrice(implementationPrice)} em 3x
            </div>
          </div>
          <div>
            <div className="flex justify-between items-baseline">
              <span className="text-sm text-gray-600">Mensalidade</span>
              <span className="font-semibold">{formatPrice(maintenancePrice)}/mês</span>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-baseline">
              <span className="text-sm text-gray-600">Comissão sobre vendas</span>
              <span className="font-semibold">{revenueSharePercent}%</span>
            </div>
            <div className="text-xs text-gray-500">
              Aproximadamente {formatPrice(revenueShare)}/mês
            </div>
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-semibold mb-4">Plano Anual</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-baseline mb-1">
              <span className="text-sm text-gray-600">Implementação (12x)</span>
              <span className="font-semibold">
                {formatPrice(Number(implementationPrice) / 12)}/mês
              </span>
            </div>
            <div className="text-xs text-gray-500">
              Total: {formatPrice(implementationPrice)} em 12x
            </div>
          </div>
          <div>
            <div className="flex justify-between items-baseline">
              <span className="text-sm text-gray-600">Mensalidade</span>
              <span className="font-semibold">{formatPrice(maintenancePrice)}/mês</span>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-baseline">
              <span className="text-sm text-gray-600">Comissão sobre vendas</span>
              <span className="font-semibold">{annualRevenueSharePercent}%</span>
            </div>
            <div className="text-xs text-gray-500">
              Aproximadamente {formatPrice(annualRevenueShare)}/mês
            </div>
            <div className="text-xs text-green-600 mt-1">
              Desconto de 1% na comissão para contratos anuais
            </div>
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">Escopo da Implementação</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            {implementationTasks.map((task, index) => (
              <li key={index}>{task.name} ({task.hours}h)</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-medium mb-2">Escopo da Sustentação Mensal</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            {maintenanceTasks.map((task, index) => (
              <li key={index}>{task.name} ({task.hours}h)</li>
            ))}
          </ul>
        </div>

        <div className="pt-4">
          <Badge variant="secondary">
            Total de horas: {totalHours}h
          </Badge>
        </div>
      </div>
    </Card>
  );
};

export default ConsoleOutput;