import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Box, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Product } from "./types";
import AddProductForm from "./AddProductForm";
import { useNavigate } from "react-router-dom";
import ProductHeader from "./ProductHeader";
import ProductContent from "./ProductContent";

const ProductManagement = () => {
  const navigate = useNavigate();
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

  const handleEditProduct = (id: string, updatedProduct: Partial<Product>) => {
    setProducts(products.map(p => 
      p.id === id ? { ...p, ...updatedProduct } : p
    ));
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
    toast.success("Produto removido com sucesso!");
  };

  const handleExportToExcel = () => {
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
        <ProductHeader 
          onAddProduct={() => setIsAdding(true)}
          onExport={handleExportToExcel}
          onViewChange={() => setViewMode(viewMode === "list" ? "chart" : "list")}
          viewMode={viewMode}
          filter={filter}
          onFilterChange={(value: any) => setFilter(value)}
        />
      </div>

      {isAdding && (
        <AddProductForm
          onAdd={handleAddProduct}
          onCancel={() => setIsAdding(false)}
        />
      )}

      <ProductContent 
        viewMode={viewMode}
        products={filteredProducts()}
        onDelete={handleDeleteProduct}
        onEdit={handleEditProduct}
      />
    </Card>
  );
};

export default ProductManagement;