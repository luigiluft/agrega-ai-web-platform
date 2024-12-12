import { Card } from "@/components/ui/card";
import { TrendingUp, AlertTriangle, Clock } from "lucide-react";
import { Product } from "./types";

interface ProductStatsProps {
  products: Product[];
}

const ProductStats = ({ products }: ProductStatsProps) => {
  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Estatísticas Rápidas</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Mais Vendido</span>
          </div>
          <span className="text-sm font-semibold">
            {products.length > 0 ? products[0]?.name : "Nenhum produto"}
          </span>
        </div>
        <div className="flex items-center justify-between p-3 bg-orange-500/10 rounded-lg">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-medium">Baixo Estoque</span>
          </div>
          <span className="text-sm font-semibold">{products.filter(p => p.stock < 10).length} produtos</span>
        </div>
        <div className="flex items-center justify-between p-3 bg-blue-500/10 rounded-lg">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium">Adicionados Hoje</span>
          </div>
          <span className="text-sm font-semibold">
            {products.filter(p => {
              const today = new Date();
              const productDate = new Date(Number(p.id));
              return productDate.toDateString() === today.toDateString();
            }).length} produtos
          </span>
        </div>
      </div>
    </Card>
  );
};

export default ProductStats;