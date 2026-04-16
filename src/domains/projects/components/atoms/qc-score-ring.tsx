import { projectMessages } from '../../messages';

const RADIUS = 50;
const STROKE_WIDTH = 8;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const CENTER = 60;
const VIEWBOX_SIZE = 120;

const ARC_COLOR = '#7345FF';

const scoreLabels = projectMessages.detail.qcScoreLabels;

function getScoreLabel(score: number): string {
  if (score >= 80) return scoreLabels.approved;
  if (score >= 50) return scoreLabels.warnings;
  return scoreLabels.rejected;
}

interface QcScoreRingProps {
  score: number;
}

export function QcScoreRing({ score }: QcScoreRingProps) {
  const clampedScore = Math.max(0, Math.min(100, score));
  const dashOffset = CIRCUMFERENCE * (1 - clampedScore / 100);
  const label = getScoreLabel(clampedScore);

  return (
    <div className="score-ring" role="img" aria-label={scoreLabels.ariaLabel(clampedScore, label)}>
      <svg
        width={VIEWBOX_SIZE}
        height={VIEWBOX_SIZE}
        viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}
        className="score-ring__svg"
      >
        {/* Glow filter */}
        <defs>
          <filter id={`glow-${clampedScore}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Track */}
        <circle
          className="score-ring__track"
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          fill="none"
          strokeWidth={STROKE_WIDTH}
        />

        {/* Progress arc */}
        <circle
          className="score-ring__progress"
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          fill="none"
          strokeWidth={STROKE_WIDTH}
          stroke={ARC_COLOR}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={dashOffset}
          transform={`rotate(-90 ${CENTER} ${CENTER})`}
          filter={`url(#glow-${clampedScore})`}
        />

        {/* Score number */}
        <text
          className="score-ring__value"
          x={CENTER}
          y={CENTER - 6}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#F5F5F5"
        >
          {clampedScore}
        </text>

        {/* "/ 100" label */}
        <text
          className="score-ring__max"
          x={CENTER}
          y={CENTER + 14}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#545454"
        >
          / 100
        </text>
      </svg>
    </div>
  );
}
