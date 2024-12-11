import { useEffect, useState } from "react";
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
};

const getRandomSnippet = (snippets: string[]) => {
  return snippets[Math.floor(Math.random() * snippets.length)];
};

const DeveloperAnimation = ({ 
  layoutHours,
  maintenanceHours,
  meetingHours,
  campaignHours,
  functionalityHours,
  selectedPlanName
}: DeveloperAnimationProps) => {
  const [codeLines, setCodeLines] = useState<CodeLine[]>([]);
  const [typedText, setTypedText] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  
  const getCodeLineForType = (type: CodeLine['type']): string => {
    switch(type) {
      case 'layout':
        return getRandomSnippet(layoutSnippets);
      case 'maintenance':
        return getRandomSnippet(maintenanceSnippets);
      case 'meeting':
        return getRandomSnippet(meetingSnippets);
      case 'campaign':
        return getRandomSnippet(campaignSnippets);
      case 'functionality':
        return getRandomSnippet(functionalitySnippets);
      default:
        return '';
    }
  };

  useEffect(() => {
    const newCodeLines: CodeLine[] = [];
    
    // Always show welcome message with selected plan
    if (selectedPlanName) {
      newCodeLines.push({ 
        code: `console.log("🚀 Iniciando projeto: ${selectedPlanName}");`,
        type: 'layout' 
      });
    }
    
    if (layoutHours > 0) {
      newCodeLines.push({ 
        code: `// Personalizando layout - ${layoutHours}h\n${getCodeLineForType('layout')}`,
        type: 'layout' 
      });
    }
    if (functionalityHours > 0) {
      newCodeLines.push({ 
        code: `// Implementando funcionalidades - ${functionalityHours}h\n${getCodeLineForType('functionality')}`,
        type: 'functionality' 
      });
    }
    if (maintenanceHours > 0) {
      newCodeLines.push({ 
        code: `// Configurando manutenção - ${maintenanceHours}h\n${getCodeLineForType('maintenance')}`,
        type: 'maintenance' 
      });
    }
    if (meetingHours > 0) {
      newCodeLines.push({ 
        code: `// Agendando reuniões - ${meetingHours}h\n${getCodeLineForType('meeting')}`,
        type: 'meeting' 
      });
    }
    if (campaignHours > 0) {
      newCodeLines.push({ 
        code: `// Planejando campanhas - ${campaignHours}h\n${getCodeLineForType('campaign')}`,
        type: 'campaign' 
      });
    }

    setCodeLines(newCodeLines);
    setIsTyping(true);
    setTypedText(new Array(newCodeLines.length).fill(''));
  }, [layoutHours, maintenanceHours, meetingHours, campaignHours, functionalityHours, selectedPlanName]);

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
      <div className="rounded-lg overflow-hidden shadow-xl bg-gradient-to-br from-secondary/80 to-secondary border border-secondary/20">
        <div className="p-4 border-b border-secondary/20 bg-secondary/50 backdrop-blur-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>
        </div>
        <div className="p-6 space-y-2 min-h-[200px] font-mono bg-gradient-to-br from-secondary/5 to-secondary/10 backdrop-blur-sm">
          {typedText.map((text, index) => (
            <div 
              key={index}
              className="text-primary-light text-sm"
            >
              {text}
            </div>
          ))}
          <div className="animate-pulse text-primary-light">_</div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperAnimation;