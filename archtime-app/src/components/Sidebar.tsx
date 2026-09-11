import { useNavigate, useLocation } from 'react-router-dom';
import { mockRepository, mockAnalysisStatus } from '../data/mockData';

const navItems = [
  { label: 'Overview', path: '/' },
  { label: 'Timeline', path: '/timeline' },
  { label: 'Architecture', path: '/architecture' },
  { label: 'Diff', path: '/diff' },
  { label: 'Evidence', path: '/evidence' },
  { label: 'AI Assistant', path: '/ai' },
  { label: 'Settings', path: '/settings' },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside
      className="flex flex-col border-r border-border bg-bg flex-shrink-0 overflow-y-auto"
      style={{ width: 200 }}
    >
      {/* Navigation */}
      <nav className="pt-3 pb-2 border-b border-border">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`nav-item w-full text-left text-sm ${isActive ? 'active' : ''}`}
            >
              {isActive && <span className="text-text-muted" style={{ fontSize: '0.75rem' }}>▶</span>}
              {!isActive && <span className="text-text-muted" style={{ fontSize: '0.75rem', opacity: 0.4 }}>›</span>}
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Repository Info */}
      <div className="px-3 py-3 border-b border-border">
        <div className="label-upper mb-2" style={{ fontSize: '0.65rem' }}>Repository</div>
        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <span className="status-dot" style={{ width: 4, height: 4 }} />
            <span className="text-text-secondary" style={{ fontSize: '0.75rem' }}>{mockRepository.name}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="status-dot" style={{ width: 4, height: 4 }} />
            <span className="text-text-secondary" style={{ fontSize: '0.75rem' }}>{mockRepository.branch} branch</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="status-dot" style={{ width: 4, height: 4 }} />
            <span className="text-text-secondary" style={{ fontSize: '0.75rem' }}>{mockRepository.commits.toLocaleString()} commits</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="status-dot" style={{ width: 4, height: 4 }} />
            <span className="text-text-secondary" style={{ fontSize: '0.75rem' }}>{mockRepository.stack}</span>
          </div>
        </div>
      </div>

      {/* Time Range */}
      <div className="px-3 py-3 border-b border-border">
        <div className="label-upper mb-2">Time Range</div>
        <div className="space-y-1 mb-2">
          <div className="flex justify-between">
            <span className="text-text-muted" style={{ fontSize: '0.7rem' }}>From:</span>
            <span className="text-text-secondary font-mono" style={{ fontSize: '0.7rem' }}>2023-01-01</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-muted" style={{ fontSize: '0.7rem' }}>To:</span>
            <span className="text-text-secondary font-mono" style={{ fontSize: '0.7rem' }}>2025-06-12</span>
          </div>
        </div>
        {/* Minimal slider */}
        <div className="relative h-1 bg-border-bright rounded-full">
          <div className="absolute left-0 top-0 h-full bg-accent-dim rounded-full" style={{ width: '100%' }} />
          <div className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-text-primary border border-border rounded-full" style={{ left: 0 }} />
          <div className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-text-primary border border-border rounded-full" style={{ right: 0 }} />
        </div>
      </div>

      {/* Analysis Status */}
      <div className="px-3 py-3 flex-1">
        <div className="label-upper mb-2" style={{ fontSize: '0.65rem' }}>Analysis Status</div>
        <div className="space-y-1.5">
          {mockAnalysisStatus.map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="status-dot ready" />
                <span className="text-text-secondary" style={{ fontSize: '0.72rem' }}>{item.label}</span>
              </div>
              <span className="text-text-muted font-mono" style={{ fontSize: '0.65rem', letterSpacing: '0.05em' }}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
