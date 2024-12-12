import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { Warehouse, Box, Package, Truck, Check } from "lucide-react";
import { addDays, format, subDays } from "date-fns";
import { ProductOperation } from "../tracking/types";
import { DateRange } from "react-day-picker";

const mockOperations = Array.from({ length: 1000 }, (_, index) => ({
  id: (index + 1).toString(),
  name: `Produto ${index + 1}`,
  status: ["em_estoque", "backlog", "separacao", "expedicao", "expedido"][
    Math.floor(Math.random() * 5)
  ],
  quantity: Math.floor(Math.random() * 1000) + 50,
  lastUpdate: format(
    subDays(new Date(), Math.floor(Math.random() * 30)),
    "dd/MM/yyyy HH:mm"
  ),
  expectedDate: format(
    addDays(new Date(), Math.floor(Math.random() * 14)),
    "dd/MM/yyyy"
  ),
}));

const OperationsDashboard = () => {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });

  const statusIcons = {
    em_estoque: Warehouse,
    backlog: Box,
    separacao: Package,
    expedicao: Truck,
    expedido: Check,
  };

  const statusColors = {
    em_estoque: "bg-blue-500",
    backlog: "bg-yellow-500",
    separacao: "bg-purple-500",
    expedicao: "bg-orange-500",
    expedido: "bg-green-500",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Operações</h2>
        <DatePickerWithRange date={dateRange} setDate={setDateRange} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {Object.entries(statusIcons).map(([status, Icon]) => (
          <Card key={status} className="p-4">
            <div className="flex items-center gap-2">
              <div className={`p-2 rounded-full ${statusColors[status]} bg-opacity-10`}>
                <Icon className={`h-5 w-5 ${statusColors[status]} text-opacity-100`} />
              </div>
              <div>
                <p className="text-sm text-gray-500">
                  {status.replace("_", " ").charAt(0).toUpperCase() + status.slice(1)}
                </p>
                <p className="text-2xl font-bold">
                  {mockOperations.filter(op => op.status === status).length}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Input
              placeholder="Buscar por nome do produto..."
              className="max-w-sm"
            />
            <Button>Exportar Relatório</Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Produto</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Quantidade</th>
                  <th className="text-left py-3 px-4">Última Atualização</th>
                  <th className="text-left py-3 px-4">Previsão</th>
                </tr>
              </thead>
              <tbody>
                {mockOperations.map((op) => (
                  <tr key={op.id} className="border-b">
                    <td className="py-3 px-4">{op.name}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {React.createElement(statusIcons[op.status], {
                          className: `h-4 w-4 ${statusColors[op.status]}`,
                        })}
                        {op.status.replace("_", " ")}
                      </div>
                    </td>
                    <td className="py-3 px-4">{op.quantity}</td>
                    <td className="py-3 px-4">{op.lastUpdate}</td>
                    <td className="py-3 px-4">{op.expectedDate || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default OperationsDashboard;
