import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";

interface RouletteWheelProps {
  isSpinning: boolean;
  rotationDegrees: number;
  discountValues: number[];
}

const RouletteWheel = ({ isSpinning, rotationDegrees, discountValues }: RouletteWheelProps) => {
  return (
    <div className="relative w-[300px] h-[300px] mx-auto">
      {/* Static pointer */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 w-8 h-12">
        <div className="w-full h-full bg-gradient-to-b from-primary to-primary/80 clip-triangle animate-pulse" />
      </div>

      {/* Outer decorative ring */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 via-accent/20 to-primary/20 animate-spin-slow" />
      
      {/* Main wheel */}
      <motion.div 
        className="absolute inset-[2px] rounded-full overflow-hidden shadow-xl bg-white"
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
              {/* Segment background */}
              <div 
                className={cn(
                  "absolute inset-0 origin-bottom-right",
                  isEven ? 'bg-gradient-to-t from-primary/10 to-transparent' : 'bg-gradient-to-t from-accent/10 to-transparent'
                )}
                style={{ 
                  transform: `rotate(${360 / discountValues.length}deg)`,
                }}
              />
              
              {/* Prize value */}
              <div 
                className={cn(
                  "absolute top-6 left-1/2 -translate-x-1/2",
                  "font-bold text-lg",
                  isEven ? 'text-primary' : 'text-accent'
                )}
                style={{ transform: `rotate(-${rotation}deg)` }}
              >
                <div className="bg-white/90 px-3 py-1 rounded-full shadow-sm border border-primary/20">
                  R${value}
                </div>
              </div>
            </div>
          );
        })}

        {/* Center decoration */}
        <div className="absolute inset-[35%] rounded-full bg-gradient-to-br from-primary via-accent to-primary shadow-inner flex items-center justify-center">
          <div className="text-3xl animate-bounce">🎁</div>
        </div>
      </motion.div>
    </div>
  );
};

export default RouletteWheel;