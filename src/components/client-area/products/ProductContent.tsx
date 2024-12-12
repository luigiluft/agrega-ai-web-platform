import ProductList from "./ProductList";
import ProductsChart from "../monitoring/ProductsChart";
import ProductTemplate from "./ProductTemplate";
import ProductStats from "./ProductStats";
import { Product } from "./types";

interface ProductContentProps {
  viewMode: "list" | "chart";
  products: Product[];
  onDelete: (id: string) => void;
}

const ProductContent = ({ viewMode, products, onDelete }: ProductContentProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        {viewMode === "list" ? (
          <ProductList products={products} onDelete={onDelete} />
        ) : (
          <ProductsChart products={products} />
        )}
      </div>
      <div className="space-y-6">
        <ProductTemplate />
        <ProductStats products={products} />
      </div>
    </div>
  );
};

export default ProductContent;