import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { Box, BookMinus, Package, Truck, CheckSquare } from "lucide-react";

const mockOperations = Array.from({ length: 1224 }, (_, index) => {
  // Distribute status based on provided numbers
  let status;
  if (index < 982) status = "em_estoque";
  else if (index < 989) status = "backlog";
  else if (index < 1057) status = "separacao";
  else if (index < 1107) status = "expedicao";
  else status = "expedido";

  return {
    id: (index + 1).toString().padStart(6, '0'),
    name: `Produto ${index + 1}`,
    status,
    quantity: Math.floor(Math.random() * 1000) + 50,
    lastUpdate: format(
      subDays(new Date(), Math.floor(Math.random() * 7)),
      "dd/MM/yyyy HH:mm"
    ),
    expectedDate: format(
      addDays(new Date(), Math.floor(Math.random() * 14)),
      "dd/MM/yyyy"
    ),
  };
});

const OperationsDashboard = () => {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });
  const [searchTerm, setSearchTerm] = useState("");

  const statusIcons = {
    em_estoque: Box,
    backlog: BookMinus,
    separacao: Package,
    expedicao: Truck,
    expedido: CheckSquare,
  };

  const statusColors = {
    em_estoque: "bg-blue-500",
    backlog: "bg-yellow-500",
    separacao: "bg-purple-500",
    expedicao: "bg-orange-500",
    expedido: "bg-green-500",
  };

  const statusText = {
    em_estoque: "Em Estoque",
    backlog: "Backlog",
    separacao: "Separação",
    expedicao: "Expedição",
    expedido: "Expedido",
  };

  const filteredOperations = mockOperations.filter(op => 
    op.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusCount = (status: string) => 
    mockOperations.filter(op => op.status === status).length;

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Operações</h2>
        <DatePickerWithRange date={dateRange} setDate={setDateRange} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {Object.entries(statusIcons).map(([status, Icon]) => (
          <Card key={status} className="p-6 hover:shadow-lg transition-all duration-200">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-lg ${statusColors[status]} bg-opacity-10`}>
                <Icon className={`h-6 w-6 ${statusColors[status]} text-opacity-100`} />
              </div>
              <div>
                <p className="text-sm text-gray-500">
                  {statusText[status]}
                </p>
                <p className="text-2xl font-bold">
                  {getStatusCount(status)}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <Input
              placeholder="Buscar por nome do produto..."
              className="max-w-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button className="bg-primary hover:bg-primary-dark">
              Exportar Relatório
            </Button>
          </div>

          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-4 px-6 font-medium text-gray-600">Produto</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-600">Status</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-600">Quantidade</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-600">Última Atualização</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-600">Previsão</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredOperations.slice(0, 10).map((op) => {
                  const Icon = statusIcons[op.status];
                  return (
                    <tr key={op.id} className="hover:bg-gray-50">
                      <td className="py-4 px-6">{op.name}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <Icon className={`h-4 w-4 ${statusColors[op.status]}`} />
                          <span>{statusText[op.status]}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">{op.quantity}</td>
                      <td className="py-4 px-6">{op.lastUpdate}</td>
                      <td className="py-4 px-6">{op.expectedDate || "-"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default OperationsDashboard;
