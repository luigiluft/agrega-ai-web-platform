import { useState, useEffect } from 'react';
import RouletteWheel from './roulette/RouletteWheel';
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

  useEffect(() => {
    if (!isOpen) {
      setSelectedValue(null);
      setRotationDegrees(0);
    }
  }, [isOpen]);

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
      </div>
    </RouletteCard>
  );
};

export default DiscountRoulette;