import { useEffect, useState } from "react";
import { Extension } from "@/types/calculator-types";

type CodeLine = {
  code: string;
  type: 'layout' | 'maintenance' | 'meeting' | 'campaign' | 'functionality';
};

type DeveloperAnimationProps = {
  totalHours: number;
  layoutHours: number;
  maintenanceHours: number;
  meetingHours: number;
  campaignHours: number;
  functionalityHours: number;
  selectedPlanName: string;
  implementationPrice: string;
  maintenancePrice: string;
  revenueShare: string;
  revenueSharePercent: string;
  selectedExtensions?: Extension[];
};

const DeveloperAnimation = ({ 
  totalHours,
  layoutHours,
  maintenanceHours,
  meetingHours,
  campaignHours,
  functionalityHours,
  selectedPlanName,
  implementationPrice,
  maintenancePrice,
  revenueShare,
  revenueSharePercent,
  selectedExtensions = []
}: DeveloperAnimationProps) => {
  const [codeLines, setCodeLines] = useState<CodeLine[]>([]);
  const [typedText, setTypedText] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const newCodeLines: CodeLine[] = [];
    
    // Project header
    newCodeLines.push({ 
      code: `console.log("🚀 Resumo do Projeto - ${selectedPlanName}")`,
      type: 'layout' 
    });

    // Implementation section
    newCodeLines.push({ 
      code: `console.log("💻 === IMPLEMENTAÇÃO ===")`,
      type: 'layout' 
    });
    
    newCodeLines.push({ 
      code: `console.log("⚙️ Layout e Design: ${layoutHours}h")`,
      type: 'layout' 
    });
    
    newCodeLines.push({ 
      code: `console.log("🛠️ Funcionalidades: ${functionalityHours}h")`,
      type: 'functionality' 
    });
    
    newCodeLines.push({ 
      code: `console.log("👥 Reuniões: ${meetingHours}h")`,
      type: 'meeting' 
    });
    
    newCodeLines.push({ 
      code: `console.log("💰 Total Implementação: R$ ${implementationPrice}")`,
      type: 'layout' 
    });

    // Maintenance section
    newCodeLines.push({ 
      code: `console.log("\n🔧 === SUSTENTAÇÃO MENSAL ===")`,
      type: 'maintenance' 
    });
    
    newCodeLines.push({ 
      code: `console.log("🔄 Manutenção: ${maintenanceHours}h")`,
      type: 'maintenance' 
    });
    
    newCodeLines.push({ 
      code: `console.log("📢 Campanhas: ${campaignHours}h")`,
      type: 'campaign' 
    });
    
    newCodeLines.push({ 
      code: `console.log("💰 Total Mensal: R$ ${maintenancePrice}")`,
      type: 'maintenance' 
    });

    // Revenue share section
    newCodeLines.push({ 
      code: `console.log("\n💼 === COMISSÃO SOBRE VENDAS ===")`,
      type: 'functionality' 
    });
    
    newCodeLines.push({ 
      code: `console.log("📊 Percentual: ${revenueSharePercent}%")`,
      type: 'functionality' 
    });
    
    newCodeLines.push({ 
      code: `console.log("💰 Valor Estimado: R$ ${revenueShare}/mês")`,
      type: 'functionality' 
    });

    // Extensions summary if any
    if (selectedExtensions.length > 0) {
      newCodeLines.push({ 
        code: `console.log("\n🔌 === EXTENSÕES INCLUÍDAS ===")`,
        type: 'functionality' 
      });
      
      selectedExtensions.forEach(ext => {
        newCodeLines.push({ 
          code: `console.log("  - ${ext.name} (${ext.implementationHours}h impl. + ${ext.maintenanceHours}h/mês)")`,
          type: 'functionality' 
        });
      });
    }

    // Total hours
    newCodeLines.push({ 
      code: `console.log("\n⏱️ Total de Horas do Projeto: ${totalHours}h")`,
      type: 'layout' 
    });

    setCodeLines(newCodeLines);
    setIsTyping(true);
    setTypedText(new Array(newCodeLines.length).fill(''));
  }, [
    layoutHours,
    maintenanceHours,
    meetingHours,
    campaignHours,
    functionalityHours,
    implementationPrice,
    maintenancePrice,
    revenueShare,
    revenueSharePercent,
    selectedExtensions,
    totalHours,
    selectedPlanName
  ]);

  useEffect(() => {
    if (!isTyping) return;

    const typeCharacters = async () => {
      const duration = 4000;
      const totalChars = codeLines.reduce((sum, line) => sum + line.code.length, 0);
      const delayPerChar = duration / totalChars;

      for (let lineIndex = 0; lineIndex < codeLines.length; lineIndex++) {
        const line = codeLines[lineIndex];
        for (let charIndex = 0; charIndex <= line.code.length; charIndex++) {
          await new Promise(resolve => setTimeout(resolve, delayPerChar));
          setTypedText(prev => {
            const newTypedText = [...prev];
            newTypedText[lineIndex] = line.code.substring(0, charIndex);
            return newTypedText;
          });
        }
      }
      setIsTyping(false);
    };

    typeCharacters();
  }, [codeLines, isTyping]);

  const getTextColor = (type: string) => {
    switch (type) {
      case 'maintenance':
        return 'text-blue-400';
      case 'functionality':
        return 'text-green-400';
      case 'campaign':
        return 'text-yellow-400';
      case 'meeting':
        return 'text-orange-400';
      default:
        return 'text-purple-400';
    }
  };

  return (
    <div className="relative">
      <div className="rounded-lg overflow-hidden shadow-xl bg-[#1A1F2C] border border-[#1A1F2C]/20">
        <div className="p-4 border-b border-[#1A1F2C]/20 bg-[#1A1F2C]/50 backdrop-blur-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>
        </div>
        <div className="p-6 space-y-2 min-h-[200px] font-mono bg-gradient-to-br from-[#1A1F2C]/5 to-[#1A1F2C]/10 backdrop-blur-sm">
          {typedText.map((text, index) => (
            <div 
              key={index}
              className={`text-sm ${getTextColor(codeLines[index]?.type)}`}
            >
              {text}
            </div>
          ))}
          <div className="animate-pulse text-white">_</div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperAnimation;