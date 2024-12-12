import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download, Eye, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";

const InvoiceList = () => {
  const invoices = [
    {
      id: "1",
      number: "FAT-2024-001",
      date: "15/04/2024",
      dueDate: "15/04/2024",
      amount: "R$ 299,90",
      status: "Paga",
      statusColor: "text-green-500",
      items: [
        {
          description: "Plano Premium",
          quantity: 1,
          unitPrice: "R$ 299,90",
          total: "R$ 299,90",
        },
      ],
      taxes: {
        subtotal: "R$ 299,90",
        iss: "R$ 15,00",
        total: "R$ 314,90",
      },
      paymentMethod: "Cartão de Crédito",
    },
    {
      id: "2",
      number: "FAT-2024-002",
      date: "15/03/2024",
      dueDate: "15/03/2024",
      amount: "R$ 299,90",
      status: "Paga",
      statusColor: "text-green-500",
      items: [
        {
          description: "Plano Premium",
          quantity: 1,
          unitPrice: "R$ 299,90",
          total: "R$ 299,90",
        },
      ],
      taxes: {
        subtotal: "R$ 299,90",
        iss: "R$ 15,00",
        total: "R$ 314,90",
      },
      paymentMethod: "PIX",
    },
    {
      id: "3",
      number: "FAT-2024-003",
      date: "15/05/2024",
      dueDate: "15/05/2024",
      amount: "R$ 299,90",
      status: "Pendente",
      statusColor: "text-yellow-500",
      items: [
        {
          description: "Plano Premium",
          quantity: 1,
          unitPrice: "R$ 299,90",
          total: "R$ 299,90",
        },
      ],
      taxes: {
        subtotal: "R$ 299,90",
        iss: "R$ 15,00",
        total: "R$ 314,90",
      },
      paymentMethod: "Aguardando",
    },
  ];

  return (
    <div className="space-y-4">
      <ScrollArea className="h-[600px]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Número</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Vencimento</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>{invoice.number}</TableCell>
                <TableCell>{invoice.date}</TableCell>
                <TableCell>{invoice.dueDate}</TableCell>
                <TableCell>{invoice.amount}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      invoice.status === "Paga"
                        ? "success"
                        : invoice.status === "Pendente"
                        ? "warning"
                        : "destructive"
                    }
                  >
                    {invoice.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
};

export default InvoiceList;