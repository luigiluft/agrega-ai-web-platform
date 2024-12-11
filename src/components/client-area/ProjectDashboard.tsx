import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Clock, CheckCircle2, AlertCircle, FileText, MessageSquare } from "lucide-react";

const ProjectDashboard = () => {
  const projectProgress = 35;
  const nextDeadline = "20/05/2024";
  const pendingTasks = 3;
  const completedTasks = 2;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Progresso Geral</h3>
          <Clock className="w-5 h-5 text-primary" />
        </div>
        <Progress value={projectProgress} className="mb-2" />
        <p className="text-sm text-gray-500">{projectProgress}% concluído</p>
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Próxima Entrega</h3>
          <FileText className="w-5 h-5 text-primary" />
        </div>
        <p className="text-2xl font-bold text-primary">{nextDeadline}</p>
        <p className="text-sm text-gray-500">Design e Layout</p>
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Tarefas</h3>
          <CheckCircle2 className="w-5 h-5 text-primary" />
        </div>
        <div className="flex justify-between">
          <div>
            <p className="text-2xl font-bold text-green-500">{completedTasks}</p>
            <p className="text-sm text-gray-500">Concluídas</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-orange-500">{pendingTasks}</p>
            <p className="text-sm text-gray-500">Pendentes</p>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Suporte</h3>
          <MessageSquare className="w-5 h-5 text-primary" />
        </div>
        <button className="w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
          Abrir Chamado
        </button>
      </Card>
    </div>
  );
};

export default ProjectDashboard;