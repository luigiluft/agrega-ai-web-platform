import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

interface DiscountRouletteProps {
  isOpen: boolean;
  onClose: () => void;
  onWin: (amount: number) => void;
  previousDiscountLevel: number;
  currentDiscountLevel: number;
}

const DISCOUNT_OPTIONS = [0, 50, 100, 150, 200, 250];

const DiscountRoulette = ({ 
  isOpen, 
  onClose, 
  onWin,
  previousDiscountLevel,
  currentDiscountLevel,
}: DiscountRouletteProps) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setResult(null);
      setRotation(0);
    }
  }, [isOpen]);

  const spinWheel = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setResult(null);
    
    // Random number of full rotations (3-5) plus the position for the result
    const randomIndex = Math.floor(Math.random() * DISCOUNT_OPTIONS.length);
    const baseRotations = (Math.floor(Math.random() * 3) + 3) * 360;
    const resultRotation = (360 / DISCOUNT_OPTIONS.length) * randomIndex;
    const totalRotation = baseRotations + resultRotation;
    
    setRotation(totalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      const winAmount = DISCOUNT_OPTIONS[randomIndex];
      setResult(winAmount);
      if (winAmount > 0) {
        onWin(winAmount);
      }
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
      <Card className="relative w-[90vw] max-w-md p-8 bg-gradient-to-br from-background to-secondary/5 rounded-xl shadow-2xl">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold mb-3 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
            Roda da Sorte!
          </h3>
          <p className="text-muted-foreground">
            Você desbloqueou {currentDiscountLevel - previousDiscountLevel} nova(s) chance(s) de girar!
          </p>
        </div>

        <div className="relative w-72 h-72 mx-auto mb-8">
          <div 
            className="absolute inset-0 rounded-full border-8 border-primary shadow-lg overflow-hidden"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: 'transform 3s cubic-bezier(0.4, 0, 0.2, 1)',
              backgroundImage: 'conic-gradient(from 0deg, #f472b6, #ec4899, #db2777, #be185d, #9d174d, #831843)',
            }}
          >
            {DISCOUNT_OPTIONS.map((discount, index) => {
              const angle = (360 / DISCOUNT_OPTIONS.length) * index;
              return (
                <div
                  key={index}
                  className="absolute w-full h-full text-white flex items-center justify-center text-lg font-bold"
                  style={{
                    transform: `rotate(${angle}deg)`,
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center transform -rotate-[${angle}deg]">
                    {discount === 0 ? 'Tente\nNovamente' : `R$${discount}`}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-6 h-6 bg-primary transform rotate-45 shadow-md" />
        </div>

        {result !== null ? (
          <div className="text-center mb-6 animate-fade-in">
            <h4 className="text-2xl font-bold mb-2">
              {result === 0 
                ? 'Tente novamente!' 
                : `Parabéns! Você ganhou R$${result} de desconto!`}
            </h4>
          </div>
        ) : null}

        <Button 
          onClick={spinWheel} 
          disabled={isSpinning}
          className="w-full bg-gradient-to-r from-primary to-primary-dark hover:opacity-90 transition-opacity text-white font-semibold py-3 text-lg"
        >
          {isSpinning ? 'Girando...' : 'Girar Roleta'}
        </Button>
      </Card>
    </div>
  );
};

export default DiscountRoulette;