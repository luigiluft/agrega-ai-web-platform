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
};

const DeveloperAnimation = ({ 
  totalHours,
  layoutHours,
  maintenanceHours,
  meetingHours,
  campaignHours,
  functionalityHours
}: DeveloperAnimationProps) => {
  const [codeLines, setCodeLines] = useState<CodeLine[]>([]);
  const [animationSpeed, setAnimationSpeed] = useState(1000);
  
  const getCodeLineForType = (type: CodeLine['type']): string => {
    switch(type) {
      case 'layout':
        return `const layout = createLayout({ responsive: true, hours: ${layoutHours} });`;
      case 'maintenance':
        return `await performMaintenance({ duration: ${maintenanceHours}h });`;
      case 'meeting':
        return `schedule.addMeetings({ hours: ${meetingHours} });`;
      case 'campaign':
        return `marketing.createCampaign({ duration: ${campaignHours}h });`;
      case 'functionality':
        return `features.implement({ complexity: "high", hours: ${functionalityHours} });`;
      default:
        return '';
    }
  };

  useEffect(() => {
    setAnimationSpeed(Math.max(300, 1000 - (totalHours * 5)));

    const newCodeLines: CodeLine[] = [];
    
    if (layoutHours > 0) {
      newCodeLines.push({ code: getCodeLineForType('layout'), type: 'layout' });
    }
    if (maintenanceHours > 0) {
      newCodeLines.push({ code: getCodeLineForType('maintenance'), type: 'maintenance' });
    }
    if (meetingHours > 0) {
      newCodeLines.push({ code: getCodeLineForType('meeting'), type: 'meeting' });
    }
    if (campaignHours > 0) {
      newCodeLines.push({ code: getCodeLineForType('campaign'), type: 'campaign' });
    }
    if (functionalityHours > 0) {
      newCodeLines.push({ code: getCodeLineForType('functionality'), type: 'functionality' });
    }

    setCodeLines(newCodeLines);
  }, [layoutHours, maintenanceHours, meetingHours, campaignHours, functionalityHours, totalHours]);

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
        <div className="p-6 space-y-2 min-h-[200px]">
          {codeLines.map((line, index) => (
            <div 
              key={index}
              className="text-primary-light font-mono text-sm animate-slide-in"
              style={{
                animationDelay: `${index * 0.2}s`,
                opacity: 0,
                animation: `slideIn 0.5s ease-out ${index * 0.2}s forwards`
              }}
            >
              {line.code}
            </div>
          ))}
          <div 
            className="animate-pulse text-primary-light font-mono"
            style={{ 
              animationDuration: `${animationSpeed}ms`,
            }}
          >
            _
          </div>
        </div>
      </div>
      
      {totalHours >= 50 && (
        <div className="absolute top-full mt-4 w-full">
          <div className="bg-gradient-to-r from-primary to-accent text-white p-4 rounded-lg animate-bounce shadow-lg">
            <p className="text-sm font-medium">Funcionalidade desbloqueada! 🎉</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeveloperAnimation;