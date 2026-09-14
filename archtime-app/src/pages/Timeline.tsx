import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockTimelineEvents, type TimelineEvent } from '../data/mockData';
import ChangeBadge from '../components/shared/ChangeBadge';

// ── Filter controls ────────────────────────────────────────────────────────────
const CHANGE_TYPES = [
  { key: 'ALL', label: 'All' },
  { key: 'SERVICE_EXTRACTION', label: 'Extraction' },
  { key: 'MODULE_SPLIT', label: 'Module Split' },
  { key: 'PACKAGE_RESTRUCTURE', label: 'Restructure' },
  { key: 'NEW_MODULE', label: 'New Module' },
  { key: 'MICROSERVICE_MIGRATION', label: 'Migration' },
];

// ── Horizontal timeline visualization ─────────────────────────────────────────
function TimelineVisualization({
  events,
  selected,
  onSelect,
}: {
  events: TimelineEvent[];
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
        padding: '24px 32px 20px',
      }}
    >
      <div className="relative" style={{ height: 96 }}>
        {/* Timeline axis */}
        <div
          className="absolute"
          style={{ top: 36, left: 0, right: 16, height: 1, background: '#1a2332' }}
        />
        <div
          className="absolute"
          style={{
            top: 32,
            right: 14,
            width: 0,
            height: 0,
            borderTop: '5px solid transparent',
            borderBottom: '5px solid transparent',
            borderLeft: '8px solid #1a2332',
          }}
        />

        {/* Year tick marks */}
        {years.map((year, i) => {
          const pct = i / (years.length - 1);
          return (
            <div
              key={year}
              className="absolute"
              style={{ left: `${pct * 92}%`, top: 26, transform: 'translateX(-50%)' }}
            >
              <div style={{ width: 1, height: 8, background: '#1a2332', margin: '0 auto' }} />
              <span
                style={{
                  fontSize: '0.62rem',
                  color: '#2d3748',
                  fontFamily: 'JetBrains Mono, monospace',
                  display: 'block',
                  textAlign: 'center',
                  marginTop: 2,
                }}
              >
                {year}
              </span>
            </div>
          );
        })}

        {/* Events */}
        {events.map((event) => {
          const isSelected = selected?.id === event.id;
          const isHovered = hovered === event.id;

          return (
            <div
              key={event.id}
              className="absolute timeline-event"
              style={{
                left: `${event.normalizedX * 88}%`,
                top: 30,
                transform: 'translateX(-50%)',
                zIndex: isSelected ? 10 : 5,
              }}
              onClick={() => onSelect(event)}
              onMouseEnter={() => setHovered(event.id)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Dot */}
              <div
                style={{
                  width: isSelected ? 12 : 8,
                  height: isSelected ? 12 : 8,
                  borderRadius: '50%',
                  background: isSelected
                    ? '#4299e1'
                    : isHovered
                    ? '#718096'
                    : '#2d3748',
                  border: `1px solid ${isSelected ? '#63b3ed' : isHovered ? '#4a5568' : '#1a2332'}`,
                  transition: 'all 0.12s',
                  margin: '0 auto',
                  position: 'relative',
                  boxShadow: isSelected ? '0 0 10px rgba(66,153,225,0.5)' : 'none',
                }}
              />

              {/* Label */}
              <div className="mt-2 text-center" style={{ minWidth: 90 }}>
                <div
                  className="event-label"
                  style={{
                    fontSize: '0.62rem',
                    color: isSelected ? '#e2e8f0' : isHovered ? '#a0aec0' : '#4a5568',
                    transition: 'color 0.12s',
                    lineHeight: 1.3,
                    whiteSpace: 'nowrap',
                    fontWeight: isSelected ? 600 : 400,
                    fontFamily: 'JetBrains Mono, monospace',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    fontSize2: '0.55rem',
                  } as React.CSSProperties}
                >
                  {event.title}
                </div>
                <div
                  style={{
                    fontSize: '0.55rem',
                    color: isSelected ? '#4a5568' : '#2d3748',
                    whiteSpace: 'nowrap',
                    fontFamily: 'JetBrains Mono, monospace',
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

// ── Event detail panel ────────────────────────────────────────────────────────
function EventDetailPanel({ event }: { event: TimelineEvent }) {
  const navigate = useNavigate();

  return (
    <div
      style={{
        background: '#0c1117',
        border: '1px solid #141c25',
        borderTop: 'none',
        padding: '16px 20px',
      }}
    >
      <div className="label-upper mb-3">Selected Event</div>

      <div className="flex items-start justify-between gap-6">
        <div className="flex items-start gap-8">
          <div>
            <div className="label-upper mb-1">Type</div>
            <ChangeBadge typeKey={event.type} />
          </div>
          <div>
            <div className="label-upper mb-1">Commit</div>
            <span className="commit-hash">{event.commitSha}</span>
          </div>
          <div>
            <div className="label-upper mb-1">Date</div>
            <span
              style={{
                fontSize: '0.72rem',
                color: '#718096',
                fontFamily: 'JetBrains Mono, monospace',
              }}
            >
              {event.date}
            </span>
          </div>
          <div>
            <div className="label-upper mb-1">Author</div>
            <span style={{ fontSize: '0.72rem', color: '#718096' }}>{event.author}</span>
          </div>
          <div>
            <div className="label-upper mb-1">Confidence</div>
            <span
              style={{
                fontSize: '0.72rem',
                color: '#718096',
                fontFamily: 'JetBrains Mono, monospace',
              }}
            >
              {event.confidence}%
            </span>
          </div>
          <div>
            <div className="label-upper mb-1">Evidence</div>
            <span
              style={{
                fontSize: '0.72rem',
                color: '#718096',
                fontFamily: 'JetBrains Mono, monospace',
              }}
            >
              {event.evidenceCount} items
            </span>
          </div>
          <div>
            <div className="label-upper mb-1">Files Changed</div>
            <span
              style={{
                fontSize: '0.72rem',
                color: '#718096',
                fontFamily: 'JetBrains Mono, monospace',
              }}
            >
              {event.filesChanged}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-1.5" style={{ flexShrink: 0 }}>
          <button className="btn-action w-full text-left" onClick={() => navigate('/architecture')}>
            View Architecture
          </button>
          <button className="btn-action w-full text-left" onClick={() => navigate('/changes')}>
            View Changes
          </button>
          <button className="btn-action w-full text-left" onClick={() => navigate('/evidence')}>
            View Evidence
          </button>
          <button className="btn-action w-full text-left" onClick={() => navigate('/analyst')}>
            Ask AI Analyst
          </button>
        </div>
      </div>

      {/* Affected modules */}
      {event.affectedModules.length > 0 && (
        <div className="mt-3 pt-3" style={{ borderTop: '1px solid #141c25' }}>
          <div className="label-upper mb-1.5">Affected Modules</div>
          <div className="flex items-center gap-2 flex-wrap">
            {event.affectedModules.map((mod) => (
              <span
                key={mod}
                style={{
                  padding: '1px 7px',
                  border: '1px solid #1a2332',
                  fontSize: '0.65rem',
                  color: '#718096',
                  fontFamily: 'JetBrains Mono, monospace',
                  background: '#080b0f',
                }}
              >
                {mod}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function Timeline() {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(
    mockTimelineEvents[mockTimelineEvents.length - 1],
  );
  const [activeFilter, setActiveFilter] = useState('ALL');

  const filteredEvents =
    activeFilter === 'ALL'
      ? mockTimelineEvents
      : mockTimelineEvents.filter((e) => e.type === activeFilter);

  return (
    <div className="h-full flex flex-col overflow-hidden" style={{ background: '#080b0f' }}>

      {/* Page header + filters */}
      <div
        className="flex items-center justify-between flex-shrink-0"
        style={{
          padding: '10px 24px',
          borderBottom: '1px solid #141c25',
          background: '#080b0f',
        }}
      >
        <div>
          <div className="page-title">Architecture Evolution Timeline</div>
          <div className="page-subtitle">
            {mockTimelineEvents.length} architectural events ·{' '}
            {mockTimelineEvents[0].date} → {mockTimelineEvents[mockTimelineEvents.length - 1].date}
          </div>
        </div>

        {/* Type filters */}
        <div className="flex items-center gap-px">
          {CHANGE_TYPES.map((t) => (
            <button
              key={t.key}
              className={`btn-mode ${activeFilter === t.key ? 'active' : ''}`}
              onClick={() => setActiveFilter(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline visualization */}
      <div className="flex-shrink-0" style={{ padding: '16px 24px 0' }}>
        <TimelineVisualization
          events={filteredEvents}
          selected={selectedEvent}
          onSelect={setSelectedEvent}
        />
        {selectedEvent && <EventDetailPanel event={selectedEvent} />}
      </div>

      {/* Events list */}
      <div className="flex-1 overflow-y-auto" style={{ padding: '16px 24px' }}>
        <div className="label-upper mb-3">All Events</div>

        <div style={{ border: '1px solid #141c25' }}>
          {/* Table header */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '160px 90px 100px 1fr 80px 80px',
              padding: '6px 14px',
              borderBottom: '1px solid #141c25',
              background: '#0c1117',
            }}
          >
            {['Change Type', 'Commit', 'Date', 'Description', 'Confidence', 'Evidence'].map((h) => (
              <div key={h} className="label-upper" style={{ fontSize: '0.58rem' }}>{h}</div>
            ))}
          </div>

          {filteredEvents.length === 0 ? (
            <div style={{ padding: '24px', textAlign: 'center', color: '#2d3748', fontSize: '0.72rem' }}>
              No events match the selected filter.
            </div>
          ) : (
            filteredEvents.map((event, i) => {
              const isSelected = selectedEvent?.id === event.id;
              return (
                <div
                  key={event.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '160px 90px 100px 1fr 80px 80px',
                    padding: '8px 14px',
                    borderBottom:
                      i < filteredEvents.length - 1 ? '1px solid #0f161d' : 'none',
                    background: isSelected
                      ? 'rgba(66,153,225,0.04)'
                      : 'transparent',
                    cursor: 'pointer',
                    alignItems: 'center',
                    transition: 'background 0.1s',
                    borderLeft: isSelected ? '2px solid #4299e1' : '2px solid transparent',
                  }}
                  onClick={() => setSelectedEvent(event)}
                  onMouseEnter={(e) => {
                    if (!isSelected) (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.015)';
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) (e.currentTarget as HTMLDivElement).style.background = 'transparent';
                  }}
                >
                  <div><ChangeBadge typeKey={event.type} /></div>
                  <span className="commit-hash" style={{ fontSize: '0.68rem' }}>{event.commitSha}</span>
                  <span
                    style={{
                      fontSize: '0.68rem',
                      color: '#4a5568',
                      fontFamily: 'JetBrains Mono, monospace',
                    }}
                  >
                    {event.date}
                  </span>
                  <span style={{ fontSize: '0.68rem', color: '#4a5568' }}>
                    {event.subtitle}
                  </span>
                  <span
                    style={{
                      fontSize: '0.68rem',
                      color: '#4a5568',
                      fontFamily: 'JetBrains Mono, monospace',
                    }}
                  >
                    {event.confidence}%
                  </span>
                  <span
                    style={{
                      fontSize: '0.68rem',
                      color: '#4a5568',
                      fontFamily: 'JetBrains Mono, monospace',
                    }}
                  >
                    {event.evidenceCount}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
