import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  mockRepository,
  mockAnalysisMetrics,
  mockMetrics,
  mockTimelineEvents,
  mockArchitecturalChanges,
  type TimelineEvent,
} from '../data/mockData';
import ChangeBadge from '../components/shared/ChangeBadge';

// ── Horizontal architecture evolution timeline ────────────────────────────────
function EvolutionTimeline({
  selected,
  onSelect,
}: {
  selected: TimelineEvent | null;
  onSelect: (e: TimelineEvent) => void;
}) {
  const [hovered, setHovered] = useState<string | null>(null);
  const years = ['2023', '2024', '2025', '2026'];

  return (
    <div style={{ background: '#161b22', border: '1px solid #21262d', padding: '20px 28px 20px' }}>
      <div className="label-upper mb-4">Architecture Evolution</div>

      <div className="relative" style={{ height: 88 }}>
        {/* Axis line */}
        <div className="absolute" style={{ top: 30, left: 0, right: 18, height: 1, background: '#30363d' }} />
        {/* Arrow */}
        <div className="absolute" style={{
          top: 26, right: 14,
          width: 0, height: 0,
          borderTop: '5px solid transparent', borderBottom: '5px solid transparent',
          borderLeft: '9px solid #30363d',
        }} />

        {/* Year labels */}
        {years.map((year, i) => {
          const pct = i / (years.length - 1);
          return (
            <div key={year} className="absolute" style={{ left: `${pct * 92}%`, top: 21, transform: 'translateX(-50%)' }}>
              <div style={{ width: 1, height: 8, background: '#30363d', margin: '0 auto' }} />
              <span style={{ fontSize: '0.65rem', color: '#484f58', fontFamily: 'JetBrains Mono, monospace', display: 'block', textAlign: 'center', marginTop: 3 }}>
                {year}
              </span>
            </div>
          );
        })}

        {/* Events */}
        {mockTimelineEvents.map((event) => {
          const isSel = selected?.id === event.id;
          const isHov = hovered === event.id;
          return (
            <div
              key={event.id}
              className="absolute timeline-event"
              style={{ left: `${event.normalizedX * 88}%`, top: 23, transform: 'translateX(-50%)', zIndex: isSel ? 10 : 5, cursor: 'pointer' }}
              onClick={() => onSelect(event)}
              onMouseEnter={() => setHovered(event.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <div style={{
                width: isSel ? 12 : 8, height: isSel ? 12 : 8, borderRadius: '50%',
                background: isSel ? '#388bfd' : isHov ? '#8b949e' : '#30363d',
                border: `1px solid ${isSel ? '#58a6ff' : isHov ? '#6e7681' : '#30363d'}`,
                boxShadow: isSel ? '0 0 10px rgba(56,139,253,0.5)' : 'none',
                transition: 'all 0.12s', margin: '0 auto', position: 'relative',
              }} />
              <div className="mt-2 text-center" style={{ minWidth: 90 }}>
                <div className="event-label" style={{
                  fontSize: '0.67rem', fontFamily: 'JetBrains Mono, monospace', textTransform: 'uppercase',
                  color: isSel ? '#e6edf3' : isHov ? '#c9d1d9' : '#8b949e',
                  transition: 'color 0.12s', lineHeight: 1.3, whiteSpace: 'nowrap', fontWeight: isSel ? 600 : 400,
                }}>
                  {event.title}
                </div>
                <div style={{ fontSize: '0.62rem', color: isSel ? '#8b949e' : '#484f58', whiteSpace: 'nowrap', fontFamily: 'JetBrains Mono, monospace' }}>
                  {event.date}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Metric card ───────────────────────────────────────────────────────────────
function MetricCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="metric-card">
      <div className="metric-label">{label}</div>
      <div className="metric-value">{value}</div>
      {sub && <div className="metric-sub">{sub}</div>}
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function Overview() {
  const navigate = useNavigate();
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);

  return (
    <div className="h-full overflow-y-auto" style={{ background: '#0d1117' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '20px 28px 40px' }}>

        {/* A. Repository Summary */}
        <div style={{ background: '#161b22', border: '1px solid #21262d', padding: '16px 22px', marginBottom: 12, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <div className="label-upper mb-2">Repository</div>
            <div style={{ fontSize: '1.05rem', fontWeight: 600, color: '#e6edf3', marginBottom: 6 }}>
              <span style={{ color: '#8b949e' }}>{mockRepository.owner}/</span>
              {mockRepository.name}
            </div>
            <div className="flex items-center gap-3" style={{ fontSize: '0.78rem', color: '#8b949e' }}>
              <span style={{ border: '1px solid #30363d', padding: '1px 7px', fontSize: '0.65rem', color: '#8b949e', fontFamily: 'JetBrains Mono, monospace' }}>
                {mockRepository.visibility}
              </span>
              <span>{mockRepository.language}</span>
              <span style={{ color: '#484f58' }}>·</span>
              <span>{mockRepository.framework}</span>
              <span style={{ color: '#484f58' }}>·</span>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', color: '#58a6ff' }}>{mockRepository.branch}</span>
            </div>
          </div>

          <div className="flex items-center gap-8">
            {[
              { label: 'Commits', value: mockRepository.commits.toLocaleString() },
              { label: 'Analysis Period', value: `${mockRepository.analysisStart} → ${mockRepository.analysisEnd}` },
              { label: 'Last Analyzed', value: mockRepository.lastAnalyzed },
            ].map((item) => (
              <div key={item.label} style={{ textAlign: 'right' }}>
                <div className="label-upper mb-1">{item.label}</div>
                <div style={{ fontSize: '0.8rem', color: '#c9d1d9', fontFamily: 'JetBrains Mono, monospace' }}>
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* B. Architecture Evolution */}
        <div style={{ marginBottom: 12 }}>
          <EvolutionTimeline selected={selectedEvent} onSelect={setSelectedEvent} />

          {/* Selected event detail */}
          {selectedEvent && (
            <div style={{ background: '#161b22', border: '1px solid #21262d', borderTop: '1px solid #388bfd', padding: '14px 24px' }}>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-8">
                  {[
                    { label: 'Event', content: <ChangeBadge typeKey={selectedEvent.type} /> },
                    { label: 'Commit', content: <span className="commit-hash">{selectedEvent.commitSha}</span> },
                    { label: 'Date', content: <span style={{ fontSize: '0.78rem', color: '#c9d1d9', fontFamily: 'JetBrains Mono, monospace' }}>{selectedEvent.date}</span> },
                    { label: 'Author', content: <span style={{ fontSize: '0.78rem', color: '#c9d1d9' }}>{selectedEvent.author}</span> },
                    { label: 'Confidence', content: <span style={{ fontSize: '0.78rem', color: '#c9d1d9', fontFamily: 'JetBrains Mono, monospace' }}>{selectedEvent.confidence}%</span> },
                    { label: 'Evidence', content: <span style={{ fontSize: '0.78rem', color: '#c9d1d9', fontFamily: 'JetBrains Mono, monospace' }}>{selectedEvent.evidenceCount} items</span> },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="label-upper mb-1">{item.label}</div>
                      {item.content}
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  {['Architecture', 'Changes', 'Evidence', 'Ask AI'].map((label, i) => (
                    <button key={label} className="btn-action" onClick={() => navigate(['/architecture', '/changes', '/evidence', '/analyst'][i])}>
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {selectedEvent.affectedModules.length > 0 && (
                <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid #21262d' }}>
                  <div className="label-upper mb-2">Affected Modules</div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {selectedEvent.affectedModules.map((mod) => (
                      <span key={mod} style={{ padding: '2px 8px', border: '1px solid #21262d', fontSize: '0.72rem', color: '#8b949e', fontFamily: 'JetBrains Mono, monospace', background: '#0d1117' }}>
                        {mod}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* C. Key Metrics */}
        <div className="grid grid-cols-4 gap-3 mb-4">
          <MetricCard label="Architectural Changes" value={mockAnalysisMetrics.architecturalChanges} sub="Detected across history" />
          <MetricCard label="Modules" value={mockMetrics.modules} sub={`${mockMetrics.packages} packages`} />
          <MetricCard label="Refactorings" value={mockAnalysisMetrics.refactorings} sub="Architecture-affecting commits" />
          <MetricCard label="Evidence Coverage" value={`${mockAnalysisMetrics.evidenceCoverage}%`} sub="Changes with evidence" />
        </div>

        {/* D. Recent Significant Changes */}
        <div style={{ background: '#161b22', border: '1px solid #21262d' }}>
          <div style={{ padding: '10px 18px', borderBottom: '1px solid #21262d', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div className="label-upper">Recent Significant Changes</div>
            <button className="btn-action" onClick={() => navigate('/changes')}>View all</button>
          </div>

          {/* Table header */}
          <div style={{ display: 'grid', gridTemplateColumns: '110px 170px 100px 1fr 160px', padding: '7px 18px', borderBottom: '1px solid #1c2128', background: '#1c2128' }}>
            {['Date', 'Change Type', 'Commit', 'Description', 'Actions'].map((h) => (
              <div key={h} className="label-upper">{h}</div>
            ))}
          </div>

          {mockArchitecturalChanges.map((change, i) => (
            <div
              key={change.id}
              style={{
                display: 'grid', gridTemplateColumns: '110px 170px 100px 1fr 160px',
                padding: '10px 18px', borderBottom: i < mockArchitecturalChanges.length - 1 ? '1px solid #161b22' : 'none',
                alignItems: 'center', transition: 'background 0.1s', cursor: 'default',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.02)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = 'transparent'; }}
            >
              <span style={{ fontSize: '0.78rem', color: '#8b949e', fontFamily: 'JetBrains Mono, monospace' }}>
                {change.date}
              </span>
              <div><ChangeBadge typeKey={change.changeTypeKey} /></div>
              <span className="commit-hash">{change.commitSha}</span>
              <span style={{ fontSize: '0.78rem', color: '#8b949e', paddingRight: 16 }}>
                {change.description}
              </span>
              <div className="flex items-center gap-2">
                <button className="btn-action" style={{ fontSize: '0.68rem' }} onClick={() => navigate('/changes')}>Changes</button>
                <button className="btn-action" style={{ fontSize: '0.68rem' }} onClick={() => navigate('/evidence')}>Evidence</button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
