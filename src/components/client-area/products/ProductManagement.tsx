import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Box } from "lucide-react";
import { toast } from "sonner";
import { Product } from "./types";
import ProductList from "./ProductList";
import AddProductForm from "./AddProductForm";

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
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Box className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Gerenciamento de Produtos</h2>
        </div>
        <Button onClick={() => setIsAdding(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Adicionar Produto
        </Button>
      </div>

      {isAdding && (
        <AddProductForm
          onAdd={handleAddProduct}
          onCancel={() => setIsAdding(false)}
        />
      )}

      <ProductList
        products={products}
        onDelete={handleDeleteProduct}
      />
    </Card>
  );
};

export default ProductManagement;