import { useEffect, useState } from "react";
import { Task } from "@/types/calculator-types";

interface ConsoleOutputProps {
  implementationTasks: Task[];
  maintenanceTasks: Task[];
  implementationPrice: string;
  maintenancePrice: string;
  revenueShare: string;
  revenueSharePercent: string;
  totalHours: number;
}

const ConsoleOutput = ({
  implementationTasks,
  maintenanceTasks,
  implementationPrice,
  maintenancePrice,
  revenueShare,
  revenueSharePercent,
  totalHours,
}: ConsoleOutputProps) => {
  const [typedLines, setTypedLines] = useState<string[]>([]);
  
  useEffect(() => {
    const lines: string[] = [
      `console.log("🚀 === RESUMO DO PROJETO ===")`,
      ``,
      `console.log("💻 IMPLEMENTAÇÃO")`,
      ...implementationTasks.map(task => 
        `console.log("  - ${task.name}: ${task.hours}h")`,
      ),
      `console.log("💰 Total Implementação: R$ ${implementationPrice}")`,
      ``,
      `console.log("🔧 SUSTENTAÇÃO MENSAL")`,
      ...maintenanceTasks.map(task => 
        `console.log("  - ${task.name}: ${task.hours}h/mês")`,
      ),
      `console.log("💰 Total Mensal: R$ ${maintenancePrice}")`,
      ``,
      `console.log("📊 COMISSÃO SOBRE VENDAS")`,
      `console.log("  - Percentual: ${revenueSharePercent}%")`,
      `console.log("  - Valor Estimado: R$ ${revenueShare}/mês")`,
      ``,
      `console.log("⏱️ Total de Horas: ${totalHours}h")`,
    ];

    const typeLines = async () => {
      const duration = 2000;
      const delayPerLine = duration / lines.length;
      
      for (let i = 0; i <= lines.length; i++) {
        await new Promise(resolve => setTimeout(resolve, delayPerLine));
        setTypedLines(lines.slice(0, i));
      }
    };

    typeLines();
  }, [
    implementationTasks,
    maintenanceTasks,
    implementationPrice,
    maintenancePrice,
    revenueShare,
    revenueSharePercent,
    totalHours,
  ]);

  const getLineColor = (line: string) => {
    if (line.includes("IMPLEMENTAÇÃO") || line.includes("Total Implementação")) {
      return "text-purple-400";
    }
    if (line.includes("SUSTENTAÇÃO") || line.includes("Total Mensal")) {
      return "text-blue-400";
    }
    if (line.includes("COMISSÃO") || line.includes("Percentual") || line.includes("Valor Estimado")) {
      return "text-green-400";
    }
    return "text-white";
  };

  return (
    <div className="rounded-lg overflow-hidden shadow-xl bg-[#1A1F2C] border border-[#1A1F2C]/20">
      <div className="p-4 border-b border-[#1A1F2C]/20 bg-[#1A1F2C]/50 backdrop-blur-sm">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>
      </div>
      <div className="p-6 space-y-2 min-h-[200px] font-mono bg-gradient-to-br from-[#1A1F2C]/5 to-[#1A1F2C]/10 backdrop-blur-sm">
        {typedLines.map((line, index) => (
          <div 
            key={index}
            className={`text-sm ${getLineColor(line)}`}
          >
            {line}
          </div>
        ))}
        <div className="animate-pulse text-white">_</div>
      </div>
    </div>
  );
};

export default ConsoleOutput;