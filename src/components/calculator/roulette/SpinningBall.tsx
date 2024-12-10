import { motion } from 'framer-motion';

interface SpinningBallProps {
  isSpinning: boolean;
  ballPosition: { x: number; y: number };
}

const SpinningBall = ({ isSpinning, ballPosition }: SpinningBallProps) => {
  return (
    <motion.div
      className="absolute w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent shadow-lg z-10"
      style={{
        top: "50%",
        left: "50%",
        x: ballPosition.x,
        y: ballPosition.y,
      }}
      animate={{
        scale: isSpinning ? [1, 1.2, 1] : 1,
        boxShadow: isSpinning 
          ? "0px 0px 8px rgba(139, 92, 246, 0.6)" 
          : "0px 0px 4px rgba(139, 92, 246, 0.3)",
      }}
      transition={{
        duration: 0.5,
        repeat: isSpinning ? Infinity : 0,
      }}
    >
      <motion.div 
        className="absolute inset-0 rounded-full bg-white/30"
        animate={{
          opacity: isSpinning ? [0.3, 0.6, 0.3] : 0.3
        }}
        transition={{
          duration: 0.5,
          repeat: isSpinning ? Infinity : 0,
        }}
      />
    </motion.div>
  );
};

export default SpinningBall;