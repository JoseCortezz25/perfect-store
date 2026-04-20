'use client';

import { useRef, useSyncExternalStore } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, X } from 'lucide-react';
import { ChipSelector } from '../atoms/chip-selector';
import { StepSlider } from '../atoms/step-slider';
import { generatorStore } from '../../stores/generator.store';
import { generatorMessages } from '../../messages';
import type {
  ImageType,
  ImageAngle,
  AspectRatio,
  ImageQuality,
  GeneratedImage
} from '../../generator.types';

const msgs = generatorMessages.config;
const ctxMsgs = msgs.context;

const MOCK_ACCENT_COLORS = ['#4361EF', '#A78BFA', '#2DD4BF', '#FBB024'];

function buildPromptPreview(
  freeText: string,
  elements: string[],
  atmospheric: string[],
  dayStep: string,
  prominenceStep: string
): string {
  const parts: string[] = [];
  if (elements.length > 0) parts.push(elements.join(', ').toLowerCase());
  if (atmospheric.length > 0) parts.push(atmospheric.join(', ').toLowerCase());
  if (dayStep) parts.push(dayStep.toLowerCase());
  if (prominenceStep) parts.push(prominenceStep.toLowerCase());
  if (freeText.trim()) parts.push(freeText.trim());
  return parts.join(' · ');
}

