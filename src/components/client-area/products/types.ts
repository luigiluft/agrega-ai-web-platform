export interface Product {
  id: string;
  name: string;
  price: number;
  sku: string;
  stock: number;
  description?: string;
  images?: string[];
  marketplaces?: string[];
  category?: string;
  tags?: string[];
  sales?: number;
  createdAt?: Date;
  updatedAt?: Date;
}