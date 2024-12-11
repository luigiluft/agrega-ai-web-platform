import { Card } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const data = [
  { name: "Cliente A", value: 45 },
  { name: "Cliente B", value: 35 },
  { name: "Cliente C", value: 30 },
  { name: "Cliente D", value: 25 },
  { name: "Cliente E", value: 20 },
];

const COLORS = ["hsl(var(--primary))", "hsl(var(--primary) / 0.8)", "hsl(var(--primary) / 0.6)", "hsl(var(--primary) / 0.4)", "hsl(var(--primary) / 0.2)"];

const config = {
  value: {
    color: "hsl(var(--primary))",
  },
};

const CustomersChart = () => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Clientes Mais Ativos</h3>
      <div className="h-[300px]">
        <ChartContainer config={config}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="hsl(var(--primary))"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<ChartTooltipContent />} />
          </PieChart>
        </ChartContainer>
      </div>
    </Card>
  );
};

export default CustomersChart;