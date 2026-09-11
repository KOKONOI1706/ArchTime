import { mockRepository } from '../data/mockData';

export default function Header() {
  return (
    <header className="flex items-center justify-between px-4 py-2 border-b border-border bg-bg flex-shrink-0" style={{ height: 38 }}>
      <div className="flex items-center gap-3">
        <span className="text-text-primary font-mono" style={{ fontSize: '0.72rem', letterSpacing: '0.02em' }}>
          ArchTime
        </span>
        <span className="text-text-muted" style={{ fontSize: '0.6rem' }}>/</span>
        <span className="text-text-secondary" style={{ fontSize: '0.65rem', letterSpacing: '0.04em' }}>
          Architecture Evolution Explorer
        </span>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-1.5">
          <span className="label-upper" style={{ fontSize: '0.55rem' }}>Repository:</span>
          <span className="text-text-primary font-mono" style={{ fontSize: '0.65rem' }}>{mockRepository.name}</span>
        </div>
        <div className="border-l border-border h-3" />
        <div className="flex items-center gap-1.5">
          <span className="label-upper" style={{ fontSize: '0.55rem' }}>Branch:</span>
          <span className="text-text-primary font-mono" style={{ fontSize: '0.65rem' }}>{mockRepository.branch}</span>
        </div>
        <div className="border-l border-border h-3" />
        <div className="flex items-center gap-1.5">
          <span className="label-upper" style={{ fontSize: '0.55rem' }}>Last analyzed:</span>
          <span className="text-text-secondary font-mono" style={{ fontSize: '0.65rem' }}>{mockRepository.lastAnalyzed}</span>
        </div>
      </div>
    </header>
  );
}
