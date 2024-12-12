import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Code2, AlertCircle, CheckCircle2, Clock, ArrowUpCircle } from "lucide-react";
import { motion } from "framer-motion";

interface DevelopmentRequest {
  id: string;
  title: string;
  description: string;
  status: "pending" | "in_progress" | "completed" | "high_priority";
  date: string;
  type: "feature" | "bug" | "improvement";
}

const DevelopmentRequests = () => {
  const [requests] = useState<DevelopmentRequest[]>([
    {
      id: "1",
      title: "Integração com Marketplace",
      description: "Implementar integração com principais marketplaces para sincronização automática de produtos e pedidos",
      status: "in_progress",
      date: "2024-03-15",
      type: "feature"
    },
    {
      id: "2",
      title: "Otimização de Checkout",
      description: "Melhorar performance e reduzir steps do processo de checkout",
      status: "completed",
      date: "2024-03-10",
      type: "improvement"
    },
    {
      id: "3",
      title: "Bug no Carrinho",
      description: "Corrigir erro ao adicionar produto com variação ao carrinho",
      status: "high_priority",
      date: "2024-03-18",
      type: "bug"
    },
    {
      id: "4",
      title: "Sistema de Recomendação",
      description: "Implementar sistema de recomendação de produtos baseado em IA",
      status: "pending",
      date: "2024-03-20",
      type: "feature"
    },
    {
      id: "5",
      title: "Área de Avaliações",
      description: "Desenvolver sistema de avaliações e comentários para produtos",
      status: "in_progress",
      date: "2024-03-17",
      type: "feature"
    },
    {
      id: "6",
      title: "Relatórios Avançados",
      description: "Criar dashboard com relatórios avançados de vendas e métricas",
      status: "pending",
      date: "2024-03-22",
      type: "improvement"
    },
    {
      id: "7",
      title: "PWA Mobile",
      description: "Transformar a loja em um Progressive Web App",
      status: "in_progress",
      date: "2024-03-16",
      type: "feature"
    },
    {
      id: "8",
      title: "Erro no Filtro",
      description: "Corrigir bug no filtro de produtos por categoria",
      status: "completed",
      date: "2024-03-12",
      type: "bug"
    }
  ]);

  return (
    <div className="space-y-4">
      {requests.map((request) => (
        <motion.div key={request.id} layout>
          <Card className="p-4 flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{request.title}</h3>
              <p className="text-sm text-gray-500">{request.description}</p>
              <Badge variant={request.status === "high_priority" ? "destructive" : "default"}>
                {request.status.replace("_", " ").toUpperCase()}
              </Badge>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="ml-2 text-sm text-gray-500">{request.date}</span>
            </div>
          </Card>
        </motion.div>
      ))}
      <Button variant="outline" className="w-full">
        <Plus className="mr-2" />
        Adicionar Solicitação
      </Button>
    </div>
  );
};

export default DevelopmentRequests;