import { useEffect, useState } from "react";

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

const getRandomLayoutAction = () => {
  const actions = [
    "Criando Banner Promocional",
    "Melhorando Imagens",
    "Adicionando Menu Responsivo",
    "Otimizando Layout Mobile",
    "Personalizando Cores da Marca",
    "Implementando Carrossel",
  ];
  return actions[Math.floor(Math.random() * actions.length)];
};

const getRandomMaintenanceAction = () => {
  const actions = [
    "Corrigindo Bugs",
    "Adicionando Produtos",
    "Otimizando Performance",
    "Atualizando Sistema",
    "Backup de Dados",
  ];
  return actions[Math.floor(Math.random() * actions.length)];
};

const getRandomMeetingAction = () => {
  const actions = [
    "Planejando Sprint",
    "Alinhando Requisitos",
    "Review de Features",
    "Definindo Prioridades",
    "Workshop de UX",
  ];
  return actions[Math.floor(Math.random() * actions.length)];
};

const getRandomCampaignAction = () => {
  const actions = [
    "Configurando SEO",
    "Integrando Analytics",
    "Setup de Remarketing",
    "Criando Landing Page",
    "Otimizando Conversão",
  ];
  return actions[Math.floor(Math.random() * actions.length)];
};

const getRandomFunctionalityAction = () => {
  const actions = [
    "Implementando Checkout",
    "Integrando Gateway",
    "Sistema de Busca",
    "Área do Cliente",
    "Gestão de Pedidos",
  ];
  return actions[Math.floor(Math.random() * actions.length)];
};

const DeveloperAnimation = ({ 
  totalHours,
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
  
  const getCodeLineForType = (type: CodeLine['type'], action: string): string => {
    switch(type) {
      case 'layout':
        return `const layout = createLayout({ action: "${action}", hours: ${layoutHours} });`;
      case 'maintenance':
        return `await performMaintenance({ task: "${action}", duration: ${maintenanceHours}h });`;
      case 'meeting':
        return `schedule.addMeetings({ topic: "${action}", hours: ${meetingHours} });`;
      case 'campaign':
        return `marketing.createCampaign({ type: "${action}", duration: ${campaignHours}h });`;
      case 'functionality':
        return `features.implement({ task: "${action}", hours: ${functionalityHours} });`;
      default:
        return '';
    }
  };

  useEffect(() => {
    const newCodeLines: CodeLine[] = [];
    
    // Always show Hello Client line
    if (selectedPlanName) {
      newCodeLines.push({ 
        code: `console.log("Hello Client! Welcome to ${selectedPlanName} Plan");`,
        type: 'layout' 
      });
    }
    
    if (layoutHours > 0) {
      newCodeLines.push({ 
        code: getCodeLineForType('layout', getRandomLayoutAction()),
        type: 'layout' 
      });
    }
    if (maintenanceHours > 0) {
      newCodeLines.push({ 
        code: getCodeLineForType('maintenance', getRandomMaintenanceAction()),
        type: 'maintenance' 
      });
    }
    if (meetingHours > 0) {
      newCodeLines.push({ 
        code: getCodeLineForType('meeting', getRandomMeetingAction()),
        type: 'meeting' 
      });
    }
    if (campaignHours > 0) {
      newCodeLines.push({ 
        code: getCodeLineForType('campaign', getRandomCampaignAction()),
        type: 'campaign' 
      });
    }
    if (functionalityHours > 0) {
      newCodeLines.push({ 
        code: getCodeLineForType('functionality', getRandomFunctionalityAction()),
        type: 'functionality' 
      });
    }

    setCodeLines(newCodeLines);
    setIsTyping(true);
    setTypedText(new Array(newCodeLines.length).fill(''));
  }, [layoutHours, maintenanceHours, meetingHours, campaignHours, functionalityHours, selectedPlanName]);

  useEffect(() => {
    if (!isTyping) return;

    const typeCharacters = async () => {
      const duration = 4000; // 4 seconds total
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
      <div className="rounded-lg overflow-hidden shadow-xl bg-secondary border border-secondary/20">
        <div className="p-4 border-b border-secondary/20 bg-secondary/50">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>
        </div>
        <div className="p-6 space-y-2 min-h-[200px] font-mono">
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