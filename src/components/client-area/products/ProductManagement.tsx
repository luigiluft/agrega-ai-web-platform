import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Box, Download, BarChart2, ListFilter, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Product } from "./types";
import ProductList from "./ProductList";
import AddProductForm from "./AddProductForm";
import ProductsChart from "../monitoring/ProductsChart";
import ProductStats from "./ProductStats";
import ProductTemplate from "./ProductTemplate";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

interface ProductManagementProps {
  products?: Product[];
}

const ProductManagement: React.FC<ProductManagementProps> = ({ products: initialProducts }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>(initialProducts || [
    {
      id: "1",
      name: "Camiseta Premium",
      price: 99.90,
      sku: "TSH001",
      stock: 50
    },
    {
      id: "2",
      name: "Calça Jeans Slim",
      price: 199.90,
      sku: "PNT002",
      stock: 30
    },
    {
      id: "3",
      name: "Tênis Esportivo",
      price: 299.90,
      sku: "SHO003",
      stock: 25
    },
    {
      id: "4",
      name: "Relógio Smart",
      price: 599.90,
      sku: "WAT004",
      stock: 15
    },
    {
      id: "5",
      name: "Mochila Executiva",
      price: 159.90,
      sku: "BAG005",
      stock: 40
    },
    {
      id: "6",
      name: "Óculos de Sol",
      price: 249.90,
      sku: "SUN006",
      stock: 20
    },
    {
      id: "7",
      name: "Boné Esportivo",
      price: 79.90,
      sku: "CAP007",
      stock: 60
    },
    {
      id: "8",
      name: "Carteira em Couro",
      price: 129.90,
      sku: "WAL008",
      stock: 35
    },
    {
      id: "9",
      name: "Smartwatch Pro",
      price: 899.90,
      sku: "SWT009",
      stock: 10
    },
    {
      id: "10",
      name: "Fone Bluetooth",
      price: 199.90,
      sku: "PHN010",
      stock: 45
    }
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "chart">("list");
  const [filter, setFilter] = useState<"all" | "bestsellers" | "lowstock" | "recent">("all");

  const handleAddProduct = (newProductData: Omit<Product, "id">) => {
    const product = {
      id: Date.now().toString(),
      ...newProductData
    };

    setProducts([...products, product]);
    setIsAdding(false);
    toast.success("Produto adicionado com sucesso!");
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
    toast.success("Produto removido com sucesso!");
  };

  const handleExportToExcel = () => {
    // Implementation for Excel export would go here
    toast.success("Lista de produtos exportada com sucesso!");
  };

  const filteredProducts = () => {
    switch (filter) {
      case "bestsellers":
        return [...products].sort((a, b) => (b.sales || 0) - (a.sales || 0));
      case "lowstock":
        return [...products].sort((a, b) => a.stock - b.stock);
      case "recent":
        return [...products].sort((a, b) => Number(b.id) - Number(a.id));
      default:
        return products;
    }
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate(-1)}
            className="hover:bg-gray-100"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Box className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold">Gerenciamento de Produtos</h2>
          </div>
        </div>
        <div className="flex gap-2">
          <Select value={filter} onValueChange={(value: any) => setFilter(value)}>
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
          <Button onClick={handleExportToExcel} variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Exportar
          </Button>
          <Button onClick={() => setViewMode(viewMode === "list" ? "chart" : "list")} variant="outline" className="gap-2">
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
          <Button onClick={() => setIsAdding(true)} className="gap-2">
            <Plus className="w-4 h-4" />
            Adicionar Produto
          </Button>
        </div>
      </div>

      {isAdding && (
        <AddProductForm
          onAdd={handleAddProduct}
          onCancel={() => setIsAdding(false)}
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {viewMode === "list" ? (
            <ProductList
              products={filteredProducts()}
              onDelete={handleDeleteProduct}
            />
          ) : (
            <ProductsChart products={filteredProducts()} />
          )}
        </div>
        <div className="space-y-6">
          <ProductTemplate />
          <ProductStats products={filteredProducts()} />
        </div>
      </div>
    </Card>
  );
};

export default ProductManagement;
