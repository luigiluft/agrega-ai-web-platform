import { Product } from "../products/types";
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface ProductsChartProps {
  products: Product[];
}

const ProductsChart = ({ products }: ProductsChartProps) => {
  const data = products.map(product => ({
    name: product.name,
    stock: product.stock,
    value: product.price
  }));

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Visão Geral dos Produtos</h3>
      <div className="w-full overflow-x-auto">
        <BarChart width={600} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="stock" fill="#8884d8" />
          <Bar dataKey="value" fill="#82ca9d" />
        </BarChart>
      </div>
    </Card>
  );
};

export default ProductsChart;