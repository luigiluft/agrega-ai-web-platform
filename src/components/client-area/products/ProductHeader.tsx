import { Button } from "@/components/ui/button";
import { Plus, Download, BarChart2, ListFilter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ProductHeaderProps {
  onAddProduct: () => void;
  onExport: () => void;
  onViewChange: () => void;
  viewMode: "list" | "chart";
  filter: string;
  onFilterChange: (value: string) => void;
}

const ProductHeader = ({
  onAddProduct,
  onExport,
  onViewChange,
  viewMode,
  filter,
  onFilterChange
}: ProductHeaderProps) => {
  return (
    <div className="flex gap-2">
      <Select value={filter} onValueChange={onFilterChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filtrar por" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos os Produtos</SelectItem>
          <SelectItem value="bestsellers">Mais Vendidos</SelectItem>
          <SelectItem value="lowstock">Baixo Estoque</SelectItem>
          <SelectItem value="recent">Mais Recentes</SelectItem>
        </SelectContent>
      </Select>
      <Button onClick={onExport} variant="outline" className="gap-2">
        <Download className="w-4 h-4" />
        Exportar
      </Button>
      <Button onClick={onViewChange} variant="outline" className="gap-2">
        {viewMode === "list" ? (
          <>
            <BarChart2 className="w-4 h-4" />
            Ver Gráfico
          </>
        ) : (
          <>
            <ListFilter className="w-4 h-4" />
            Ver Lista
          </>
        )}
      </Button>
      <Button onClick={onAddProduct} className="gap-2">
        <Plus className="w-4 h-4" />
        Adicionar Produto
      </Button>
    </div>
  );
};

export default ProductHeader;