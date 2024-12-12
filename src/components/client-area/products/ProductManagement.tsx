import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Package, Plus, Pencil, Trash2, Box, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

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
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <Card className="p-4 mb-6 border-primary">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-primary" />
              Novo Produto
            </h3>
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
        </motion.div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {products.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-4 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
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
                    <p className={`text-sm ${product.stock > 20 ? 'text-green-500' : 'text-orange-500'} flex items-center gap-1`}>
                      {product.stock > 20 ? (
                        <Package className="w-4 h-4" />
                      ) : (
                        <AlertCircle className="w-4 h-4" />
                      )}
                      Estoque: {product.stock}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="hover:text-primary">
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="hover:text-red-500"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </Card>
  );
};

export default ProductManagement;
