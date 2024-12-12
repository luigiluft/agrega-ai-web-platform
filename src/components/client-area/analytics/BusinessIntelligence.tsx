import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, PieChart, Calendar } from "lucide-react";
import { useState } from "react";

const BusinessIntelligence = () => {
  const [timeRange, setTimeRange] = useState("7d");
  
  const salesData = [
    { date: "2024-01-01", sales: 1200, orders: 45 },
    { date: "2024-01-02", sales: 1900, orders: 56 },
    { date: "2024-01-03", sales: 1500, orders: 48 },
    { date: "2024-01-04", sales: 2100, orders: 62 },
    { date: "2024-01-05", sales: 1800, orders: 52 },
  ];

  const insights = [
    {
      title: "Vendas em Alta",
      description: "Aumento de 23% nas vendas em relação ao mês anterior",
      trend: "positive",
    },
    {
      title: "Produtos Populares",
      description: "Top 3 produtos representam 45% das vendas",
      trend: "neutral",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Business Intelligence</h2>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Últimos 7 dias</SelectItem>
            <SelectItem value="30d">Últimos 30 dias</SelectItem>
            <SelectItem value="90d">Últimos 90 dias</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {insights.map((insight, index) => (
          <Card key={index} className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className={`w-5 h-5 ${insight.trend === 'positive' ? 'text-green-500' : 'text-orange-500'}`} />
              <h3 className="font-semibold">{insight.title}</h3>
            </div>
            <p className="text-gray-600">{insight.description}</p>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <Tabs defaultValue="sales">
          <TabsList>
            <TabsTrigger value="sales">Vendas</TabsTrigger>
            <TabsTrigger value="orders">Pedidos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="sales" className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#f97316" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
          
          <TabsContent value="orders" className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="orders" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default BusinessIntelligence;