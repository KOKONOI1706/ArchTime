import { mockRepository } from '../data/mockData';

export default function Header() {
  return (
    <header className="flex items-center justify-between px-5 py-2.5 border-b border-border bg-bg flex-shrink-0" style={{ height: 46 }}>
      <div className="flex items-center gap-3">
        <span className="text-text-primary font-mono" style={{ fontSize: '0.85rem', letterSpacing: '0.02em' }}>
          ArchTime
        </span>
        <span className="text-text-muted" style={{ fontSize: '0.72rem' }}>/</span>
        <span className="text-text-secondary" style={{ fontSize: '0.75rem', letterSpacing: '0.04em' }}>
          Architecture Evolution Explorer
        </span>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-1.5">
          <span className="label-upper" style={{ fontSize: '0.65rem' }}>Repository:</span>
          <span className="text-text-primary font-mono" style={{ fontSize: '0.78rem' }}>{mockRepository.name}</span>
        </div>
        <div className="border-l border-border h-3" />
        <div className="flex items-center gap-1.5">
          <span className="label-upper" style={{ fontSize: '0.65rem' }}>Branch:</span>
          <span className="text-text-primary font-mono" style={{ fontSize: '0.78rem' }}>{mockRepository.branch}</span>
        </div>
        <div className="border-l border-border h-3" />
        <div className="flex items-center gap-1.5">
          <span className="label-upper" style={{ fontSize: '0.65rem' }}>Last analyzed:</span>
          <span className="text-text-secondary font-mono" style={{ fontSize: '0.78rem' }}>{mockRepository.lastAnalyzed}</span>
        </div>
      </div>
    </header>
  );
}
