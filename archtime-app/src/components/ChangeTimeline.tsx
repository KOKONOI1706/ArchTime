import { useState } from 'react';
import { mockArchitecturalChanges, type ArchitecturalChange } from '../data/mockData';

interface ChangeTimelineProps {
  onChangeSelect: (change: ArchitecturalChange) => void;
}

export default function ChangeTimeline({ onChangeSelect }: ChangeTimelineProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="px-3 py-3 border-b border-border">
      <div className="label-upper mb-3" style={{ fontSize: '0.68rem' }}>Recent Architectural Changes</div>

      <div className="space-y-0">
        {mockArchitecturalChanges.map((change) => {
          const isHovered = hoveredId === change.id;
          return (
            <div
              key={change.id}
              className="relative pl-4 pb-3 cursor-pointer"
              onMouseEnter={() => setHoveredId(change.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => onChangeSelect(change)}
            >
              {/* Vertical connector */}
              <div
                className="absolute left-1.5 top-5"
                style={{
                  width: 1,
                  bottom: 0,
                  background: '#1a1a1a',
                }}
              />

              {/* Dot */}
              <div
                className="absolute left-0 top-1.5"
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: '50%',
                  background: isHovered ? '#d0d0d0' : '#3a3a3a',
                  border: '1px solid #444',
                  transition: 'background 0.1s',
                }}
              />

              <div>
                <div
                  style={{
                    fontSize: '0.75rem',
                    color: isHovered ? '#f0f0f0' : '#c0c0c0',
                    transition: 'color 0.1s',
                    fontWeight: 500,
                  }}
                >
                  {change.type}
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-text-muted font-mono" style={{ fontSize: '0.68rem' }}>
                    {change.date} {change.time}
                  </span>
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                  {change.from && (
                    <>
                      <span className="text-text-muted font-mono" style={{ fontSize: '0.68rem' }}>{change.from}</span>
                      <span className="text-text-muted" style={{ fontSize: '0.65rem' }}>→</span>
                    </>
                  )}
                  <span className="text-text-secondary font-mono" style={{ fontSize: '0.68rem' }}>{change.to}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
