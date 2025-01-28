import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Projeção de Faturamento</h3>
        
        <div className="space-y-4">
          <div>
            <Label>Ticket Médio (R$)</Label>
            <Input
              type="number"
              value={averageTicket}
              onChange={(e) => handleTicketChange(e.target.value)}
              placeholder="Ex: 150"
              className="mt-1"
            />
          </div>

          <div>
            <Label>Vendas por Mês (quantidade)</Label>
            <Input
              type="number"
              value={monthlyOrders}
              onChange={(e) => handleOrdersChange(e.target.value)}
              placeholder="Ex: 100"
              className="mt-1"
            />
          </div>

          <div>
            <Label>Faturamento Mensal Estimado (R$)</Label>
            <Input
              type="number"
              value={monthlyRevenue}
              onChange={(e) => setMonthlyRevenue(e.target.value)}
              readOnly
              className="mt-1 bg-gray-50"
            />
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default RevenueShareStep;