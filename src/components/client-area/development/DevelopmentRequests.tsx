import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Code, Clock, CheckCircle2, AlertTriangle, Calendar, Rocket, Bug } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface Request {
  id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
  createdAt: string;
  deadline: string;
}

const DevelopmentRequests = () => {
  const [requests, setRequests] = useState<Request[]>([
    {
      id: "1",
      title: "Integração com Gateway de Pagamento",
      description: "Implementar integração com API do PagSeguro",
      status: "in-progress",
      priority: "high",
      createdAt: "2024-03-15",
      deadline: "2024-04-15"
    },
    {
      id: "2",
      title: "Otimização de Performance",
      description: "Melhorar tempo de carregamento das páginas",
      status: "pending",
      priority: "medium",
      createdAt: "2024-03-10",
      deadline: "2024-04-10"
    }
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newRequest, setNewRequest] = useState({
    title: "",
    description: "",
    priority: "medium",
    deadline: ""
  });

  const handleAddRequest = () => {
    if (!newRequest.title || !newRequest.description || !newRequest.deadline) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    const request: Request = {
      id: Date.now().toString(),
      title: newRequest.title,
      description: newRequest.description,
      status: "pending",
      priority: newRequest.priority as "low" | "medium" | "high",
      createdAt: new Date().toISOString().split('T')[0],
      deadline: newRequest.deadline
    };

    setRequests([...requests, request]);
    setIsAdding(false);
    setNewRequest({ title: "", description: "", priority: "medium", deadline: "" });
    toast.success("Solicitação criada com sucesso!");
  };

  const getStatusIcon = (status: Request["status"]) => {
    switch (status) {
      case "pending":
        return <Clock className="w-5 h-5 text-orange-500" />;
      case "in-progress":
        return <Rocket className="w-5 h-5 text-blue-500" />;
      case "completed":
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
    }
  };

  const getStatusText = (status: Request["status"]) => {
    switch (status) {
      case "pending":
        return "Pendente";
      case "in-progress":
        return "Em Desenvolvimento";
      case "completed":
        return "Concluído";
    }
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Bug className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Solicitações de Desenvolvimento</h2>
        </div>
        <Button onClick={() => setIsAdding(true)} className="gap-2">
          <Code className="w-4 h-4" />
          Nova Solicitação
        </Button>
      </div>

      {isAdding && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <Card className="p-4 mb-6 border-primary">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Code className="w-5 h-5 text-primary" />
              Nova Solicitação
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Título</label>
                <Input
                  value={newRequest.title}
                  onChange={(e) => setNewRequest({ ...newRequest, title: e.target.value })}
                  placeholder="Título da solicitação"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Descrição</label>
                <Textarea
                  value={newRequest.description}
                  onChange={(e) => setNewRequest({ ...newRequest, description: e.target.value })}
                  placeholder="Descreva sua solicitação"
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Prioridade</label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={newRequest.priority}
                    onChange={(e) => setNewRequest({ ...newRequest, priority: e.target.value })}
                  >
                    <option value="low">Baixa</option>
                    <option value="medium">Média</option>
                    <option value="high">Alta</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Data Limite</label>
                  <Input
                    type="date"
                    value={newRequest.deadline}
                    onChange={(e) => setNewRequest({ ...newRequest, deadline: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button onClick={handleAddRequest}>Enviar Solicitação</Button>
              <Button variant="outline" onClick={() => setIsAdding(false)}>Cancelar</Button>
            </div>
          </Card>
        </motion.div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {requests.map((request) => (
          <motion.div
            key={request.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-4 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{request.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{request.description}</p>
                </div>
                <div className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-full">
                  {getStatusIcon(request.status)}
                  <span className="text-sm font-medium">{getStatusText(request.status)}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Criado em: {request.createdAt}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  Prazo: {request.deadline}
                </span>
                <span className={`flex items-center gap-1 font-medium ${
                  request.priority === "high" 
                    ? "text-red-500" 
                    : request.priority === "medium" 
                    ? "text-orange-500" 
                    : "text-green-500"
                }`}>
                  <AlertTriangle className="w-4 h-4" />
                  Prioridade {
                    request.priority === "high" 
                      ? "Alta" 
                      : request.priority === "medium" 
                      ? "Média" 
                      : "Baixa"
                  }
                </span>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </Card>
  );
};

export default DevelopmentRequests;