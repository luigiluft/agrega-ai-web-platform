import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowUpRight,
  Receipt,
  Clock,
  CreditCard,
  FileText,
  AlertCircle,
  TrendingUp,
  PieChart,
  Calendar,
} from "lucide-react";
import { useState } from "react";
import InvoiceList from "./InvoiceList";
import PaymentHistory from "./PaymentHistory";
import PaymentMethods from "./PaymentMethods";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const BillingDashboard = () => {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState("6m");

  const revenueData = [
    { month: "Jan", commission: 2500, subscription: 299.9, total: 2799.9 },
    { month: "Fev", commission: 3000, subscription: 299.9, total: 3299.9 },
    { month: "Mar", commission: 3500, subscription: 299.9, total: 3799.9 },
    { month: "Abr", commission: 4000, subscription: 299.9, total: 4299.9 },
    { month: "Mai", commission: 4500, subscription: 299.9, total: 4799.9 },
    { month: "Jun", commission: 5000, subscription: 299.9, total: 5299.9 },
  ];

  const handlePayNow = () => {
    navigate("/area-cliente/checkout");
  };

  const handleViewDetails = () => {
    // Implementation for viewing invoice details
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Próximo Pagamento</h3>
            <Clock className="w-5 h-5 text-primary" />
          </div>
          <p className="text-2xl font-bold text-primary">R$ 299,90</p>
          <div className="flex justify-between mt-2">
            <p className="text-sm text-gray-500">Vencimento</p>
            <p className="text-sm font-medium">15/05/2024</p>
          </div>
          <Button className="w-full mt-4" onClick={handlePayNow}>
            Pagar Agora
            <ArrowUpRight className="w-4 h-4 ml-2" />
          </Button>
        </Card>

        <Dialog>
          <DialogTrigger asChild>
            <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Total em Aberto</h3>
                <Receipt className="w-5 h-5 text-primary" />
              </div>
              <p className="text-2xl font-bold text-primary">R$ 599,80</p>
              <p className="text-sm text-gray-500 mt-2">2 faturas pendentes</p>
              <Button variant="outline" className="w-full mt-4">
                Ver Detalhes
              </Button>
            </Card>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Detalhes das Faturas em Aberto</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {/* Add detailed invoice information here */}
            </div>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Última Fatura</h3>
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <p className="text-2xl font-bold text-green-500">Paga</p>
              <p className="text-sm text-gray-500 mt-2">
                R$ 299,90 - 15/04/2024
              </p>
              <Button variant="outline" className="w-full mt-4">
                Download PDF
              </Button>
            </Card>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Detalhes da Última Fatura</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {/* Add invoice details here */}
            </div>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Forma de Pagamento</h3>
                <CreditCard className="w-5 h-5 text-primary" />
              </div>
              <p className="text-base font-medium">Cartão de Crédito</p>
              <p className="text-sm text-gray-500">**** **** **** 1234</p>
              <Button variant="outline" className="w-full mt-4">
                Gerenciar
              </Button>
            </Card>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Gerenciar Formas de Pagamento</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {/* Add payment method management UI here */}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Receita Mensal</h3>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecione o período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3m">Últimos 3 meses</SelectItem>
              <SelectItem value="6m">Últimos 6 meses</SelectItem>
              <SelectItem value="1y">Último ano</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="commission"
                name="Comissão"
                stroke="#f97316"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="subscription"
                name="Mensalidade"
                stroke="#3b82f6"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="total"
                name="Total"
                stroke="#10b981"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Tabs defaultValue="invoices" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="invoices">Faturas</TabsTrigger>
          <TabsTrigger value="history">Histórico</TabsTrigger>
          <TabsTrigger value="payment-methods">
            Formas de Pagamento
          </TabsTrigger>
        </TabsList>

        <TabsContent value="invoices">
          <InvoiceList />
        </TabsContent>

        <TabsContent value="history">
          <PaymentHistory />
        </TabsContent>

        <TabsContent value="payment-methods">
          <PaymentMethods />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BillingDashboard;