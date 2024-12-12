import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Code, Clock, CheckCircle2, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

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
        return <AlertTriangle className="w-5 h-5 text-blue-500" />;
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
        <h2 className="text-2xl font-bold">Solicitações de Desenvolvimento</h2>
        <Button onClick={() => setIsAdding(true)} className="gap-2">
          <Code className="w-4 h-4" />
          Nova Solicitação
        </Button>
      </div>

      {isAdding && (
        <Card className="p-4 mb-6 border-primary">
          <h3 className="text-lg font-semibold mb-4">Nova Solicitação</h3>
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
      )}

      <div className="grid grid-cols-1 gap-4">
        {requests.map((request) => (
          <Card key={request.id} className="p-4">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-lg">{request.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{request.description}</p>
              </div>
              <div className="flex items-center gap-2">
                {getStatusIcon(request.status)}
                <span className="text-sm font-medium">{getStatusText(request.status)}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
              <span>Criado em: {request.createdAt}</span>
              <span>•</span>
              <span>Prazo: {request.deadline}</span>
              <span>•</span>
              <span className={`font-medium ${
                request.priority === "high" 
                  ? "text-red-500" 
                  : request.priority === "medium" 
                  ? "text-orange-500" 
                  : "text-green-500"
              }`}>
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
        ))}
      </div>
    </Card>
  );
};

export default DevelopmentRequests;