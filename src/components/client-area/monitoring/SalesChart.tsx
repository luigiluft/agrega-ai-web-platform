import { Card } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Line, LineChart, XAxis, YAxis, Tooltip } from "recharts";

const data = [
  { month: "Jan", sales: 840000 },
  { month: "Fev", sales: 930000 },
  { month: "Mar", sales: 1050000 },
  { month: "Abr", sales: 945000 },
  { month: "Mai", sales: 1260000 },
  { month: "Jun", sales: 1155000 },
  { month: "Jul", sales: 1380000 },
  { month: "Ago", sales: 1265000 },
  { month: "Set", sales: 1490000 },
  { month: "Out", sales: 1575000 },
  { month: "Nov", sales: 2100000 },
  { month: "Dez", sales: 1850000 },
];

const config = {
  sales: {
    color: "hsl(var(--primary))",
  },
};

const SalesChart = () => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Vendas Mensais</h3>
      <div className="h-[300px]">
        <ChartContainer config={config}>
          <LineChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
            />
            <Tooltip content={<ChartTooltipContent />} />
          </LineChart>
        </ChartContainer>
      </div>
    </Card>
  );
};

export default SalesChart;