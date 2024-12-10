import { useEffect, useState } from "react";

type DeveloperAnimationProps = {
  totalHours: number;
}

const DeveloperAnimation = ({ totalHours }: DeveloperAnimationProps) => {
  const [codeLines, setCodeLines] = useState<string[]>([]);
  
  useEffect(() => {
    const lines = [
      "function createFeature() {",
      "  const newFeature = {",
      "    title: 'Amazing Feature',",
      "    status: 'in-progress'",
      "  };",
      "  return newFeature;",
      "}"
    ];
    
    const interval = setInterval(() => {
      setCodeLines(prev => {
        if (prev.length >= lines.length) {
          return [lines[0]];
        }
        return [...prev, lines[prev.length]];
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      <div className="rounded-lg overflow-hidden shadow-xl bg-black">
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
        </div>
        <div className="p-6 space-y-2">
          {codeLines.map((line, index) => (
            <div 
              key={index}
              className="text-green-400 font-mono text-sm animate-fade-in"
              style={{ 
                animationDelay: `${index * 0.2}s`,
                transform: `translateX(${Math.sin(Date.now() / 1000 + index) * 2}px)`
              }}
            >
              {line}
            </div>
          ))}
          <div className="animate-pulse text-green-400 font-mono">_</div>
        </div>
      </div>
      
      {totalHours >= 50 && (
        <div className="absolute top-full mt-4 w-full">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-lg animate-bounce shadow-lg">
            <p className="text-sm font-medium">Nova funcionalidade desbloqueada! 🎉</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeveloperAnimation;