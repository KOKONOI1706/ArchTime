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
    <div
      style={{
        background: '#0c1117',
        border: '1px solid #141c25',
        padding: '20px 24px 16px',
      }}
    >
      <div className="label-upper mb-4">Architecture Evolution</div>

      <div className="relative" style={{ height: 80 }}>
        {/* Timeline axis */}
        <div
          className="absolute"
          style={{
            top: 28,
            left: 0,
            right: 0,
            height: 1,
            background: '#1a2332',
          }}
        />
        {/* Arrow head */}
        <div
          className="absolute"
          style={{
            top: 24,
            right: -1,
            width: 0,
            height: 0,
            borderTop: '5px solid transparent',
            borderBottom: '5px solid transparent',
            borderLeft: '8px solid #1a2332',
          }}
        />

        {/* Year labels */}
        {years.map((year, i) => {
          const pct = i / (years.length - 1);
          return (
            <div
              key={year}
              className="absolute"
              style={{ left: `${pct * 96}%`, top: 18, transform: 'translateX(-50%)' }}
            >
              <div style={{ width: 1, height: 6, background: '#1a2332', margin: '0 auto' }} />
              <span
                style={{
                  fontSize: '0.62rem',
                  color: '#2d3748',
                  fontFamily: 'JetBrains Mono, monospace',
                  display: 'block',
                  textAlign: 'center',
                  marginTop: 3,
                }}
              >
                {year}
              </span>
            </div>
          );
        })}

        {/* Events */}
        {mockTimelineEvents.map((event) => {
          const isSelected = selected?.id === event.id;
          const isHovered = hovered === event.id;

          return (
            <div
              key={event.id}
              className="absolute timeline-event"
              style={{
                left: `${event.normalizedX * 92}%`,
                top: 22,
                transform: 'translateX(-50%)',
              }}
              onClick={() => onSelect(event)}
              onMouseEnter={() => setHovered(event.id)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Dot */}
              <div
                style={{
                  width: isSelected ? 10 : 7,
                  height: isSelected ? 10 : 7,
                  borderRadius: '50%',
                  background: isSelected
                    ? '#4299e1'
                    : isHovered
                    ? '#718096'
                    : '#2d3748',
                  border: `1px solid ${isSelected ? '#4299e1' : isHovered ? '#4a5568' : '#1a2332'}`,
                  transition: 'all 0.12s',
                  margin: '0 auto',
                  zIndex: 2,
                  position: 'relative',
                  boxShadow: isSelected ? '0 0 8px rgba(66,153,225,0.4)' : 'none',
                }}
              />

              {/* Label below dot */}
              <div
                className="mt-1.5 text-center"
                style={{ minWidth: 80, transform: 'translateX(-35%)' }}
              >
                <div
                  className="event-label font-mono"
                  style={{
                    fontSize: '0.6rem',
                    color: isSelected ? '#e2e8f0' : isHovered ? '#a0aec0' : '#4a5568',
                    transition: 'color 0.12s',
                    lineHeight: 1.3,
                    whiteSpace: 'nowrap',
                    fontWeight: isSelected ? 600 : 400,
                  }}
                >
                  {event.title}
                </div>
                <div
                  style={{
                    fontSize: '0.55rem',
                    color: isSelected ? '#718096' : '#2d3748',
                    whiteSpace: 'nowrap',
                  }}
                >
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
      {sub && (
        <div style={{ fontSize: '0.62rem', color: '#3d4f63', marginTop: 4 }}>{sub}</div>
      )}
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function Overview() {
  const navigate = useNavigate();
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);

  return (
    <div className="h-full overflow-y-auto" style={{ background: '#080b0f' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '20px 24px 32px' }}>

        {/* A. Repository Summary */}
        <div
          className="flex items-start justify-between mb-5"
          style={{
            background: '#0c1117',
            border: '1px solid #141c25',
            padding: '16px 20px',
          }}
        >
          <div>
            <div className="label-upper mb-1">Repository</div>
            <div style={{ fontSize: '1rem', fontWeight: 600, color: '#e2e8f0', marginBottom: 4 }}>
              {mockRepository.owner}
              <span style={{ color: '#2d3748' }}>/</span>
              {mockRepository.name}
            </div>
            <div className="flex items-center gap-3" style={{ fontSize: '0.72rem', color: '#4a5568' }}>
              <span
                style={{
                  border: '1px solid #1a2332',
                  padding: '1px 6px',
                  fontSize: '0.6rem',
                  color: '#718096',
                  fontFamily: 'JetBrains Mono, monospace',
                }}
              >
                {mockRepository.visibility}
              </span>
              <span>{mockRepository.language}</span>
              <span>·</span>
              <span>{mockRepository.framework}</span>
              <span>·</span>
              <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                {mockRepository.branch}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            {[
              { label: 'Commits', value: mockRepository.commits.toLocaleString() },
              { label: 'Analysis Period', value: `${mockRepository.analysisStart} → ${mockRepository.analysisEnd}` },
              { label: 'Last Analyzed', value: mockRepository.lastAnalyzed },
            ].map((item) => (
              <div key={item.label} className="text-right">
                <div className="label-upper mb-0.5">{item.label}</div>
                <div
                  style={{
                    fontSize: '0.72rem',
                    color: '#a0aec0',
                    fontFamily: 'JetBrains Mono, monospace',
                  }}
                >
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* B. Architecture Evolution Timeline */}
        <div className="mb-5">
          <EvolutionTimeline selected={selectedEvent} onSelect={setSelectedEvent} />

          {/* Selected event detail */}
          {selectedEvent && (
            <div
              style={{
                background: '#0c1117',
                border: '1px solid #141c25',
                borderTop: 'none',
                padding: '12px 24px',
              }}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-6">
                  <div>
                    <div className="label-upper mb-1">Event</div>
                    <ChangeBadge typeKey={selectedEvent.type} />
                  </div>
                  <div>
                    <div className="label-upper mb-1">Commit</div>
                    <span className="commit-hash">{selectedEvent.commitSha}</span>
                  </div>
                  <div>
                    <div className="label-upper mb-1">Date</div>
                    <span style={{ fontSize: '0.72rem', color: '#718096', fontFamily: 'JetBrains Mono, monospace' }}>
                      {selectedEvent.date}
                    </span>
                  </div>
                  <div>
                    <div className="label-upper mb-1">Author</div>
                    <span style={{ fontSize: '0.72rem', color: '#718096' }}>
                      {selectedEvent.author}
                    </span>
                  </div>
                  <div>
                    <div className="label-upper mb-1">Confidence</div>
                    <span style={{ fontSize: '0.72rem', color: '#718096', fontFamily: 'JetBrains Mono, monospace' }}>
                      {selectedEvent.confidence}%
                    </span>
                  </div>
                  <div>
                    <div className="label-upper mb-1">Evidence</div>
                    <span style={{ fontSize: '0.72rem', color: '#718096', fontFamily: 'JetBrains Mono, monospace' }}>
                      {selectedEvent.evidenceCount} items
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="btn-action"
                    onClick={() => navigate('/architecture')}
                  >
                    Architecture
                  </button>
                  <button
                    className="btn-action"
                    onClick={() => navigate('/changes')}
                  >
                    Changes
                  </button>
                  <button
                    className="btn-action"
                    onClick={() => navigate('/evidence')}
                  >
                    Evidence
                  </button>
                  <button
                    className="btn-action"
                    onClick={() => navigate('/analyst')}
                  >
                    Ask AI
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* C. Key Metrics */}
        <div className="grid grid-cols-4 gap-3 mb-5">
          <MetricCard
            label="Architectural Changes"
            value={mockAnalysisMetrics.architecturalChanges}
            sub="Detected across history"
          />
          <MetricCard
            label="Modules"
            value={mockMetrics.modules}
            sub={`${mockMetrics.packages} packages`}
          />
          <MetricCard
            label="Refactorings"
            value={mockAnalysisMetrics.refactorings}
            sub="Architecture-affecting commits"
          />
          <MetricCard
            label="Evidence Coverage"
            value={`${mockAnalysisMetrics.evidenceCoverage}%`}
            sub="Changes with evidence"
          />
        </div>

        {/* D. Recent Significant Changes */}
        <div
          style={{
            background: '#0c1117',
            border: '1px solid #141c25',
          }}
        >
          <div className="section-card-header">
            <div className="label-upper">Recent Significant Changes</div>
            <button
              className="btn-action"
              onClick={() => navigate('/changes')}
              style={{ fontSize: '0.62rem' }}
            >
              View all
            </button>
          </div>

          {/* Table header */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '100px 160px 90px 1fr 140px',
              padding: '6px 16px',
              borderBottom: '1px solid #0f161d',
            }}
          >
            {['Date', 'Change Type', 'Commit', 'Description', 'Actions'].map((h) => (
              <div key={h} className="label-upper" style={{ fontSize: '0.58rem' }}>
                {h}
              </div>
            ))}
          </div>

          {mockArchitecturalChanges.map((change, i) => (
            <div
              key={change.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '100px 160px 90px 1fr 140px',
                padding: '8px 16px',
                borderBottom: i < mockArchitecturalChanges.length - 1 ? '1px solid #0f161d' : 'none',
                alignItems: 'center',
                transition: 'background 0.1s',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.015)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = 'transparent'; }}
            >
              <span
                style={{
                  fontSize: '0.68rem',
                  color: '#4a5568',
                  fontFamily: 'JetBrains Mono, monospace',
                }}
              >
                {change.date}
              </span>
              <div>
                <ChangeBadge typeKey={change.changeTypeKey} />
              </div>
              <span className="commit-hash" style={{ fontSize: '0.68rem' }}>
                {change.commitSha}
              </span>
              <span style={{ fontSize: '0.68rem', color: '#4a5568', paddingRight: 12 }}>
                {change.description}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  className="btn-action"
                  style={{ fontSize: '0.58rem', padding: '2px 7px' }}
                  onClick={() => navigate('/changes')}
                >
                  Changes
                </button>
                <button
                  className="btn-action"
                  style={{ fontSize: '0.58rem', padding: '2px 7px' }}
                  onClick={() => navigate('/evidence')}
                >
                  Evidence
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
