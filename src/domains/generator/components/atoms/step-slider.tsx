'use client';

interface StepSliderProps {
  label: string;
  steps: readonly string[];
  value: number;
  onChange: (value: number) => void;
}

export function StepSlider({ label, steps, value, onChange }: StepSliderProps) {
  return (
    <div className="step-slider">
      <div className="step-slider__header">
        <span className="step-slider__label">{label}</span>
        <span className="step-slider__current">{steps[value]}</span>
      </div>
      <input
        type="range"
        className="step-slider__input"
        min={0}
        max={steps.length - 1}
        step={1}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        aria-label={label}
        aria-valuetext={steps[value]}
      />
      <div className="step-slider__labels">
        <span>{steps[0]}</span>
        <span>{steps[steps.length - 1]}</span>
      </div>
    </div>
  );
}
