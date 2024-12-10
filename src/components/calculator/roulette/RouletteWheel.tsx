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
          const isEven = index % 2 === 0;
          return (
            <div
              key={value}
              className="absolute w-full h-full"
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              <div 
                className={cn(
                  "absolute top-0 left-1/2 -translate-x-1/2 h-full",
                  "flex items-start justify-center pt-4",
                  "font-bold text-lg whitespace-nowrap",
                  isEven ? 'text-primary' : 'text-accent',
                )}
                style={{ transform: `rotate(-${rotation}deg)` }}
              >
                <span className="bg-white/80 px-2 py-1 rounded-full shadow-sm">
                  R${value}
                </span>
              </div>
              {/* Segment divider lines */}
              <div 
                className={cn(
                  "absolute top-0 left-1/2 h-full w-[2px]",
                  isEven ? "bg-primary/20" : "bg-accent/20"
                )}
                style={{ transform: 'translateX(-50%)' }}
              />
            </div>
          );
        })}
      </motion.div>

      {/* Center decoration and pointer */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent shadow-lg flex items-center justify-center z-10">
          <span className="text-white text-2xl">🎯</span>
        </div>
      </div>

      {/* Pointer */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 z-20">
        <div className="w-8 h-8 flex justify-center">
          <motion.div
            className="w-4 h-8 bg-white shadow-lg rounded-b-full"
            animate={{
              scale: isSpinning ? [1, 1.2, 1] : 1,
            }}
            transition={{
              duration: 0.5,
              repeat: isSpinning ? Infinity : 0,
            }}
          >
            <div className="w-full h-full bg-gradient-to-b from-primary to-accent rounded-b-full" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RouletteWheel;