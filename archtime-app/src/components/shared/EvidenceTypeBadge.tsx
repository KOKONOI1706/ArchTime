import type { EvidenceType } from '../../data/mockData';

interface EvidenceTypeBadgeProps {
  type: EvidenceType;
  className?: string;
}

export default function EvidenceTypeBadge({ type, className = '' }: EvidenceTypeBadgeProps) {
  const cls =
    type === 'FACT'
      ? 'badge-fact'
      : type === 'INFERENCE'
      ? 'badge-inference'
      : 'badge-unknown';

  return (
    <span className={`evidence-badge ${cls} ${className}`}>
      {type}
    </span>
  );
}
