import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

interface RouletteCardProps {
  isOpen: boolean;
  onClose: () => void;
  selectedValue: number | null;
  isSpinning: boolean;
  onSpin: () => void;
  children: React.ReactNode;
  previousDiscountLevel: number;
  currentDiscountLevel: number;
}

const RouletteCard = ({ 
  isOpen, 
  onClose, 
  selectedValue, 
  isSpinning, 
  onSpin,
  children,
  previousDiscountLevel,
  currentDiscountLevel,
}: RouletteCardProps) => {
  const showConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50">
      <AnimatePresence>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="w-[90vw] max-w-lg"
        >
          <Card className="p-8 bg-gradient-to-br from-background via-background/95 to-background/90 rounded-xl shadow-2xl border border-primary/20">
            <div className="text-center space-y-4 mb-8">
              <motion.div 
                className="space-y-2"
                animate={{ 
                  scale: [1, 1.05, 1],
                  opacity: [0.8, 1, 0.8] 
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <h2 className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  🎉 Roda da Sorte 🎉
                </h2>
                <div className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-primary/20 to-accent/20">
                  <p className="text-lg font-medium bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {currentDiscountLevel - previousDiscountLevel} nova(s) chance(s) de desconto!
                  </p>
                </div>
              </motion.div>
            </div>

            {children}

            <div className="space-y-6 mt-8">
              {selectedValue ? (
                <motion.div 
                  className="text-center space-y-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  onAnimationComplete={showConfetti}
                >
                  <motion.div 
                    className="bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 p-8 rounded-xl"
                    animate={{
                      scale: [1, 1.05, 1],
                      borderRadius: ["0.75rem", "1rem", "0.75rem"],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <h3 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
                      Parabéns! 🎊
                    </h3>
                    <div className="inline-block bg-white px-6 py-3 rounded-full shadow-lg border border-primary/20">
                      <p className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        Você ganhou R${selectedValue} de desconto!
                      </p>
                    </div>
                  </motion.div>
                  <Button 
                    onClick={onClose}
                    className="w-full h-14 text-lg bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white shadow-lg"
                  >
                    Aplicar Desconto
                  </Button>
                </motion.div>
              ) : (
                <Button
                  onClick={onSpin}
                  disabled={isSpinning}
                  className="w-full h-14 text-lg bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSpinning ? (
                    <motion.span
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      Girando...
                    </motion.span>
                  ) : (
                    "Girar"
                  )}
                </Button>
              )}
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default RouletteCard;