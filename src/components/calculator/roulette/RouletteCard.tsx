import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from 'framer-motion';

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
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <AnimatePresence>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", duration: 0.5 }}
        >
          <Card className="w-[90vw] max-w-md p-8 bg-gradient-to-br from-background to-background/95 rounded-xl shadow-2xl border border-primary/20">
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
                <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  🎉 Roda da Sorte 🎉
                </h2>
                <div className="inline-block px-4 py-2 rounded-full bg-primary/10">
                  <p className="text-primary font-medium">
                    {currentDiscountLevel - previousDiscountLevel} nova(s) chance(s) de desconto!
                  </p>
                </div>
              </motion.div>
            </div>

            {children}

            <div className="space-y-4 mt-8">
              {selectedValue ? (
                <motion.div 
                  className="text-center space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-6 rounded-xl">
                    <h3 className="text-2xl font-bold text-primary mb-2">
                      Parabéns! 🎊
                    </h3>
                    <div className="inline-block bg-white px-4 py-2 rounded-full shadow-lg">
                      <p className="text-lg font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        Você ganhou R${selectedValue} de desconto!
                      </p>
                    </div>
                  </div>
                  <Button 
                    onClick={onClose}
                    className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white"
                  >
                    Aplicar Desconto
                  </Button>
                </motion.div>
              ) : (
                <Button
                  onClick={onSpin}
                  disabled={isSpinning}
                  className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white disabled:opacity-50"
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

export default RouletteCard;