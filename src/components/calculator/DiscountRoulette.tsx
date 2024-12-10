import { useState, useEffect } from 'react';
import RouletteWheel from './roulette/RouletteWheel';
import SpinningBall from './roulette/SpinningBall';
import RouletteCard from './roulette/RouletteCard';

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

  useEffect(() => {
    if (!isOpen) {
      setSelectedValue(null);
      setRotationDegrees(0);
      setBallPosition({ x: 0, y: 0 });
    }
  }, [isOpen]);

  const calculateBallPosition = (angle: number) => {
    const radius = 120;
    const radians = (angle - 90) * (Math.PI / 180);
    return {
      x: radius * Math.cos(radians),
      y: radius * Math.sin(radians)
    };
  };

  const spin = () => {
    if (isSpinning || selectedValue !== null) return;
    
    setIsSpinning(true);
    setSelectedValue(null);

    const fullRotations = (3 + Math.random() * 2) * 360;
    const winningIndex = Math.floor(Math.random() * DISCOUNT_VALUES.length);
    const segmentAngle = 360 / DISCOUNT_VALUES.length;
    const finalAngle = winningIndex * segmentAngle;
    const totalRotation = fullRotations + finalAngle;
    
    setRotationDegrees(totalRotation);

    const animateBall = () => {
      let currentAngle = 0;
      const intervalId = setInterval(() => {
        currentAngle = (currentAngle + 15) % 360;
        setBallPosition(calculateBallPosition(currentAngle));
      }, 50);

      setTimeout(() => {
        clearInterval(intervalId);
        const finalPosition = calculateBallPosition(finalAngle);
        setBallPosition(finalPosition);
      }, 4000);
    };

    animateBall();

    setTimeout(() => {
      setIsSpinning(false);
      setSelectedValue(DISCOUNT_VALUES[winningIndex]);
      onWin(DISCOUNT_VALUES[winningIndex]);
    }, 4000);
  };

  return (
    <RouletteCard
      isOpen={isOpen}
      onClose={onClose}
      selectedValue={selectedValue}
      isSpinning={isSpinning}
      onSpin={spin}
      previousDiscountLevel={previousDiscountLevel}
      currentDiscountLevel={currentDiscountLevel}
    >
      <div className="relative">
        <RouletteWheel 
          isSpinning={isSpinning}
          rotationDegrees={rotationDegrees}
          discountValues={DISCOUNT_VALUES}
        />
        <SpinningBall 
          isSpinning={isSpinning}
          ballPosition={ballPosition}
        />
      </div>
    </RouletteCard>
  );
};

export default DiscountRoulette;