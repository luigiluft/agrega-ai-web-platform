import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Package, Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Product {
  id: string;
  name: string;
  price: number;
  sku: string;
  stock: number;
}

const ProductManagement = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Produto Exemplo 1",
      price: 99.90,
      sku: "SKU001",
      stock: 50
    },
    {
      id: "2",
      name: "Produto Exemplo 2",
      price: 149.90,
      sku: "SKU002",
      stock: 30
    }
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    sku: "",
    stock: ""
  });

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.sku || !newProduct.stock) {
      toast.error("Preencha todos os campos");
      return;
    }

    const product = {
      id: Date.now().toString(),
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      sku: newProduct.sku,
      stock: parseInt(newProduct.stock)
    };

    setProducts([...products, product]);
    setIsAdding(false);
    setNewProduct({ name: "", price: "", sku: "", stock: "" });
    toast.success("Produto adicionado com sucesso!");
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
    toast.success("Produto removido com sucesso!");
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Gerenciamento de Produtos</h2>
        <Button onClick={() => setIsAdding(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Adicionar Produto
        </Button>
      </div>

      {isAdding && (
        <Card className="p-4 mb-6 border-primary">
          <h3 className="text-lg font-semibold mb-4">Novo Produto</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nome</label>
              <Input
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                placeholder="Nome do produto"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Preço</label>
              <Input
                type="number"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                placeholder="99.90"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">SKU</label>
              <Input
                value={newProduct.sku}
                onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })}
                placeholder="SKU001"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Estoque</label>
              <Input
                type="number"
                value={newProduct.stock}
                onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                placeholder="50"
              />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <Button onClick={handleAddProduct}>Salvar</Button>
            <Button variant="outline" onClick={() => setIsAdding(false)}>Cancelar</Button>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-4">
        {products.map((product) => (
          <Card key={product.id} className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Package className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-sm text-gray-500">SKU: {product.sku}</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="font-semibold">R$ {product.price.toFixed(2)}</p>
                <p className="text-sm text-gray-500">Estoque: {product.stock}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon">
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => handleDeleteProduct(product.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
};

export default ProductManagement;