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
  const [hasSpun, setHasSpun] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setResult(null);
      setRotation(0);
      setHasSpun(false);
    }
  }, [isOpen]);

  const spinWheel = () => {
    if (isSpinning || hasSpun) return;
    
    setIsSpinning(true);
    setResult(null);
    
    const randomIndex = Math.floor(Math.random() * DISCOUNT_OPTIONS.length);
    const baseRotations = (Math.floor(Math.random() * 3) + 3) * 360;
    const resultRotation = (360 / DISCOUNT_OPTIONS.length) * randomIndex;
    const totalRotation = baseRotations + resultRotation;
    
    setRotation(totalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      const winAmount = DISCOUNT_OPTIONS[randomIndex];
      setResult(winAmount);
      setHasSpun(true);
      if (winAmount > 0) {
        onWin(winAmount);
      }
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
      <Card className="relative w-[90vw] max-w-md p-8 bg-gradient-to-br from-[#1A1F2C] to-[#2C3E50] rounded-xl shadow-2xl border-2 border-[#C5A656]">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold mb-3 bg-gradient-to-r from-[#C5A656] to-[#E6D5A7] bg-clip-text text-transparent">
            Roda da Sorte!
          </h3>
          <p className="text-[#E6D5A7]">
            Você desbloqueou {currentDiscountLevel - previousDiscountLevel} nova(s) chance(s) de girar!
          </p>
        </div>

        <div className="relative w-72 h-72 mx-auto mb-8">
          {/* Pointer triangle */}
          <div 
            className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 z-10"
            style={{
              background: '#C5A656',
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
            }}
          />
          
          {/* Roulette wheel */}
          <div 
            className="absolute inset-0 rounded-full border-4 border-[#C5A656] shadow-lg overflow-hidden"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: 'transform 3s cubic-bezier(0.4, 0, 0.2, 1)',
              backgroundImage: 'radial-gradient(circle at center, #2C3E50 0%, #1A1F2C 100%)',
            }}
          >
            {DISCOUNT_OPTIONS.map((discount, index) => {
              const angle = (360 / DISCOUNT_OPTIONS.length) * index;
              const isWinningSegment = discount > 0;
              return (
                <div
                  key={index}
                  className="absolute w-full h-full"
                  style={{
                    transform: `rotate(${angle}deg)`,
                    background: isWinningSegment ? '#4CAF50' : '#D32F2F',
                    clipPath: 'polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%)',
                  }}
                >
                  <div 
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      transform: `rotate(-${angle}deg) translateX(25%)`,
                    }}
                  >
                    <div className="flex flex-col items-center justify-center">
                      <span className="text-2xl font-bold text-white drop-shadow-lg mb-1">
                        {discount === 0 ? '0' : `R$${discount}`}
                      </span>
                      <span className="text-sm text-white/90 font-medium">
                        {discount === 0 ? 'Tente Novamente' : 'Desconto'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Center decoration */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#C5A656] flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-[#1A1F2C] border-2 border-[#C5A656]" />
            </div>
          </div>
        </div>

        {result !== null ? (
          <div className="text-center mb-6 animate-fade-in">
            <h4 className="text-2xl font-bold mb-2 text-[#E6D5A7]">
              {result === 0 
                ? 'Tente novamente!' 
                : `Parabéns! Você ganhou R$${result} de desconto!`}
            </h4>
            <Button 
              onClick={onClose}
              className="w-full bg-gradient-to-r from-[#C5A656] to-[#E6D5A7] hover:opacity-90 transition-opacity text-[#1A1F2C] font-semibold py-3 text-lg"
            >
              Aplicar desconto no projeto
            </Button>
          </div>
        ) : (
          <Button 
            onClick={spinWheel} 
            disabled={isSpinning || hasSpun}
            className="w-full bg-gradient-to-r from-[#C5A656] to-[#E6D5A7] hover:opacity-90 transition-opacity text-[#1A1F2C] font-semibold py-3 text-lg disabled:opacity-50"
          >
            {isSpinning ? 'Girando...' : hasSpun ? 'Roleta já utilizada' : 'Girar Roleta'}
          </Button>
        )}
      </Card>
    </div>
  );
};

export default DiscountRoulette;