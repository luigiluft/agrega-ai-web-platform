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
  { value: 50, label: 'R$50', color: '#FF4D8D' },
  { value: 100, label: 'R$100', color: '#4A90E2' },
  { value: 150, label: 'R$150', color: '#FF4D8D' },
  { value: 200, label: 'R$200', color: '#4A90E2' },
  { value: 250, label: 'R$250', color: '#FF4D8D' },
  { value: 300, label: 'R$300', color: '#4A90E2' },
  { value: 350, label: 'R$350', color: '#FF4D8D' },
  { value: 400, label: 'R$400', color: '#4A90E2' }
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

  useEffect(() => {
    if (!isOpen) {
      setResult(null);
      setBallPosition(0);
      setHasSpun(false);
    }
  }, [isOpen]);

  const spinBall = () => {
    if (isSpinning || hasSpun) return;
    
    setIsSpinning(true);
    setResult(null);
    
    // Choose a random segment
    const randomIndex = Math.floor(Math.random() * DISCOUNT_OPTIONS.length);
    
    // Calculate final position (3-4 complete rotations + position of chosen segment)
    const spins = 3 + Math.random(); // Random number between 3 and 4
    const finalPosition = (spins * 360) + (360 / DISCOUNT_OPTIONS.length) * randomIndex;
    
    setBallPosition(finalPosition);

    // Wait for animation to complete before showing result
    setTimeout(() => {
      setIsSpinning(false);
      setResult(DISCOUNT_OPTIONS[randomIndex].value);
      setHasSpun(true);
      onWin(DISCOUNT_OPTIONS[randomIndex].value);
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

        {/* Results and buttons */}
        <div className="text-center space-y-4">
          {result !== null ? (
            <div className="animate-fade-in">
              <h4 className="text-xl font-bold mb-4">
                Parabéns! Você ganhou R${result} de desconto!
              </h4>
              <Button 
                onClick={onClose}
                className="w-full bg-green-500 hover:bg-green-600 text-white"
              >
                Aplicar desconto
              </Button>
            </div>
          ) : (
            <Button 
              onClick={spinBall}
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