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
  const [ballPosition, setBallPosition] = useState({ x: 0, y: 0 });
  const [hasWon, setHasWon] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setSelectedValue(null);
      setRotationDegrees(0);
      setBallPosition({ x: 0, y: 0 });
      setHasWon(false);
    }
  }, [isOpen]);

  const calculateBallPosition = (angle: number) => {
    const radius = 100; // Radius of the circle in pixels
    const radians = (angle - 90) * (Math.PI / 180); // Convert to radians and offset by 90 degrees
    return {
      x: radius * Math.cos(radians),
      y: radius * Math.sin(radians)
    };
  };

  const spin = () => {
    if (isSpinning || hasWon) return;
    
    setIsSpinning(true);
    setSelectedValue(null);

    // Random number of full rotations (3-5 times) plus the final position
    const fullRotations = (3 + Math.random() * 2) * 360;
    const winningIndex = Math.floor(Math.random() * DISCOUNT_VALUES.length);
    const segmentAngle = 360 / DISCOUNT_VALUES.length;
    const finalAngle = winningIndex * segmentAngle;
    
    // Calculate total rotation including full rotations and final position
    const totalRotation = fullRotations + finalAngle;
    
    setRotationDegrees(totalRotation);

    // Animate ball position
    const animateBall = () => {
      let currentAngle = 0;
      const intervalId = setInterval(() => {
        currentAngle = (currentAngle + 10) % 360;
        setBallPosition(calculateBallPosition(currentAngle));
      }, 50);

      // Clear interval after animation
      setTimeout(() => {
        clearInterval(intervalId);
        const finalPosition = calculateBallPosition(finalAngle);
        setBallPosition(finalPosition);
      }, 3000);
    };

    animateBall();

    // Wait for animation to complete before showing result
    setTimeout(() => {
      setIsSpinning(false);
      setSelectedValue(DISCOUNT_VALUES[winningIndex]);
      setHasWon(true);
      onWin(DISCOUNT_VALUES[winningIndex]);
    }, 3000);
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
              <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                🎉 Roda da Sorte 🎉
              </h2>
              <p className="text-gray-600">
                Você desbloqueou {currentDiscountLevel - previousDiscountLevel} nova(s) chance(s) de desconto!
              </p>
            </div>

            <div className="relative w-64 h-64 mx-auto mb-8">
              {/* Roulette wheel background */}
              <motion.div 
                className="absolute inset-0 rounded-full border-8 border-primary bg-gradient-to-br from-white to-gray-100 shadow-inner overflow-hidden"
                animate={{ rotate: rotationDegrees }}
                transition={{ duration: 3, ease: "easeOut" }}
              >
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
                          ${index % 2 === 0 ? 'text-primary font-bold' : 'text-purple-600 font-semibold'} 
                          transform -rotate-${rotation} whitespace-nowrap text-lg`}
                        style={{ transform: `rotate(-${rotation}deg)` }}
                      >
                        R${value}
                      </div>
                    </div>
                  );
                })}
              </motion.div>

              {/* Spinning ball */}
              <motion.div
                className="absolute w-4 h-4 rounded-full bg-primary shadow-lg"
                style={{
                  top: "50%",
                  left: "50%",
                  x: ballPosition.x,
                  y: ballPosition.y,
                }}
                animate={{
                  scale: isSpinning ? [1, 1.2, 1] : 1,
                }}
                transition={{
                  duration: 0.5,
                  repeat: isSpinning ? Infinity : 0,
                }}
              />

              {/* Center pin */}
              <div className="absolute top-1/2 left-1/2 w-3 h-3 -mt-1.5 -ml-1.5 bg-primary rounded-full shadow-md" />
            </div>

            <div className="space-y-4">
              {selectedValue ? (
                <motion.div 
                  className="text-center space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-2xl font-bold text-primary">
                    Parabéns! 🎊
                  </h3>
                  <p className="text-lg">
                    Você ganhou R${selectedValue} de desconto!
                  </p>
                  <Button 
                    onClick={onClose}
                    className="w-full bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 text-white"
                  >
                    Aplicar Desconto
                  </Button>
                </motion.div>
              ) : (
                <Button
                  onClick={spin}
                  disabled={isSpinning}
                  className="w-full bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 text-white disabled:opacity-50"
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