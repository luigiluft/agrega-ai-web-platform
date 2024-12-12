import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download, Eye } from "lucide-react";

const InvoiceList = () => {
  const invoices = [
    {
      id: "1",
      date: "15/04/2024",
      dueDate: "15/04/2024",
      amount: "R$ 299,90",
      status: "Paga",
      statusColor: "text-green-500",
    },
    {
      id: "2",
      date: "15/03/2024",
      dueDate: "15/03/2024",
      amount: "R$ 299,90",
      status: "Paga",
      statusColor: "text-green-500",
    },
    {
      id: "3",
      date: "15/05/2024",
      dueDate: "15/05/2024",
      amount: "R$ 299,90",
      status: "Pendente",
      statusColor: "text-yellow-500",
    },
  ];

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
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
              <TableCell>{invoice.date}</TableCell>
              <TableCell>{invoice.dueDate}</TableCell>
              <TableCell>{invoice.amount}</TableCell>
              <TableCell>
                <span className={invoice.statusColor}>{invoice.status}</span>
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
    </div>
  );
};

export default InvoiceList;