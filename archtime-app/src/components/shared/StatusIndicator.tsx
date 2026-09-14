import type { AnalysisStatus } from '../../data/mockData';

interface StatusIndicatorProps {
  status: AnalysisStatus['status'];
  label?: string;
  detail?: string;
  showDetail?: boolean;
}

export default function StatusIndicator({
  status,
  label,
  detail,
  showDetail = false,
}: StatusIndicatorProps) {
  const dotClass =
    status === 'READY'
      ? 'ready'
      : status === 'RUNNING'
      ? 'running'
      : status === 'ERROR'
      ? 'error'
      : 'pending';

  return (
    <div className="flex items-center gap-2">
      <span className={`status-dot ${dotClass}`} />
      {label && (
        <span style={{ fontSize: '0.72rem', color: '#718096' }}>{label}</span>
      )}
      {showDetail && detail && (
        <span style={{ fontSize: '0.65rem', color: '#4a5568', fontFamily: 'inherit' }}>
          {detail}
        </span>
      )}
    </div>
  );
}
