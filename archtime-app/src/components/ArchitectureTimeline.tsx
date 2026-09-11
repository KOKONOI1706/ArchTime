import { useState } from 'react';
import { mockTimelineEvents, type TimelineEvent } from '../data/mockData';

interface ArchitectureTimelineProps {
  selectedEvent: TimelineEvent | null;
  onEventSelect: (event: TimelineEvent) => void;
}

export default function ArchitectureTimeline({ selectedEvent, onEventSelect }: ArchitectureTimelineProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const yearLabels = ['2023', '2024', '2025'];

  return (
    <div className="px-4 py-3 border-t border-border flex-shrink-0" style={{ background: '#050505' }}>
      <div className="label-upper mb-3">Architecture Evolution Timeline</div>

      <div className="relative" style={{ height: 72 }}>
        {/* Main line */}
        <div
          className="absolute"
          style={{
            top: 28,
            left: 16,
            right: 16,
            height: 1,
            background: '#2a2a2a',
          }}
        />

        {/* Year tick marks */}
        {yearLabels.map((year, i) => {
          const pct = i / (yearLabels.length - 1);
          const left = `calc(${pct * 100}% * (1 - 0.04) + 1%)`;
          return (
            <div
              key={year}
              className="absolute flex flex-col items-center"
              style={{ left, top: 20, transform: 'translateX(-50%)' }}
            >
              <div style={{ width: 1, height: 8, background: '#3a3a3a' }} />
              <span className="text-text-muted font-mono" style={{ fontSize: '0.58rem', marginTop: 2 }}>
                {year}
              </span>
            </div>
          );
        })}

        {/* Events */}
        {mockTimelineEvents.map((event) => {
          const isSelected = selectedEvent?.id === event.id;
          const isHovered = hoveredId === event.id;

          return (
            <div
              key={event.id}
              className="absolute timeline-event"
              style={{
                left: `calc(${event.normalizedX * 92}% + 2%)`,
                top: 22,
                transform: 'translateX(-50%)',
              }}
              onClick={() => onEventSelect(event)}
              onMouseEnter={() => setHoveredId(event.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Dot */}
              <div
                style={{
                  width: isSelected ? 8 : 6,
                  height: isSelected ? 8 : 6,
                  borderRadius: '50%',
                  background: isSelected ? '#f0f0f0' : isHovered ? '#888' : '#444',
                  border: isSelected ? '1px solid #f0f0f0' : '1px solid #3a3a3a',
                  transition: 'all 0.1s',
                  margin: '0 auto',
                  position: 'relative',
                  zIndex: 2,
                }}
              />
              {/* Label below */}
              <div className="mt-1.5 text-center" style={{ minWidth: 70, transform: 'translateX(-30%)' }}>
                <div
                  className="event-label font-mono"
                  style={{
                    fontSize: '0.58rem',
                    color: isSelected ? '#f0f0f0' : isHovered ? '#c0c0c0' : '#606060',
                    transition: 'color 0.1s',
                    lineHeight: 1.3,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {event.title}
                </div>
                <div style={{ fontSize: '0.52rem', color: '#444', whiteSpace: 'nowrap' }}>
                  {event.subtitle}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
