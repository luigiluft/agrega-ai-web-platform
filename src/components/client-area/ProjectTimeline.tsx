import { motion } from "framer-motion";
import { Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

interface TimelineStep {
  title: string;
  description: string;
  status: "completed" | "in-progress" | "pending";
  date: string;
}

const ProjectTimeline = () => {
  const steps: TimelineStep[] = [
    {
      title: "Briefing e Configuração",
      description: "Definição do escopo e requisitos do projeto",
      status: "completed",
      date: "10/05/2024"
    },
    {
      title: "Design e Layout",
      description: "Desenvolvimento do design e experiência do usuário",
      status: "in-progress",
      date: "20/05/2024"
    },
    {
      title: "Desenvolvimento",
      description: "Implementação das funcionalidades",
      status: "pending",
      date: "05/06/2024"
    },
    {
      title: "Testes",
      description: "Verificação de qualidade e performance",
      status: "pending",
      date: "15/06/2024"
    },
    {
      title: "Entrega",
      description: "Lançamento e finalização do projeto",
      status: "pending",
      date: "30/06/2024"
    }
  ];

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Linha do Tempo do Projeto</h2>
      <div className="space-y-4">
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative pl-8 pb-8 last:pb-0"
          >
            <div className="absolute left-0 top-0 h-full">
              <div className="h-full w-px bg-gray-200 relative">
                <div
                  className={`absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full ${
                    step.status === "completed"
                      ? "bg-green-500"
                      : step.status === "in-progress"
                      ? "bg-blue-500"
                      : "bg-gray-300"
                  }`}
                />
              </div>
            </div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">{step.title}</h3>
              <span className="text-sm text-gray-500">{step.date}</span>
            </div>
            <p className="text-gray-600 mb-2">{step.description}</p>
            <div className="flex items-center gap-2">
              {step.status === "completed" && (
                <span className="flex items-center gap-1 text-green-500">
                  <CheckCircle2 className="w-4 h-4" />
                  Concluído
                </span>
              )}
              {step.status === "in-progress" && (
                <span className="flex items-center gap-1 text-blue-500">
                  <Clock className="w-4 h-4" />
                  Em Andamento
                </span>
              )}
              {step.status === "pending" && (
                <span className="flex items-center gap-1 text-gray-500">
                  <AlertCircle className="w-4 h-4" />
                  Pendente
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
};

export default ProjectTimeline;