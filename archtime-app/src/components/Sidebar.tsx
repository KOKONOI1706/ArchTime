import { useNavigate, useLocation } from 'react-router-dom';
import { mockRepository, mockAnalysisStatus } from '../data/mockData';
import StatusIndicator from './shared/StatusIndicator';

interface NavSection {
  label: string;
  items: { label: string; path: string }[];
}

const navSections: NavSection[] = [
  { label: 'Workspace', items: [{ label: 'Overview', path: '/' }] },
  {
    label: 'Analysis',
    items: [
      { label: 'Timeline', path: '/timeline' },
      { label: 'Architecture', path: '/architecture' },
      { label: 'Architectural Changes', path: '/changes' },
      { label: 'Evidence', path: '/evidence' },
    ],
  },
  { label: 'Intelligence', items: [{ label: 'AI Analyst', path: '/analyst' }] },
  { label: 'System', items: [{ label: 'Settings', path: '/settings' }] },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside
      className="flex flex-col border-r-subtle flex-shrink-0 overflow-y-auto"
      style={{ width: 236, background: '#0d1117' }}
    >
      <nav className="flex-1 pt-3">
        {navSections.map((section) => (
          <div key={section.label} className="mb-2">
            <div className="nav-section-label">{section.label}</div>
            {section.items.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`nav-item ${isActive ? 'active' : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Repository context */}
      <div style={{ padding: '12px 16px', borderTop: '1px solid #21262d' }}>
        <div className="label-upper mb-2">Repository</div>
        <div style={{ fontSize: '0.82rem', color: '#c9d1d9', fontWeight: 500, marginBottom: 3 }}>
          <span style={{ color: '#6e7681' }}>{mockRepository.owner}/</span>
          <span style={{ color: '#e6edf3' }}>{mockRepository.name}</span>
        </div>
        <div style={{ fontSize: '0.75rem', color: '#8b949e', fontFamily: 'JetBrains Mono, monospace', marginBottom: 3 }}>
          {mockRepository.branch}
        </div>
        <div style={{ fontSize: '0.72rem', color: '#6e7681' }}>
          {mockRepository.commits.toLocaleString()} commits · {mockRepository.language}
        </div>
      </div>

      {/* Analysis status */}
      <div style={{ padding: '12px 16px', borderTop: '1px solid #21262d' }}>
        <div className="label-upper mb-3">Analysis Status</div>
        <div className="space-y-2">
          {mockAnalysisStatus.map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <StatusIndicator status={item.status} />
              <span style={{ fontSize: '0.78rem', color: '#8b949e' }}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Add repository */}
      <div style={{ padding: '10px 16px', borderTop: '1px solid #21262d' }}>
        <button
          onClick={() => navigate('/onboarding')}
          className="btn-action w-full text-left"
        >
          + Add Repository
        </button>
      </div>
    </aside>
  );
}
