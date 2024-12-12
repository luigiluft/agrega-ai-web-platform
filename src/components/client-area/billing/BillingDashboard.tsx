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
} from "lucide-react";
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
} from "recharts";

const BillingDashboard = () => {
  const nextPayment = {
    amount: "R$ 299,90",
    dueDate: "15/05/2024",
    status: "Pendente",
  };

  const revenueData = [
    { month: "Jan", value: 299.9 },
    { month: "Fev", value: 299.9 },
    { month: "Mar", value: 299.9 },
    { month: "Abr", value: 299.9 },
    { month: "Mai", value: 299.9 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Próximo Pagamento</h3>
            <Clock className="w-5 h-5 text-primary" />
          </div>
          <p className="text-2xl font-bold text-primary">
            {nextPayment.amount}
          </p>
          <div className="flex justify-between mt-2">
            <p className="text-sm text-gray-500">Vencimento</p>
            <p className="text-sm font-medium">{nextPayment.dueDate}</p>
          </div>
          <Button className="w-full mt-4">
            Pagar Agora
            <ArrowUpRight className="w-4 h-4 ml-2" />
          </Button>
        </Card>

        <Card className="p-4">
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

        <Card className="p-4">
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

        <Card className="p-4">
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
      </div>

      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Receita Mensal</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#f97316"
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