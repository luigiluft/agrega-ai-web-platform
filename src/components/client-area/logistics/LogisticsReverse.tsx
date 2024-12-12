import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Package, RefreshCcw, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Return {
  id: string;
  orderId: string;
  customer: string;
  reason: string;
  status: "pending" | "approved" | "rejected";
  date: string;
}

const LogisticsReverse = () => {
  const navigate = useNavigate();
  
  const returns: Return[] = [
    {
      id: "1",
      orderId: "ORD-001",
      customer: "João Silva",
      reason: "Produto danificado",
      status: "pending",
      date: "2024-01-15"
    },
    {
      id: "2",
      orderId: "ORD-002",
      customer: "Maria Santos",
      reason: "Tamanho errado",
      status: "approved",
      date: "2024-01-14"
    }
  ];

  const getStatusBadge = (status: Return["status"]) => {
    const statusConfig = {
      pending: { label: "Pendente", className: "bg-yellow-500" },
      approved: { label: "Aprovado", className: "bg-green-500" },
      rejected: { label: "Rejeitado", className: "bg-red-500" }
    };

    return (
      <Badge className={statusConfig[status].className}>
        {statusConfig[status].label}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h2 className="text-2xl font-bold">Logística Reversa</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Package className="h-5 w-5 text-orange-500" />
            <h3 className="font-semibold">Total de Devoluções</h3>
          </div>
          <p className="text-3xl font-bold">24</p>
          <p className="text-sm text-gray-500">Últimos 30 dias</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <RefreshCcw className="h-5 w-5 text-green-500" />
            <h3 className="font-semibold">Taxa de Aprovação</h3>
          </div>
          <p className="text-3xl font-bold">85%</p>
          <p className="text-sm text-gray-500">Média mensal</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            <h3 className="font-semibold">Pendentes</h3>
          </div>
          <p className="text-3xl font-bold">7</p>
          <p className="text-sm text-gray-500">Aguardando análise</p>
        </Card>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pedido</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Motivo</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Data</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {returns.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.orderId}</TableCell>
                <TableCell>{item.customer}</TableCell>
                <TableCell>{item.reason}</TableCell>
                <TableCell>{getStatusBadge(item.status)}</TableCell>
                <TableCell>{item.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default LogisticsReverse;