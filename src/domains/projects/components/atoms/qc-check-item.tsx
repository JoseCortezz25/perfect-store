import { CheckCircle, XCircle, AlertTriangle, MinusCircle } from 'lucide-react';
import type { QcCheckItem as QcCheckItemType } from '../../projects.types';

const STATUS_ICON = {
  pass: CheckCircle,
  fail: XCircle,
  warning: AlertTriangle,
  skipped: MinusCircle
};

interface QcCheckItemProps {
  item: QcCheckItemType;
}

export function QcCheckItem({ item }: QcCheckItemProps) {
  const Icon = STATUS_ICON[item.status];

  return (
    <div className="qc-item">
      <div className={`qc-item__icon qc-item__icon--${item.status}`} aria-hidden="true">
        <Icon size={14} strokeWidth={1.8} />
      </div>
      <div className="qc-item__body">
        <div className="qc-item__row">
          <span className="qc-item__label">{item.label}</span>
          <span className={`qc-item__category qc-item__category--${item.category}`}>
            {item.category}
          </span>
        </div>
        {item.detail && (
          <p className="qc-item__detail">{item.detail}</p>
        )}
      </div>
    </div>
  );
}
