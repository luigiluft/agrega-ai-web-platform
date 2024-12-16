import { useEffect, useState } from "react";
import { Extension } from "@/types/calculator-types";
import { 
  layoutSnippets,
  functionalitySnippets,
  maintenanceSnippets,
  meetingSnippets,
  campaignSnippets
} from "@/utils/codeSnippets";

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
    
    // Project summary
    newCodeLines.push({ 
      code: `console.log("🚀 Resumo do Projeto:")`,
      type: 'layout' 
    });

    // Implementation details
    newCodeLines.push({ 
      code: `console.log("💻 Implementação: R$ ${implementationPrice}")`,
      type: 'layout' 
    });

    // Maintenance details
    newCodeLines.push({ 
      code: `console.log("🔧 Manutenção Mensal: R$ ${maintenancePrice}")`,
      type: 'maintenance' 
    });

    // Revenue share
    newCodeLines.push({ 
      code: `console.log("💰 Comissão sobre vendas: ${revenueSharePercent}% (aprox. R$ ${revenueShare}/mês)")`,
      type: 'functionality' 
    });

    // Hours breakdown
    newCodeLines.push({ 
      code: `console.log("⏱️ Horas de Implementação: ${layoutHours + functionalityHours}h")`,
      type: 'layout' 
    });

    newCodeLines.push({ 
      code: `console.log("⏱️ Horas de Manutenção Mensal: ${maintenanceHours}h")`,
      type: 'maintenance' 
    });

    // Extensions summary
    if (selectedExtensions.length > 0) {
      newCodeLines.push({ 
        code: `console.log("🔌 Extensões incluídas:")`,
        type: 'functionality' 
      });
      
      selectedExtensions.forEach(ext => {
        newCodeLines.push({ 
          code: `console.log("  - ${ext.name}")`,
          type: 'functionality' 
        });
      });
    }

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
    selectedExtensions
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
              className={`text-sm ${
                codeLines[index]?.type === 'maintenance' 
                  ? 'text-blue-400' 
                  : codeLines[index]?.type === 'functionality'
                    ? 'text-green-400'
                    : 'text-purple-400'
              }`}
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