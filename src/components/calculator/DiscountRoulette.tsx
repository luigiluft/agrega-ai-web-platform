import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { useDrag } from '@use-gesture/react';

interface DiscountRouletteProps {
  isOpen: boolean;
  onClose: () => void;
  onWin: (amount: number) => void;
  previousDiscountLevel: number;
  currentDiscountLevel: number;
}

const DISCOUNT_OPTIONS = [
  { value: 50, label: 'R$50', type: 'win', color: '#4A90E2' },
  { value: 0, label: 'Tente Novamente', type: 'retry', color: '#F5A623' },
  { value: 150, label: 'R$150', type: 'win', color: '#7ED321' },
  { value: 0, label: 'Não Ganhou', type: 'lose', color: '#D0021B' },
  { value: 200, label: 'R$200', type: 'win', color: '#9013FE' },
  { value: 0, label: 'Tente Novamente', type: 'retry', color: '#F5A623' },
  { value: 100, label: 'R$100', type: 'win', color: '#50E3C2' },
  { value: 0, label: 'Não Ganhou', type: 'lose', color: '#D0021B' },
  { value: 300, label: 'R$300', type: 'win', color: '#BD10E0' },
  { value: 0, label: 'Tente Novamente', type: 'retry', color: '#F5A623' },
  { value: 75, label: 'R$75', type: 'win', color: '#4A90E2' },
  { value: 0, label: 'Não Ganhou', type: 'lose', color: '#D0021B' },
  { value: 250, label: 'R$250', type: 'win', color: '#7ED321' },
  { value: 0, label: 'Tente Novamente', type: 'retry', color: '#F5A623' },
  { value: 125, label: 'R$125', type: 'win', color: '#50E3C2' },
  { value: 0, label: 'Não Ganhou', type: 'lose', color: '#D0021B' },
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
  const [dragRotation, setDragRotation] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setResult(null);
      setRotation(0);
      setHasSpun(false);
      setCanRetry(false);
      setDragRotation(0);
    }
  }, [isOpen]);

  const spinWheel = (initialVelocity = 2) => {
    if (isSpinning || (hasSpun && !canRetry)) return;
    
    setIsSpinning(true);
    setResult(null);
    
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * DISCOUNT_OPTIONS.length);
    } while (DISCOUNT_OPTIONS[randomIndex].type === 'lose');

    const baseRotations = (Math.floor(Math.random() * 3) + 5) * 360;
    const resultRotation = (360 / DISCOUNT_OPTIONS.length) * randomIndex;
    const totalRotation = baseRotations + resultRotation + (initialVelocity * 360);
    
    setRotation(prevRotation => prevRotation + totalRotation);

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

  const bindDrag = useDrag(({ movement: [x, y], velocity: [vx, vy], last }) => {
    if (isSpinning) return;
    
    const angle = Math.atan2(y, x);
    const degrees = (angle * 180) / Math.PI;
    
    if (!last) {
      setDragRotation(degrees);
    } else if (Math.abs(vx) > 0.1 || Math.abs(vy) > 0.1) {
      const velocity = Math.sqrt(vx * vx + vy * vy);
      spinWheel(velocity);
    }
  });

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
          <p className="text-sm text-[#E6D5A7] mt-2">
            Arraste para girar!
          </p>
        </div>

        <div className="relative w-80 h-80 mx-auto mb-8">
          {/* Pointer */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-20">
            <div className="w-8 h-8 bg-[#C5A656] rotate-45 shadow-lg" />
          </div>
          
          {/* Roulette wheel */}
          <div 
            {...bindDrag()}
            className="absolute inset-0 rounded-full border-8 border-[#C5A656] shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing touch-none"
            style={{
              transform: `rotate(${rotation + dragRotation}deg)`,
              transition: isSpinning ? 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none',
              backgroundImage: 'radial-gradient(circle at center, #2C3E50 0%, #1A1F2C 100%)',
            }}
          >
            {DISCOUNT_OPTIONS.map((option, index) => {
              const angle = (360 / DISCOUNT_OPTIONS.length) * index;
              const segmentAngle = 360 / DISCOUNT_OPTIONS.length;
              
              return (
                <div
                  key={index}
                  className="absolute w-full h-full origin-center"
                  style={{
                    transform: `rotate(${angle}deg)`,
                    background: option.color,
                    clipPath: `polygon(50% 0%, ${50 + 50 * Math.cos((segmentAngle * Math.PI) / 180)}% ${50 + 50 * Math.sin((segmentAngle * Math.PI) / 180)}%, 50% 50%)`,
                  }}
                >
                  <div 
                    className="absolute top-0 left-1/2 w-full h-full -translate-x-1/2 flex items-center justify-center"
                    style={{
                      transform: `rotate(-${angle}deg)`,
                    }}
                  >
                    <div 
                      className="flex flex-col items-center justify-center text-white w-full px-2"
                      style={{
                        transform: 'translateY(-40%)',
                      }}
                    >
                      {option.type === 'win' ? (
                        <span className="text-lg font-bold whitespace-nowrap rotate-180">
                          {option.label}
                        </span>
                      ) : (
                        <span className="text-sm font-semibold whitespace-nowrap rotate-180">
                          {option.label}
                        </span>
                      )}
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

        {result !== null && (
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
                onClick={() => spinWheel()}
                className="w-full bg-gradient-to-r from-[#FFA726] to-[#FFB74D] hover:opacity-90 transition-opacity text-[#1A1F2C] font-semibold py-3 text-lg"
              >
                Tentar Novamente
              </Button>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};

export default DiscountRoulette;