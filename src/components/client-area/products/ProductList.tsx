import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Pencil, Trash2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { Product } from "./types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface ProductListProps {
  products: Product[];
  onDelete: (id: string) => void;
  onEdit: (id: string, updatedProduct: Partial<Product>) => void;
}

const ProductList = ({ products, onDelete, onEdit }: ProductListProps) => {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editForm, setEditForm] = useState({
    name: "",
    price: "",
    sku: "",
    stock: "",
  });

  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
    setEditForm({
      name: product.name,
      price: product.price.toString(),
      sku: product.sku,
      stock: product.stock.toString(),
    });
  };

  const handleEditSubmit = () => {
    if (!editingProduct) return;

    const updatedProduct = {
      name: editForm.name,
      price: parseFloat(editForm.price),
      sku: editForm.sku,
      stock: parseInt(editForm.stock),
    };

    onEdit(editingProduct.id, updatedProduct);
    setEditingProduct(null);
    toast.success("Produto atualizado com sucesso!");
  };

  const handleDeleteProduct = (id: string) => {
    onDelete(id);
    toast.success("Produto removido com sucesso!");
  };

  return (
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
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="hover:text-primary"
                        onClick={() => handleEditClick(product)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Editar Produto</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label>Nome do Produto</Label>
                          <Input
                            value={editForm.name}
                            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Preço</Label>
                          <Input
                            type="number"
                            step="0.01"
                            value={editForm.price}
                            onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>SKU</Label>
                          <Input
                            value={editForm.sku}
                            onChange={(e) => setEditForm({ ...editForm, sku: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Estoque</Label>
                          <Input
                            type="number"
                            value={editForm.stock}
                            onChange={(e) => setEditForm({ ...editForm, stock: e.target.value })}
                          />
                        </div>
                        <Button 
                          className="w-full mt-4"
                          onClick={handleEditSubmit}
                        >
                          Salvar Alterações
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
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
  );
};

export default ProductList;