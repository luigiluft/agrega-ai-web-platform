import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

interface DiscountRouletteProps {
  isOpen: boolean;
  onClose: () => void;
  onWin: (amount: number) => void;
  previousDiscountLevel: number;
  currentDiscountLevel: number;
}

const DISCOUNT_OPTIONS = [
  { value: 50, label: 'R$50', type: 'win', color: '#FF4D8D' },
  { value: 0, label: 'Tente Novamente', type: 'retry', color: '#4A90E2' },
  { value: 150, label: 'R$150', type: 'win', color: '#FF4D8D' },
  { value: 0, label: 'Não Ganhou', type: 'lose', color: '#4A90E2' },
  { value: 200, label: 'R$200', type: 'win', color: '#FF4D8D' },
  { value: 0, label: 'Tente Novamente', type: 'retry', color: '#4A90E2' },
  { value: 100, label: 'R$100', type: 'win', color: '#FF4D8D' },
  { value: 0, label: 'Não Ganhou', type: 'lose', color: '#4A90E2' }
];

const DiscountRoulette = ({ 
  isOpen, 
  onClose, 
  onWin,
  previousDiscountLevel,
  currentDiscountLevel,
}: DiscountRouletteProps) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [ballPosition, setBallPosition] = useState(0);
  const [result, setResult] = useState<number | null>(null);
  const [hasSpun, setHasSpun] = useState(false);
  const [canRetry, setCanRetry] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setResult(null);
      setBallPosition(0);
      setHasSpun(false);
      setCanRetry(false);
    }
  }, [isOpen]);

  const spinBall = () => {
    if (isSpinning || (hasSpun && !canRetry)) return;
    
    setIsSpinning(true);
    setResult(null);
    
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * DISCOUNT_OPTIONS.length);
    } while (DISCOUNT_OPTIONS[randomIndex].type === 'lose');

    const spins = 3 + Math.random(); // Random number between 3 and 4 spins
    const finalPosition = (spins * 360) + (360 / DISCOUNT_OPTIONS.length) * randomIndex;
    
    setBallPosition(finalPosition);

    setTimeout(() => {
      setIsSpinning(false);
      const result = DISCOUNT_OPTIONS[randomIndex];
      setResult(result.value);
      setHasSpun(true);
      setCanRetry(result.type === 'retry');
      if (result.value > 0) {
        onWin(result.value);
      }
    }, 4000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <Card className="relative w-[90vw] max-w-md p-8 bg-white rounded-xl shadow-2xl">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-2">
            Roda da Sorte!
          </h3>
          <p className="text-gray-600">
            Você desbloqueou {currentDiscountLevel - previousDiscountLevel} nova(s) chance(s)!
          </p>
        </div>

        <div className="relative w-64 h-64 mx-auto mb-8">
          {/* Static Wheel */}
          <div className="absolute inset-0 rounded-full border-4 border-gray-200 overflow-hidden">
            {DISCOUNT_OPTIONS.map((option, index) => {
              const angle = (360 / DISCOUNT_OPTIONS.length) * index;
              return (
                <div
                  key={index}
                  className="absolute w-full h-full origin-center"
                  style={{
                    transform: `rotate(${angle}deg)`,
                    background: option.color,
                    clipPath: 'polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%)',
                  }}
                >
                  <div 
                    className="absolute top-0 left-1/2 -translate-x-1/2 text-center pt-4 text-white font-bold text-sm w-full"
                    style={{ transform: `rotate(-${angle}deg)` }}
                  >
                    {option.label}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Spinning Ball */}
          <div 
            className="absolute w-4 h-4 bg-white rounded-full shadow-lg"
            style={{
              left: '50%',
              top: '0',
              transform: `translateX(-50%) rotate(${ballPosition}deg) translateY(120px)`,
              transition: isSpinning ? 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none',
            }}
          />

          {/* Center decoration */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gray-800" />
          </div>
        </div>

        {/* Results display */}
        <div className="text-center space-y-4">
          {result !== null && (
            <div className="animate-fade-in">
              <h4 className="text-xl font-bold mb-4">
                {result === 0 
                  ? (canRetry ? "Tente mais uma vez!" : "Não foi dessa vez!") 
                  : `Parabéns! Você ganhou R$${result} de desconto!`}
              </h4>
              {(result > 0 || (!canRetry && result === 0)) && (
                <Button 
                  onClick={onClose}
                  className="w-full bg-green-500 hover:bg-green-600 text-white"
                >
                  Aplicar desconto
                </Button>
              )}
              {canRetry && (
                <Button 
                  onClick={() => spinBall()}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                >
                  Tentar Novamente
                </Button>
              )}
            </div>
          )}
          {result === null && (
            <Button 
              onClick={() => spinBall()}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white"
              disabled={isSpinning}
            >
              {isSpinning ? "Girando..." : "Girar Roleta"}
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default DiscountRoulette;