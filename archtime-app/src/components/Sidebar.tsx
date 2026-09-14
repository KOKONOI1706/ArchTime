import { useNavigate, useLocation } from 'react-router-dom';
import { mockRepository, mockAnalysisStatus } from '../data/mockData';
import StatusIndicator from './shared/StatusIndicator';

interface NavSection {
  label: string;
  items: { label: string; path: string }[];
}

const navSections: NavSection[] = [
  {
    label: 'Workspace',
    items: [{ label: 'Overview', path: '/' }],
  },
  {
    label: 'Analysis',
    items: [
      { label: 'Timeline', path: '/timeline' },
      { label: 'Architecture', path: '/architecture' },
      { label: 'Architectural Changes', path: '/changes' },
      { label: 'Evidence', path: '/evidence' },
    ],
  },
  {
    label: 'Intelligence',
    items: [{ label: 'AI Analyst', path: '/analyst' }],
  },
  {
    label: 'System',
    items: [{ label: 'Settings', path: '/settings' }],
  },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside
      className="flex flex-col border-r-subtle bg-bg flex-shrink-0 overflow-y-auto"
      style={{ width: 228, background: '#080b0f' }}
    >
      {/* Navigation sections */}
      <nav className="flex-1 pt-2">
        {navSections.map((section) => (
          <div key={section.label} className="mb-1">
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
      <div
        className="px-4 py-3 border-t-subtle"
        style={{ borderTop: '1px solid #141c25' }}
      >
        <div className="label-upper mb-2">Repository</div>
        <div style={{ fontSize: '0.75rem', color: '#a0aec0', fontWeight: 500, marginBottom: 2 }}>
          {mockRepository.owner}
          <span style={{ color: '#2d3748' }}>/</span>
          {mockRepository.name}
        </div>
        <div style={{ fontSize: '0.68rem', color: '#4a5568', fontFamily: 'JetBrains Mono, monospace' }}>
          {mockRepository.branch}
        </div>
        <div
          className="flex items-center gap-1.5 mt-1"
          style={{ fontSize: '0.65rem', color: '#3d4f63' }}
        >
          <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            {mockRepository.commits.toLocaleString()} commits
          </span>
          <span>·</span>
          <span>{mockRepository.language}</span>
        </div>
      </div>

      {/* Analysis status */}
      <div
        className="px-4 py-3"
        style={{ borderTop: '1px solid #141c25' }}
      >
        <div className="label-upper mb-2">Analysis Status</div>
        <div className="space-y-1.5">
          {mockAnalysisStatus.map((item) => (
            <StatusIndicator
              key={item.label}
              status={item.status}
              label={item.label}
            />
          ))}
        </div>
      </div>

      {/* Add repository */}
      <div className="px-4 py-3" style={{ borderTop: '1px solid #141c25' }}>
        <button
          onClick={() => navigate('/onboarding')}
          className="btn-action w-full text-left"
          style={{ fontSize: '0.68rem' }}
        >
          + Add Repository
        </button>
      </div>
    </aside>
  );
}
