import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Package, Image as ImageIcon } from "lucide-react";
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
    stock: "",
    description: "",
    category: "",
    marketplaces: [] as string[],
    tags: "",
  });

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.sku || !newProduct.stock) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    onAdd({
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      sku: newProduct.sku,
      stock: parseInt(newProduct.stock),
      description: newProduct.description,
      category: newProduct.category,
      marketplaces: newProduct.marketplaces,
      tags: newProduct.tags.split(",").map(tag => tag.trim()),
      createdAt: new Date(),
      updatedAt: new Date(),
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
            <label className="block text-sm font-medium mb-1">Nome *</label>
            <Input
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              placeholder="Nome do produto"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Preço *</label>
            <Input
              type="number"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              placeholder="99.90"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">SKU *</label>
            <Input
              value={newProduct.sku}
              onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })}
              placeholder="SKU001"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Estoque *</label>
            <Input
              type="number"
              value={newProduct.stock}
              onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
              placeholder="50"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Descrição</label>
            <Textarea
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              placeholder="Descrição detalhada do produto"
              className="h-24"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Categoria</label>
            <Input
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
              placeholder="Categoria do produto"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Tags</label>
            <Input
              value={newProduct.tags}
              onChange={(e) => setNewProduct({ ...newProduct, tags: e.target.value })}
              placeholder="Tag1, Tag2, Tag3"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Imagens</label>
            <div className="border-2 border-dashed rounded-lg p-4 text-center">
              <ImageIcon className="w-8 h-8 mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">
                Arraste imagens ou clique para fazer upload
              </p>
            </div>
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