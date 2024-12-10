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
  const [rotationDegrees, setRotationDegrees] = useState(0);
  const [hasWon, setHasWon] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setSelectedValue(null);
      setRotationDegrees(0);
      setHasWon(false);
    }
  }, [isOpen]);

  const spin = () => {
    if (isSpinning || hasWon) return;
    
    setIsSpinning(true);
    setSelectedValue(null);

    // Random number of full rotations (3-4 times) plus the final position
    const fullRotations = (3 + Math.random()) * 360;
    const winningIndex = Math.floor(Math.random() * DISCOUNT_VALUES.length);
    const segmentAngle = 360 / DISCOUNT_VALUES.length;
    const finalAngle = winningIndex * segmentAngle;
    
    // Calculate total rotation including full rotations and final position
    const totalRotation = fullRotations + finalAngle;
    
    setRotationDegrees(totalRotation);

    // Wait for animation to complete before showing result
    setTimeout(() => {
      setIsSpinning(false);
      setSelectedValue(DISCOUNT_VALUES[winningIndex]);
      setHasWon(true);
      onWin(DISCOUNT_VALUES[winningIndex]);
    }, 3000); // Match this with animation duration
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
            <div className="text-center space-y-4 mb-8">
              <h2 className="text-3xl font-bold text-primary">
                🎉 Roda da Sorte 🎉
              </h2>
              <p className="text-gray-600">
                Você desbloqueou {currentDiscountLevel - previousDiscountLevel} nova(s) chance(s) de desconto!
              </p>
            </div>

            <div className="relative w-64 h-64 mx-auto mb-8">
              {/* Roulette wheel background */}
              <div className="absolute inset-0 rounded-full border-8 border-primary bg-white shadow-inner">
                {DISCOUNT_VALUES.map((value, index) => {
                  const rotation = (index * 360) / DISCOUNT_VALUES.length;
                  return (
                    <div
                      key={value}
                      className="absolute w-full h-full"
                      style={{
                        transform: `rotate(${rotation}deg)`,
                      }}
                    >
                      <div 
                        className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 
                          ${index % 2 === 0 ? 'text-primary' : 'text-accent'} 
                          font-bold transform -rotate-${rotation} whitespace-nowrap`}
                      >
                        R${value}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Spinning pointer */}
              <motion.div
                className="absolute top-1/2 left-1/2 w-4 h-4 -mt-2 -ml-2"
                animate={{ 
                  rotate: rotationDegrees,
                }}
                transition={{
                  duration: 3,
                  ease: "easeOut",
                }}
              >
                <div className="w-4 h-4 bg-primary rounded-full shadow-lg" />
              </motion.div>
            </div>

            <div className="space-y-4">
              {selectedValue ? (
                <div className="text-center animate-fade-up space-y-4">
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
                  {isSpinning ? "Girando..." : "Girar"}
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