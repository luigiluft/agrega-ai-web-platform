import { Card } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Line, LineChart, XAxis, YAxis, Tooltip } from "recharts";

const data = [
  { month: "Jan", sales: 4000 },
  { month: "Fev", sales: 3000 },
  { month: "Mar", sales: 5000 },
  { month: "Abr", sales: 4500 },
  { month: "Mai", sales: 6000 },
  { month: "Jun", sales: 5500 },
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