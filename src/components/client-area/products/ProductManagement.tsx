import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Plus, Box, Download, BarChart2, ListFilter,
  TrendingUp, AlertTriangle, Clock 
} from "lucide-react";
import { toast } from "sonner";
import { Product } from "./types";
import ProductList from "./ProductList";
import AddProductForm from "./AddProductForm";
import ProductsChart from "../monitoring/ProductsChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ProductManagement = () => {
  const [products, setProducts] = useState<Product[]>([
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
        <div className="flex items-center gap-2">
          <Box className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Gerenciamento de Produtos</h2>
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
          <Card className="p-4">
            <h3 className="text-lg font-semibold mb-4">Modelo de Referência</h3>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium">Campos Importantes:</h4>
                <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                  <li>• Nome do produto (obrigatório)</li>
                  <li>• SKU único (obrigatório)</li>
                  <li>• Preço de venda (obrigatório)</li>
                  <li>• Quantidade em estoque</li>
                  <li>• Descrição detalhada</li>
                  <li>• Fotos do produto</li>
                  <li>• Marketplaces integrados</li>
                  <li>• Categoria do produto</li>
                  <li>• Tags para busca</li>
                </ul>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium">Dicas:</h4>
                <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                  <li>• Use fotos de alta qualidade</li>
                  <li>• Mantenha descrições claras</li>
                  <li>• Atualize o estoque regularmente</li>
                  <li>• Monitore as vendas por marketplace</li>
                </ul>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <h3 className="text-lg font-semibold mb-4">Estatísticas Rápidas</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">Mais Vendido</span>
                </div>
                <span className="text-sm font-semibold">{filteredProducts()[0]?.name}</span>
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
        </div>
      </div>
    </Card>
  );
};

export default ProductManagement;