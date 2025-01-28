import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { DollarSign, ShoppingBag, CreditCard } from "lucide-react";

interface RevenueShareStepProps {
  monthlyRevenue: string;
  setMonthlyRevenue: (value: string) => void;
  averageTicket: string;
  setAverageTicket: (value: string) => void;
  monthlyOrders: string;
  setMonthlyOrders: (value: string) => void;
}

const RevenueShareStep = ({
  monthlyRevenue,
  setMonthlyRevenue,
  averageTicket,
  setAverageTicket,
  monthlyOrders,
  setMonthlyOrders,
}: RevenueShareStepProps) => {
  const handleOrdersChange = (value: string) => {
    setMonthlyOrders(value);
    const revenue = parseFloat(value) * parseFloat(averageTicket || "0");
    setMonthlyRevenue(revenue.toString());
  };

  const handleTicketChange = (value: string) => {
    setAverageTicket(value);
    const revenue = parseFloat(value) * parseFloat(monthlyOrders || "0");
    setMonthlyRevenue(revenue.toString());
  };

  return (
    <Card className="p-6 space-y-4">
      <h3 className="text-lg font-semibold">Projeção de Faturamento</h3>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Ticket Médio (R$)</Label>
          <div className="relative">
            <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input
              type="number"
              value={averageTicket}
              onChange={(e) => handleTicketChange(e.target.value)}
              className="pl-10"
              placeholder="Ex: 150"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Vendas por Mês</Label>
          <div className="relative">
            <ShoppingBag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input
              type="number"
              value={monthlyOrders}
              onChange={(e) => handleOrdersChange(e.target.value)}
              className="pl-10"
              placeholder="Ex: 100"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Faturamento Mensal Estimado (R$)</Label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input
              type="number"
              value={monthlyRevenue}
              onChange={(e) => setMonthlyRevenue(e.target.value)}
              className="pl-10 bg-gray-50"
              readOnly
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RevenueShareStep;