export function ConfigPanel() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);

  const config = useSyncExternalStore(
    generatorStore.subscribe,
    generatorStore.getConfig,
    generatorStore.getConfig
  );

  const isGenerating = useSyncExternalStore(
    generatorStore.subscribe,
    generatorStore.getIsGenerating,
    generatorStore.getIsGenerating
  );

  function toggleChip(
    field: 'elementChips' | 'atmosphericChips',
    value: string
  ) {
    const current = config[field];
    const next = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    generatorStore.setConfig({ [field]: next });
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) generatorStore.setConfig({ referenceImageName: file.name });
  }

  function handleGenerate() {
    if (config.selectedSkus.length === 0) return;
    generatorStore.setIsGenerating(true);

    const images: GeneratedImage[] = Array.from({ length: 4 }, (_, i) => ({
      id: `img-${Date.now()}-${i}`,
      accentColor: MOCK_ACCENT_COLORS[i % MOCK_ACCENT_COLORS.length]
    }));

    setTimeout(() => {
      generatorStore.setImages(images);
      generatorStore.setIsGenerating(false);
      router.push('/generator/results');
    }, 1800);
  }

  const promptPreview = buildPromptPreview(
    config.freeText,
    config.elementChips,
    config.atmosphericChips,
    ctxMsgs.dayMoment.steps[config.dayMoment] ?? '',
    ctxMsgs.prominence.steps[config.prominence] ?? ''
  );

  const canGenerate = config.selectedSkus.length > 0 && !isGenerating;

  return (
    <div className="config-panel">
      {/* Reference image */}
      <div className="config-section">
        <span className="config-label">{msgs.referenceImage.label}</span>
        <p className="config-hint">{msgs.referenceImage.hint}</p>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="config-file-input"
          onChange={handleFileChange}
          aria-label={msgs.referenceImage.label}
        />
        {config.referenceImageName ? (
          <div className="config-file-preview">
            <span className="config-file-name">
              {config.referenceImageName}
            </span>
            <button
              type="button"
              className="config-file-remove"
              onClick={() =>
                generatorStore.setConfig({ referenceImageName: null })
              }
              aria-label={msgs.referenceImage.remove}
            >
              <X size={12} strokeWidth={2} />
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="config-upload-btn"
            onClick={() => fileRef.current?.click()}
          >
            <Upload size={14} strokeWidth={1.5} aria-hidden="true" />
            {msgs.referenceImage.cta}
          </button>
        )}
      </div>

      {/* Image type */}
      <div className="config-section">
        <span className="config-label">{msgs.imageType.label}</span>
        <div className="config-options">
          {(Object.keys(msgs.imageType.options) as ImageType[]).map(type => (
            <button
              key={type}
              type="button"
              className={`config-option${config.imageType === type ? 'config-option--active' : ''}`}
              onClick={() => generatorStore.setConfig({ imageType: type })}
              aria-pressed={config.imageType === type}
            >
              {msgs.imageType.options[type]}
            </button>
          ))}
        </div>
      </div>

      {/* Angle */}
      <div className="config-section">
        <span className="config-label">{msgs.angle.label}</span>
        <div className="config-options">
          {(Object.keys(msgs.angle.options) as ImageAngle[]).map(angle => (
            <button
              key={angle}
              type="button"
              className={`config-option${config.angle === angle ? 'config-option--active' : ''}`}
              onClick={() => generatorStore.setConfig({ angle })}
              aria-pressed={config.angle === angle}
            >
              {msgs.angle.options[angle]}
            </button>
          ))}
        </div>
      </div>

      {/* Aspect ratio */}
      <div className="config-section">
        <span className="config-label">{msgs.aspectRatio.label}</span>
        <div className="config-options">
          {(['1:1', '4:5', '16:9'] as AspectRatio[]).map(ratio => (
            <button
              key={ratio}
              type="button"
              className={`config-option config-option--ratio${config.aspectRatio === ratio ? 'config-option--active' : ''}`}
              onClick={() => generatorStore.setConfig({ aspectRatio: ratio })}
              aria-pressed={config.aspectRatio === ratio}
            >
              {ratio}
            </button>
          ))}
        </div>
      </div>

      {/* Context description */}
      <div className="config-section config-section--context">
        <span className="config-label">{msgs.context.label}</span>

        <textarea
          className="config-textarea"
          placeholder={ctxMsgs.freeText.placeholder}
          value={config.freeText}
          onChange={e => generatorStore.setConfig({ freeText: e.target.value })}
          rows={3}
          aria-label={ctxMsgs.freeText.label}
        />

        <ChipSelector
          label={ctxMsgs.elements.label}
          options={ctxMsgs.elements.chips}
          selected={config.elementChips}
          onToggle={v => toggleChip('elementChips', v)}
        />

        <ChipSelector
          label={ctxMsgs.atmospheric.label}
          options={ctxMsgs.atmospheric.chips}
          selected={config.atmosphericChips}
          onToggle={v => toggleChip('atmosphericChips', v)}
        />

        <StepSlider
          label={ctxMsgs.dayMoment.label}
          steps={ctxMsgs.dayMoment.steps}
          value={config.dayMoment}
          onChange={v => generatorStore.setConfig({ dayMoment: v })}
        />

        <StepSlider
          label={ctxMsgs.prominence.label}
          steps={ctxMsgs.prominence.steps}
          value={config.prominence}
          onChange={v => generatorStore.setConfig({ prominence: v })}
        />

        {/* Prompt preview */}
        <div className="prompt-preview">
          <span className="prompt-preview__label">
            {ctxMsgs.promptPreview.label}
          </span>
          <p className="prompt-preview__text">
            {promptPreview || ctxMsgs.promptPreview.empty}
          </p>
          <p className="prompt-preview__disclaimer">
            {ctxMsgs.promptPreview.disclaimer}
          </p>
        </div>
      </div>

      {/* Quality */}
      <div className="config-section">
        <span className="config-label">{msgs.quality.label}</span>
        <div className="config-options">
          {(Object.keys(msgs.quality.options) as ImageQuality[]).map(q => (
            <button
              key={q}
              type="button"
              className={`config-option${config.quality === q ? 'config-option--active' : ''}`}
              onClick={() => generatorStore.setConfig({ quality: q })}
              aria-pressed={config.quality === q}
            >
              {msgs.quality.options[q]}
            </button>
          ))}
        </div>
      </div>

      {/* Generate */}
      {config.selectedSkus.length === 0 && (
        <p className="config-validation">{msgs.validationSkus}</p>
      )}
      <button
        type="button"
        className="btn btn--primary config-generate-btn"
        onClick={handleGenerate}
        disabled={!canGenerate}
      >
        {isGenerating ? msgs.generateBtnLoading : msgs.generateBtn}
      </button>
    </div>
  );
}
