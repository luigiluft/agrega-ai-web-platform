import { useEffect, useState } from "react";

type DeveloperAnimationProps = {
  totalHours: number;
}

const DeveloperAnimation = ({ totalHours }: DeveloperAnimationProps) => {
  const [codeLines, setCodeLines] = useState<string[]>([]);
  const [animationSpeed, setAnimationSpeed] = useState(1000);
  
  useEffect(() => {
    // Adjust animation speed based on total hours
    setAnimationSpeed(Math.max(300, 1000 - (totalHours * 5)));

    const lines = [
      "function buildFeature() {",
      "  const feature = {",
      "    title: 'Amazing Feature',",
      "    complexity: 'high',",
      "    status: 'in-progress'",
      "  };",
      "  return feature;",
      "}",
      "// Adding new functionality...",
      "class WebsiteBuilder {",
      "  constructor() {",
      "    this.features = [];",
      "  }",
      "  deploy() {",
      "    console.log('🚀');",
      "  }",
      "}"
    ];
    
    // Show more code lines based on total hours
    const visibleLines = Math.min(Math.floor(totalHours / 10) + 3, lines.length);
    
    const interval = setInterval(() => {
      setCodeLines(prev => {
        if (prev.length >= visibleLines) {
          return lines.slice(0, visibleLines);
        }
        return [...prev, lines[prev.length]];
      });
    }, animationSpeed);
    
    return () => clearInterval(interval);
  }, [totalHours, animationSpeed]);

  const getTypingAnimation = (index: number) => {
    const delay = index * 0.1;
    const translateX = Math.sin((Date.now() / 1000 + index) * (totalHours / 50)) * 2;
    return {
      animationDelay: `${delay}s`,
      transform: `translateX(${translateX}px)`,
    };
  };

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
              style={getTypingAnimation(index)}
            >
              {line}
            </div>
          ))}
          <div 
            className="animate-pulse text-green-400 font-mono"
            style={{ 
              animationDuration: `${animationSpeed}ms`,
              transform: `translateX(${Math.sin(Date.now() / 1000) * 2}px)`
            }}
          >
            _
          </div>
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