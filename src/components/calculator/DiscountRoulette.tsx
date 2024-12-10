import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { motion, AnimatePresence } from 'framer-motion';

interface DiscountRouletteProps {
  isOpen: boolean;
  onClose: () => void;
  onWin: (amount: number) => void;
  previousDiscountLevel: number;
  currentDiscountLevel: number;
}

const DISCOUNT_VALUES = [50, 100, 150, 200, 250, 300, 350, 400];

const DiscountRoulette = ({ 
  isOpen, 
  onClose, 
  onWin,
  previousDiscountLevel,
  currentDiscountLevel,
}: DiscountRouletteProps) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedValue, setSelectedValue] = useState<number | null>(null);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [hasWon, setHasWon] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setSelectedValue(null);
      setHighlightedIndex(0);
      setHasWon(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isSpinning) {
      const interval = setInterval(() => {
        setHighlightedIndex(prev => (prev + 1) % DISCOUNT_VALUES.length);
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isSpinning]);

  const spin = () => {
    if (isSpinning || hasWon) return;
    
    setIsSpinning(true);
    setSelectedValue(null);

    // Random spins between 20-30 times
    const spins = 20 + Math.floor(Math.random() * 10);
    let currentSpin = 0;

    const spinInterval = setInterval(() => {
      currentSpin++;
      
      if (currentSpin >= spins) {
        clearInterval(spinInterval);
        const winningIndex = Math.floor(Math.random() * DISCOUNT_VALUES.length);
        setHighlightedIndex(winningIndex);
        setSelectedValue(DISCOUNT_VALUES[winningIndex]);
        setIsSpinning(false);
        setHasWon(true);
        onWin(DISCOUNT_VALUES[winningIndex]);
      }
    }, 100);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <AnimatePresence>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", duration: 0.5 }}
        >
          <Card className="w-[90vw] max-w-md p-8 bg-white rounded-xl shadow-2xl">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-primary">
                🎉 Roda da Sorte 🎉
              </h2>
              <p className="text-gray-600">
                Você desbloqueou {currentDiscountLevel - previousDiscountLevel} nova(s) chance(s) de desconto!
              </p>
            </div>

            <div className="mt-8 grid grid-cols-4 gap-2">
              {DISCOUNT_VALUES.map((value, index) => (
                <div
                  key={value}
                  className={`
                    relative p-4 rounded-lg border-2 transition-all duration-200
                    ${highlightedIndex === index 
                      ? 'border-primary bg-primary/10 scale-105' 
                      : 'border-gray-200 bg-white'
                    }
                  `}
                >
                  <div className="text-center font-bold">
                    R${value}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 space-y-4">
              {selectedValue ? (
                <div className="text-center animate-fade-in space-y-4">
                  <h3 className="text-2xl font-bold text-primary">
                    Parabéns! 🎊
                  </h3>
                  <p className="text-lg">
                    Você ganhou R${selectedValue} de desconto!
                  </p>
                  <Button 
                    onClick={onClose}
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    Aplicar Desconto
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={spin}
                  disabled={isSpinning}
                  className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50"
                >
                  {isSpinning ? "Sorteando..." : "Girar"}
                </Button>
              )}
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default DiscountRoulette;