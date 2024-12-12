import { Delivery } from '../types';

export const deliveries: Delivery[] = [
  {
    id: "DEL001",
    trackingNumber: "BR123456789",
    status: "em_rota",
    estimatedDelivery: "2024-04-15",
    currentLocation: { lat: -23.5505, lng: -46.6333 },
    destination: "Rua Augusta, 1500 - São Paulo, SP",
    lastUpdate: "2024-04-13 14:30",
    customer: "João Silva",
    contact: "(11) 98765-4321",
    value: 1250.90,
    priority: "alta",
    items: 3
  },
  {
    id: "DEL002",
    trackingNumber: "BR987654321",
    status: "atrasado",
    estimatedDelivery: "2024-04-14",
    currentLocation: { lat: -22.9068, lng: -43.1729 },
    destination: "Av. Atlântica, 2000 - Rio de Janeiro, RJ",
    lastUpdate: "2024-04-13 10:15",
    customer: "Maria Santos",
    contact: "(21) 98765-4321",
    value: 789.50,
    notes: "Cliente solicitou entrega no período da manhã",
    priority: "media",
    items: 1
  },
  {
    id: "DEL003",
    trackingNumber: "BR456789123",
    status: "risco_atraso",
    estimatedDelivery: "2024-04-16",
    currentLocation: { lat: -25.4284, lng: -49.2733 },
    destination: "Rua XV de Novembro, 1000 - Curitiba, PR",
    lastUpdate: "2024-04-13 16:45",
    customer: "Pedro Oliveira",
    contact: "(41) 98765-4321",
    value: 2340.00,
    priority: "baixa",
    items: 5
  },
  {
    id: "DEL004",
    trackingNumber: "BR789123456",
    status: "entregue",
    estimatedDelivery: "2024-04-13",
    currentLocation: { lat: -30.0277, lng: -51.2287 },
    destination: "Av. Ipiranga, 500 - Porto Alegre, RS",
    lastUpdate: "2024-04-13 09:30",
    customer: "Ana Souza",
    contact: "(51) 98765-4321",
    value: 567.80,
    priority: "media",
    items: 2
  },
  {
    id: "DEL005",
    trackingNumber: "BR321654987",
    status: "pendente",
    estimatedDelivery: "2024-04-17",
    currentLocation: { lat: -19.9167, lng: -43.9345 },
    destination: "Av. do Contorno, 1500 - Belo Horizonte, MG",
    lastUpdate: "2024-04-13 11:20",
    customer: "Carlos Lima",
    contact: "(31) 98765-4321",
    value: 1890.30,
    notes: "Necessário agendamento prévio",
    priority: "alta",
    items: 4
  }
];
