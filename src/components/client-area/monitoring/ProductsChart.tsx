import { Card } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const data = [
  { name: "Produto A", sales: 120 },
  { name: "Produto B", sales: 98 },
  { name: "Produto C", sales: 86 },
  { name: "Produto D", sales: 75 },
  { name: "Produto E", sales: 64 },
];

const config = {
  sales: {
    color: "hsl(var(--primary))",
  },
};

const ProductsChart = () => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Produtos Mais Vendidos</h3>
      <div className="h-[300px]">
        <ChartContainer config={config}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Bar dataKey="sales" fill="hsl(var(--primary))" />
            <Tooltip content={<ChartTooltipContent />} />
          </BarChart>
        </ChartContainer>
      </div>
    </Card>
  );
};

export default ProductsChart;