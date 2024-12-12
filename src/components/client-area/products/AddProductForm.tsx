import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Product } from "./types";

interface AddProductFormProps {
  onAdd: (product: Omit<Product, "id">) => void;
  onCancel: () => void;
}

const AddProductForm = ({ onAdd, onCancel }: AddProductFormProps) => {
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

    onAdd({
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      sku: newProduct.sku,
      stock: parseInt(newProduct.stock)
    });
  };

  return (
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
          <Button variant="outline" onClick={onCancel}>Cancelar</Button>
        </div>
      </Card>
    </motion.div>
  );
};

export default AddProductForm;