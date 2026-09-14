import { useLocation } from 'react-router-dom';
import { mockRepository, mockAnalysisStatus } from '../data/mockData';
import StatusIndicator from './shared/StatusIndicator';

const PAGE_TITLES: Record<string, { title: string; section: string }> = {
  '/':            { section: 'Workspace',    title: 'Overview' },
  '/timeline':    { section: 'Analysis',     title: 'Timeline' },
  '/architecture':{ section: 'Analysis',     title: 'Architecture' },
  '/changes':     { section: 'Analysis',     title: 'Architectural Changes' },
  '/evidence':    { section: 'Analysis',     title: 'Evidence' },
  '/analyst':     { section: 'Intelligence', title: 'AI Analyst' },
  '/settings':    { section: 'System',       title: 'Settings' },
  '/onboarding':  { section: 'Workspace',    title: 'Add Repository' },
};

export default function Header() {
  const location = useLocation();
  const page = PAGE_TITLES[location.pathname] ?? { section: '', title: location.pathname };
  const readyCount = mockAnalysisStatus.filter((s) => s.status === 'READY').length;
  const totalCount = mockAnalysisStatus.length;

  return (
    <header
      className="flex items-center justify-between border-b-subtle flex-shrink-0"
      style={{ height: 44, paddingLeft: 16, paddingRight: 20, background: '#080b0f' }}
    >
      {/* Left: brand + breadcrumb */}
      <div className="flex items-center gap-0">
        <span
          style={{
            fontSize: '0.8rem',
            fontWeight: 700,
            color: '#e2e8f0',
            letterSpacing: '0.01em',
            paddingRight: 10,
            borderRight: '1px solid #141c25',
            marginRight: 10,
            fontFamily: 'Inter, sans-serif',
          }}
        >
          ArchTime
        </span>
        {page.section && (
          <>
            <span style={{ fontSize: '0.72rem', color: '#2d3748', marginRight: 6 }}>
              {page.section}
            </span>
            <span style={{ fontSize: '0.72rem', color: '#1a2332', marginRight: 6 }}>/</span>
          </>
        )}
        <span style={{ fontSize: '0.75rem', color: '#718096', fontWeight: 500 }}>
          {page.title}
        </span>
      </div>

      {/* Right: repo context + analysis status */}
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-1.5">
          <span className="label-upper" style={{ fontSize: '0.58rem' }}>Repo</span>
          <span
            style={{
              fontSize: '0.72rem',
              color: '#718096',
              fontFamily: 'JetBrains Mono, monospace',
            }}
          >
            {mockRepository.owner}/{mockRepository.name}
          </span>
        </div>

        <div style={{ width: 1, height: 12, background: '#141c25' }} />

        <div className="flex items-center gap-1.5">
          <span className="label-upper" style={{ fontSize: '0.58rem' }}>Branch</span>
          <span
            style={{
              fontSize: '0.72rem',
              color: '#718096',
              fontFamily: 'JetBrains Mono, monospace',
            }}
          >
            {mockRepository.branch}
          </span>
        </div>

        <div style={{ width: 1, height: 12, background: '#141c25' }} />

        <div className="flex items-center gap-1.5">
          <StatusIndicator
            status={readyCount === totalCount ? 'READY' : 'RUNNING'}
          />
          <span style={{ fontSize: '0.68rem', color: '#4a5568' }}>
            {readyCount}/{totalCount} ready
          </span>
        </div>
      </div>
    </header>
  );
}
