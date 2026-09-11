import { mockKeyMetrics } from '../data/mockData';

export default function MetricsPanel() {
  return (
    <div className="px-3 py-3 border-b border-border">
      <div className="label-upper mb-2">Key Metrics</div>
      <div className="space-y-1">
        {mockKeyMetrics.map((metric) => (
          <div key={metric.label} className="flex items-center justify-between">
            <span className="text-text-secondary" style={{ fontSize: '0.62rem' }}>{metric.label}</span>
            <span className="text-text-primary font-mono" style={{ fontSize: '0.65rem', letterSpacing: '0.02em' }}>
              {metric.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
