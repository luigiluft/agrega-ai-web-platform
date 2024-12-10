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
  { value: 0, label: 'Tente Novamente', type: 'retry', color: '#FFA726' },
  { value: 50, label: 'R$50', type: 'win', color: '#4CAF50' },
  { value: 0, label: 'Não Ganhou', type: 'lose', color: '#D32F2F' },
  { value: 100, label: 'R$100', type: 'win', color: '#2196F3' },
  { value: 0, label: 'Tente Novamente', type: 'retry', color: '#FFA726' },
  { value: 200, label: 'R$200', type: 'win', color: '#9C27B0' },
  { value: 0, label: 'Não Ganhou', type: 'lose', color: '#D32F2F' },
  { value: 300, label: 'R$300', type: 'win', color: '#3F51B5' },
];

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
  const [canRetry, setCanRetry] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setResult(null);
      setRotation(0);
      setHasSpun(false);
      setCanRetry(false);
    }
  }, [isOpen]);

  const spinWheel = () => {
    if (isSpinning || (hasSpun && !canRetry)) return;
    
    setIsSpinning(true);
    setResult(null);
    
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * DISCOUNT_OPTIONS.length);
    } while (DISCOUNT_OPTIONS[randomIndex].type === 'lose');

    const baseRotations = (Math.floor(Math.random() * 3) + 5) * 360;
    const resultRotation = (360 / DISCOUNT_OPTIONS.length) * randomIndex;
    const totalRotation = baseRotations + resultRotation;
    
    setRotation(totalRotation);

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
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 animate-fade-in">
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
          {/* Pointer */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
            <div className="w-6 h-6 bg-[#C5A656] rotate-45 mb-1 shadow-lg" />
            <div className="text-[#C5A656] text-sm font-bold">PRÊMIO</div>
          </div>
          
          {/* Roulette wheel */}
          <div 
            className="absolute inset-0 rounded-full border-8 border-[#C5A656] shadow-2xl overflow-hidden"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)',
              backgroundImage: 'radial-gradient(circle at center, #2C3E50 0%, #1A1F2C 100%)',
            }}
          >
            {DISCOUNT_OPTIONS.map((option, index) => {
              const angle = (360 / DISCOUNT_OPTIONS.length) * index;
              
              return (
                <div
                  key={index}
                  className="absolute w-full h-full"
                  style={{
                    transform: `rotate(${angle}deg)`,
                    background: option.color,
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
                      <span className="text-xl font-bold text-white drop-shadow-lg mb-1">
                        {option.type === 'win' ? option.label : ''}
                      </span>
                      <span className="text-sm text-white font-medium px-2 text-center whitespace-nowrap">
                        {option.type !== 'win' ? option.label : 'Desconto'}
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
            <h4 className="text-2xl font-bold mb-4 text-[#E6D5A7]">
              {result === 0 
                ? (canRetry ? 'Tente mais uma vez!' : 'Não foi dessa vez!') 
                : `Parabéns! Você ganhou R$${result} de desconto!`}
            </h4>
            {(result > 0 || (!canRetry && result === 0)) && (
              <Button 
                onClick={onClose}
                className="w-full bg-gradient-to-r from-[#C5A656] to-[#E6D5A7] hover:opacity-90 transition-opacity text-[#1A1F2C] font-semibold py-3 text-lg"
              >
                Aplicar desconto no projeto
              </Button>
            )}
            {canRetry && (
              <Button 
                onClick={spinWheel}
                className="w-full bg-gradient-to-r from-[#FFA726] to-[#FFB74D] hover:opacity-90 transition-opacity text-[#1A1F2C] font-semibold py-3 text-lg"
              >
                Tentar Novamente
              </Button>
            )}
          </div>
        ) : (
          <Button 
            onClick={spinWheel} 
            disabled={isSpinning || (hasSpun && !canRetry)}
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