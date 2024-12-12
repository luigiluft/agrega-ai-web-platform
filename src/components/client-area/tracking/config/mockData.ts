import { Delivery } from '../types';
import { addDays } from 'date-fns';

const generateRandomLocation = (baseLocation: [number, number], radius: number) => {
  const lat = baseLocation[0] + (Math.random() - 0.5) * radius;
  const lng = baseLocation[1] + (Math.random() - 0.5) * radius;
  return { lat, lng };
};

// Generate 1000 deliveries with realistic data
export const deliveries: Delivery[] = Array.from({ length: 1000 }, (_, index) => {
  const status = ['em_rota', 'atrasado', 'entregue', 'pendente', 'risco_atraso'][Math.floor(Math.random() * 5)] as Delivery['status'];
  const baseDate = new Date();
  const randomDays = Math.floor(Math.random() * 30);
  
  return {
    id: `DEL${(index + 1).toString().padStart(6, '0')}`,
    trackingNumber: `BR${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
    status,
    estimatedDelivery: addDays(baseDate, randomDays).toISOString(),
    currentLocation: generateRandomLocation([-23.5505, -46.6333], 0.2),
    destination: `Rua ${Math.floor(Math.random() * 1000)}, São Paulo, SP`,
    lastUpdate: new Date().toISOString(),
    customer: `Cliente ${index + 1}`,
    contact: `(11) 9${Math.floor(Math.random() * 9000 + 1000)}-${Math.floor(Math.random() * 9000 + 1000)}`,
    value: Math.floor(Math.random() * 5000) + 100,
    priority: ['baixa', 'media', 'alta'][Math.floor(Math.random() * 3)] as 'baixa' | 'media' | 'alta',
    items: Math.floor(Math.random() * 5) + 1,
    commission: Math.floor(Math.random() * 500) + 50
  };
});

// Sales data with Black Friday spike in November
export const salesData = [
  { month: "Jul", sales: 180000, commission: 18000 },
  { month: "Ago", sales: 165000, commission: 16500 },
  { month: "Set", sales: 190000, commission: 19000 },
  { month: "Out", sales: 175000, commission: 17500 },
  { month: "Nov", sales: 520000, commission: 52000 }, // Black Friday spike
  { month: "Dez", sales: 210000, commission: 21000 },
];

// Shared products data across all areas
export const sharedProducts = [
  {
    id: "1",
    name: "Smartphone XYZ Pro",
    price: 2499.90,
    sku: "PHONE001",
    stock: 982,
    description: "Smartphone premium com câmera de última geração",
    category: "Eletrônicos",
    sales: 450
  },
  {
    id: "2",
    name: "Tablet ABC Plus",
    price: 1899.90,
    sku: "TAB002",
    stock: 7,
    description: "Tablet ideal para produtividade",
    category: "Eletrônicos",
    sales: 280
  },
  {
    id: "3",
    name: "Notebook Ultra",
    price: 4599.90,
    sku: "NOTE003",
    stock: 68,
    description: "Notebook de alta performance",
    category: "Computadores",
    sales: 180
  },
  {
    id: "4",
    name: "Smart TV 55\"",
    price: 3299.90,
    sku: "TV004",
    stock: 50,
    description: "Smart TV 4K com HDR",
    category: "Eletrônicos",
    sales: 120
  },
  {
    id: "5",
    name: "Fone Bluetooth",
    price: 299.90,
    sku: "AUDIO005",
    stock: 117,
    description: "Fone sem fio com cancelamento de ruído",
    category: "Acessórios",
    sales: 850
  }
];