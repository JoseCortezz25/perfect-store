'use client';

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface StepSliderProps {
  label: string;
  icons?: readonly ReactNode[];
  steps: readonly string[];
  value: number;
  onChange: (value: number) => void;
}

export function StepSlider({
  label,
  icons,
  steps,
  value,
  onChange
}: StepSliderProps) {
  return (
    <div className="step-slider">
      <span className="step-slider__label">{label}</span>
      <div className="step-slider__body">
        <div className="step-slider__track" aria-hidden="true" />
        <div className="step-slider__ticks">
          {steps.map((step, i) => (
            <button
              key={step}
              type="button"
              className={cn(
                'step-slider__tick',
                i === value && 'step-slider__tick--active'
              )}
              onClick={() => onChange(i)}
              aria-label={step}
              aria-pressed={i === value}
            >
              {icons?.[i] ? (
                <span className="step-slider__icon" aria-hidden="true">
                  {icons[i]}
                </span>
              ) : (
                <span className="step-slider__dot" aria-hidden="true" />
              )}
              <span className="step-slider__tick-label">{step}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
