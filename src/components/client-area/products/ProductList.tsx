import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Pencil, Trash2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { Product } from "./types";

interface ProductListProps {
  products: Product[];
  onDelete: (id: string) => void;
}

const ProductList = ({ products, onDelete }: ProductListProps) => {
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
  );
};

export default ProductList;