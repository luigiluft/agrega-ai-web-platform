import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

interface HoursSliderProps {
  value: number;
  onChange: (value: number) => void;
  label: string;
  max?: number;
}

const HoursSlider = ({ value, onChange, label, max = 100 }: HoursSliderProps) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <Label>{label}</Label>
        <span className="text-sm text-muted-foreground">{value} horas</span>
      </div>
      <Slider
        value={[value]}
        onValueChange={(values) => onChange(values[0])}
        max={max}
        step={1}
      />
    </div>
  );
};

export default HoursSlider;