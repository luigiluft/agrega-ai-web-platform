import { Delivery } from '../types';

const generateRandomLocation = (baseLocation: [number, number], radius: number) => {
  const lat = baseLocation[0] + (Math.random() - 0.5) * radius;
  const lng = baseLocation[1] + (Math.random() - 0.5) * radius;
  return { lat, lng };
};

export const deliveries: Delivery[] = [
  {
    id: "DEL001",
    trackingNumber: "BR123456789",
    status: "em_rota",
    estimatedDelivery: "2024-12-20",
    currentLocation: generateRandomLocation([-23.5505, -46.6333], 0.1),
    destination: "Rua Augusta, 1500 - São Paulo, SP",
    lastUpdate: "2024-12-12 14:30",
    customer: "João Silva",
    contact: "(11) 98765-4321",
    value: 1250.90,
    priority: "alta",
    items: 3
  },
  // Add 9 more similar entries with different locations, statuses, and details
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
  },
  {
    id: "DEL006",
    trackingNumber: "BR789456123",
    status: "em_rota",
    estimatedDelivery: "2024-04-18",
    currentLocation: { lat: -3.7319, lng: -38.5267 },
    destination: "Av. Beira Mar, 300 - Fortaleza, CE",
    lastUpdate: "2024-04-13 15:40",
    customer: "Roberto Santos",
    contact: "(85) 98765-4321",
    value: 945.60,
    priority: "media",
    items: 2
  },
  {
    id: "DEL007",
    trackingNumber: "BR456789012",
    status: "risco_atraso",
    estimatedDelivery: "2024-04-16",
    currentLocation: { lat: -8.0476, lng: -34.8770 },
    destination: "Av. Boa Viagem, 1000 - Recife, PE",
    lastUpdate: "2024-04-13 13:20",
    customer: "Fernanda Lima",
    contact: "(81) 98765-4321",
    value: 1567.80,
    notes: "Área com restrição de horário",
    priority: "alta",
    items: 3
  },
  {
    id: "DEL008",
    trackingNumber: "BR012345678",
    status: "pendente",
    estimatedDelivery: "2024-04-19",
    currentLocation: { lat: -12.9714, lng: -38.5014 },
    destination: "Av. Oceânica, 500 - Salvador, BA",
    lastUpdate: "2024-04-13 16:15",
    customer: "Marcelo Costa",
    contact: "(71) 98765-4321",
    value: 2890.30,
    priority: "baixa",
    items: 4
  },
  {
    id: "DEL009",
    trackingNumber: "BR345678901",
    status: "entregue",
    estimatedDelivery: "2024-04-13",
    currentLocation: { lat: -16.6799, lng: -49.2550 },
    destination: "Av. 85, 1000 - Goiânia, GO",
    lastUpdate: "2024-04-13 11:45",
    customer: "Patricia Oliveira",
    contact: "(62) 98765-4321",
    value: 678.90,
    priority: "media",
    items: 1
  },
  {
    id: "DEL010",
    trackingNumber: "BR567890123",
    status: "atrasado",
    estimatedDelivery: "2024-04-14",
    currentLocation: { lat: -20.2976, lng: -40.2958 },
    destination: "Av. Nossa Senhora da Penha, 800 - Vitória, ES",
    lastUpdate: "2024-04-13 14:50",
    customer: "Ricardo Silva",
    contact: "(27) 98765-4321",
    value: 1234.50,
    notes: "Cliente não estava no local",
    priority: "alta",
    items: 2
  }
];

export const salesData = [
  { month: "Jul", sales: 180000, commission: 18000 },
  { month: "Ago", sales: 165000, commission: 16500 },
  { month: "Set", sales: 190000, commission: 19000 },
  { month: "Out", sales: 175000, commission: 17500 },
  { month: "Nov", sales: 320000, commission: 32000 }, // Black Friday boost
  { month: "Dez", sales: 210000, commission: 21000 },
];
