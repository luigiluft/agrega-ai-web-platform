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
      <Card className="relative w-[90vw] max-w-md p-6 bg-white rounded-xl shadow-xl">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold mb-2">Roda da Sorte!</h3>
          <p className="text-gray-600">
            Você desbloqueou {currentDiscountLevel - previousDiscountLevel} nova(s) chance(s) de girar!
          </p>
        </div>

        <div className="relative w-64 h-64 mx-auto mb-6">
          <div 
            className="absolute inset-0 rounded-full border-8 border-primary"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: 'transform 3s cubic-bezier(0.4, 0, 0.2, 1)',
              backgroundImage: 'conic-gradient(from 0deg, #f472b6, #ec4899, #db2777, #be185d, #9d174d, #831843)',
            }}
          >
            {DISCOUNT_OPTIONS.map((discount, index) => (
              <div
                key={index}
                className="absolute w-full h-full text-white flex items-center justify-center text-sm font-bold"
                style={{
                  transform: `rotate(${(360 / DISCOUNT_OPTIONS.length) * index}deg)`,
                }}
              >
                {discount === 0 ? 'Tente\nNovamente' : `R$${discount}`}
              </div>
            ))}
          </div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-4 h-4 bg-primary transform rotate-45" />
        </div>

        {result !== null ? (
          <div className="text-center mb-6">
            <h4 className="text-xl font-bold mb-2">
              {result === 0 
                ? 'Tente novamente!' 
                : `Parabéns! Você ganhou R$${result} de desconto!`}
            </h4>
          </div>
        ) : null}

        <Button 
          onClick={spinWheel} 
          disabled={isSpinning}
          className="w-full"
        >
          {isSpinning ? 'Girando...' : 'Girar Roleta'}
        </Button>
      </Card>
    </div>
  );
};

export default DiscountRoulette;