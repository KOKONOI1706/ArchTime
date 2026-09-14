import { useLocation } from 'react-router-dom';
import { mockRepository, mockAnalysisStatus } from '../data/mockData';
import StatusIndicator from './shared/StatusIndicator';

const PAGE_TITLES: Record<string, { title: string; section: string }> = {
  '/':             { section: 'Workspace',    title: 'Overview' },
  '/timeline':     { section: 'Analysis',     title: 'Timeline' },
  '/architecture': { section: 'Analysis',     title: 'Architecture' },
  '/changes':      { section: 'Analysis',     title: 'Architectural Changes' },
  '/evidence':     { section: 'Analysis',     title: 'Evidence' },
  '/analyst':      { section: 'Intelligence', title: 'AI Analyst' },
  '/settings':     { section: 'System',       title: 'Settings' },
  '/onboarding':   { section: 'Workspace',    title: 'Add Repository' },
};

export default function Header() {
  const location = useLocation();
  const page = PAGE_TITLES[location.pathname] ?? { section: '', title: location.pathname };
  const readyCount = mockAnalysisStatus.filter((s) => s.status === 'READY').length;
  const totalCount = mockAnalysisStatus.length;

  return (
    <header
      className="flex items-center justify-between border-b-subtle flex-shrink-0"
      style={{ height: 46, paddingLeft: 18, paddingRight: 22, background: '#0d1117' }}
    >
      {/* Left: brand + breadcrumb */}
      <div className="flex items-center gap-0">
        <span style={{
          fontSize: '0.88rem', fontWeight: 700, color: '#e6edf3',
          paddingRight: 12, borderRight: '1px solid #21262d', marginRight: 12,
          fontFamily: 'Inter, sans-serif', letterSpacing: '-0.01em',
        }}>
          ArchTime
        </span>
        {page.section && (
          <>
            <span style={{ fontSize: '0.78rem', color: '#6e7681', marginRight: 7 }}>{page.section}</span>
            <span style={{ fontSize: '0.78rem', color: '#30363d', marginRight: 7 }}>/</span>
          </>
        )}
        <span style={{ fontSize: '0.82rem', color: '#c9d1d9', fontWeight: 500 }}>{page.title}</span>
      </div>

      {/* Right: repo context + status */}
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <span className="label-upper">Repo</span>
          <span style={{ fontSize: '0.78rem', color: '#8b949e', fontFamily: 'JetBrains Mono, monospace' }}>
            {mockRepository.owner}/{mockRepository.name}
          </span>
        </div>

        <div style={{ width: 1, height: 14, background: '#21262d' }} />

        <div className="flex items-center gap-2">
          <span className="label-upper">Branch</span>
          <span style={{ fontSize: '0.78rem', color: '#8b949e', fontFamily: 'JetBrains Mono, monospace' }}>
            {mockRepository.branch}
          </span>
        </div>

        <div style={{ width: 1, height: 14, background: '#21262d' }} />

        <div className="flex items-center gap-2">
          <StatusIndicator status={readyCount === totalCount ? 'READY' : 'RUNNING'} />
          <span style={{ fontSize: '0.75rem', color: '#8b949e' }}>
            {readyCount}/{totalCount} ready
          </span>
        </div>
      </div>
    </header>
  );
}
