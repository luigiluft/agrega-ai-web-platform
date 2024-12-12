import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CreditCard, Receipt } from "lucide-react";

const PaymentHistory = () => {
  const payments = [
    {
      id: "1",
      date: "15/04/2024",
      amount: "R$ 299,90",
      method: "Cartão de Crédito",
      invoice: "FAT-2024-04",
    },
    {
      id: "2",
      date: "15/03/2024",
      amount: "R$ 299,90",
      method: "Cartão de Crédito",
      invoice: "FAT-2024-03",
    },
  ];

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Data</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Método</TableHead>
            <TableHead>Fatura</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.map((payment) => (
            <TableRow key={payment.id}>
              <TableCell>{payment.date}</TableCell>
              <TableCell>{payment.amount}</TableCell>
              <TableCell className="flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                {payment.method}
              </TableCell>
              <TableCell className="flex items-center gap-2">
                <Receipt className="w-4 h-4" />
                {payment.invoice}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PaymentHistory;