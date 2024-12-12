import { Card } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const data = [
  { name: "Cliente Premium A", value: 145 },
  { name: "Cliente Premium B", value: 135 },
  { name: "Cliente Gold A", value: 130 },
  { name: "Cliente Gold B", value: 125 },
  { name: "Cliente Gold C", value: 120 },
  { name: "Cliente Silver A", value: 115 },
  { name: "Cliente Silver B", value: 110 },
  { name: "Cliente Silver C", value: 105 },
  { name: "Cliente Bronze A", value: 100 },
  { name: "Cliente Bronze B", value: 95 },
  { name: "Cliente Bronze C", value: 90 },
  { name: "Cliente Regular A", value: 85 },
  { name: "Cliente Regular B", value: 80 },
  { name: "Cliente Regular C", value: 75 },
  { name: "Cliente Regular D", value: 70 },
  { name: "Cliente Regular E", value: 65 },
  { name: "Cliente Regular F", value: 60 },
  { name: "Cliente Regular G", value: 55 },
  { name: "Cliente Regular H", value: 50 },
  { name: "Cliente Regular I", value: 45 },
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