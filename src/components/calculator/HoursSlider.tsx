import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

interface HoursSliderProps {
  value: number;
  onChange: (value: number) => void;
  label: string;
  max?: number;
  icon?: React.ReactNode;
}

const HoursSlider = ({ value, onChange, label, max = 100, icon }: HoursSliderProps) => {
  return (
    <div className="space-y-3 p-4 rounded-lg bg-secondary/5 border border-secondary/10 hover:border-primary/20 transition-colors">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          {icon && <span className="text-primary/80">{icon}</span>}
          <Label className="font-medium">{label}</Label>
        </div>
        <span className="text-sm text-muted-foreground bg-secondary/20 px-2 py-1 rounded">
          {value}h
        </span>
      </div>
      <Slider
        value={[value]}
        onValueChange={(values) => onChange(values[0])}
        max={max}
        step={1}
        className="[&_.relative]:h-2 [&_[role=slider]]:h-4 [&_[role=slider]]:w-4 [&_[role=slider]]:border-primary"
      />
    </div>
  );
};

export default HoursSlider;