import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const orders = [
  {
    id: "#12345",
    customer: "João Silva",
    date: "2024-04-10",
    amount: "R$ 450,00",
    status: "Entregue",
  },
  {
    id: "#12346",
    customer: "Maria Santos",
    date: "2024-04-09",
    amount: "R$ 280,00",
    status: "Em trânsito",
  },
  {
    id: "#12347",
    customer: "Pedro Oliveira",
    date: "2024-04-09",
    amount: "R$ 750,00",
    status: "Processando",
  },
  {
    id: "#12348",
    customer: "Ana Costa",
    date: "2024-04-08",
    amount: "R$ 320,00",
    status: "Entregue",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Entregue":
      return "bg-green-500";
    case "Em trânsito":
      return "bg-blue-500";
    case "Processando":
      return "bg-yellow-500";
    default:
      return "bg-gray-500";
  }
};

const RecentOrders = () => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Pedidos Recentes</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Pedido</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell>{order.customer}</TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell>{order.amount}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(order.status)}>
                  {order.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default RecentOrders;