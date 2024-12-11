import { Card } from "@/components/ui/card";
import { ShoppingCart, TrendingUp, Package, RefreshCcw } from "lucide-react";

const stats = [
  {
    title: "Total de Pedidos",
    value: "1,234",
    change: "+12.3%",
    icon: ShoppingCart,
  },
  {
    title: "Ticket Médio",
    value: "R$ 350,00",
    change: "+5.7%",
    icon: TrendingUp,
  },
  {
    title: "Taxa de Entrega",
    value: "98.5%",
    change: "+0.8%",
    icon: Package,
  },
  {
    title: "Taxa de Recompra",
    value: "45%",
    change: "+2.1%",
    icon: RefreshCcw,
  },
];

const OrderStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <stat.icon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
              <h4 className="text-2xl font-bold">{stat.value}</h4>
              <p className="text-sm text-green-600">{stat.change}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default OrderStats;