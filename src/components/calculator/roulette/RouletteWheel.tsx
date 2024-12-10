import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";

interface RouletteWheelProps {
  isSpinning: boolean;
  rotationDegrees: number;
  discountValues: number[];
}

const RouletteWheel = ({ isSpinning, rotationDegrees, discountValues }: RouletteWheelProps) => {
  return (
    <div className="relative w-72 h-72 mx-auto">
      {/* Outer ring with gradient and shadow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 shadow-xl" />
      
      {/* Spinning wheel */}
      <motion.div 
        className="absolute inset-0 rounded-full border-8 border-primary/30 bg-gradient-to-br from-white to-gray-100 shadow-inner overflow-hidden"
        animate={{ rotate: rotationDegrees }}
        transition={{ 
          duration: 4,
          ease: [0.34, 1.56, 0.64, 1],
          type: "spring",
          stiffness: 10,
          damping: 20
        }}
      >
        {discountValues.map((value, index) => {
          const rotation = (index * 360) / discountValues.length;
          return (
            <div
              key={value}
              className="absolute w-full h-full"
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              <div 
                className={cn(
                  "absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2",
                  "font-bold text-lg whitespace-nowrap",
                  index % 2 === 0 ? 'text-primary' : 'text-accent',
                )}
                style={{ transform: `rotate(-${rotation}deg)` }}
              >
                R${value}
              </div>
              {/* Segment divider lines */}
              <div 
                className="absolute top-0 left-1/2 h-full w-[2px] bg-gradient-to-b from-primary/20 to-transparent"
                style={{ transform: 'translateX(-50%)' }}
              />
            </div>
          );
        })}
      </motion.div>

      {/* Center decoration */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent shadow-lg flex items-center justify-center">
          <span className="text-white text-2xl">🎯</span>
        </div>
      </div>
    </div>
  );
};

export default RouletteWheel;