import { useState } from 'react';
import { mockDiffData, mockArchitecturalChanges } from '../data/mockData';
import ChangeBadge from '../components/shared/ChangeBadge';
import ArchitectureGraph from '../components/ArchitectureGraph';

const FROM_SNAPSHOTS = [
  { label: '2023-01-15 — Initial Monolith', value: 'initial', commit: 'a1b2c3d' },
  { label: '2023-11-03 — After User Split', value: 'user-split', commit: 'f3e7b10' },
  { label: '2024-03-18 — Dependency Change', value: 'dep-change', commit: 'a91cc2e' },
];

const TO_SNAPSHOTS = [
  { label: '2024-06-12 — Payment Extraction', value: 'payment-extraction', commit: 'd82f91a' },
  { label: '2025-01-10 — Microservice Migration', value: 'microservice', commit: 'e19a44c' },
];

export default function ArchitecturalChanges() {
  const [fromSnapshot, setFromSnapshot] = useState(FROM_SNAPSHOTS[0].value);
  const [toSnapshot, setToSnapshot] = useState(TO_SNAPSHOTS[0].value);

  const data = mockDiffData;
  const fromSnap = FROM_SNAPSHOTS.find((s) => s.value === fromSnapshot)!;
  const toSnap = TO_SNAPSHOTS.find((s) => s.value === toSnapshot)!;

  return (
    <div className="h-full flex flex-col overflow-hidden" style={{ background: '#080b0f' }}>

      {/* FROM / TO selector bar */}
      <div
        className="flex items-center gap-4 flex-shrink-0"
        style={{
          padding: '10px 20px',
          borderBottom: '1px solid #141c25',
          background: '#080b0f',
        }}
      >
        <div className="flex items-center gap-2">
          <span className="label-upper">From</span>
          <select
            className="select-field"
            value={fromSnapshot}
            onChange={(e) => setFromSnapshot(e.target.value)}
          >
            {FROM_SNAPSHOTS.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
          <span
            style={{
              fontSize: '0.65rem',
              color: '#3d4f63',
              fontFamily: 'JetBrains Mono, monospace',
            }}
          >
            {fromSnap.commit}
          </span>
        </div>

        <div style={{ fontSize: '0.8rem', color: '#2d3748', padding: '0 4px' }}>→</div>

        <div className="flex items-center gap-2">
          <span className="label-upper">To</span>
          <select
            className="select-field"
            value={toSnapshot}
            onChange={(e) => setToSnapshot(e.target.value)}
          >
            {TO_SNAPSHOTS.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
          <span
            style={{
              fontSize: '0.65rem',
              color: '#3d4f63',
              fontFamily: 'JetBrains Mono, monospace',
            }}
          >
            {toSnap.commit}
          </span>
        </div>

        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="label-upper" style={{ fontSize: '0.58rem' }}>
            Confidence:
          </span>
          <span
            style={{
              fontSize: '0.72rem',
              color: '#a0aec0',
              fontFamily: 'JetBrains Mono, monospace',
            }}
          >
            {data.confidence}%
          </span>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">

        {/* Left: Architecture before/after */}
        <div className="flex flex-col flex-1 overflow-hidden">

          {/* Before / After header */}
          <div
            className="grid flex-shrink-0"
            style={{ gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid #141c25' }}
          >
            <div
              style={{
                padding: '8px 16px',
                borderRight: '1px solid #141c25',
                background: '#0c1117',
              }}
            >
              <div className="flex items-center gap-3">
                <div className="label-upper">Before</div>
                <span
                  style={{
                    fontSize: '0.65rem',
                    color: '#3d4f63',
                    fontFamily: 'JetBrains Mono, monospace',
                  }}
                >
                  {fromSnap.commit}
                </span>
              </div>
            </div>
            <div style={{ padding: '8px 16px', background: '#0c1117' }}>
              <div className="flex items-center gap-3">
                <div className="label-upper">After</div>
                <span
                  style={{
                    fontSize: '0.65rem',
                    color: '#4299e1',
                    fontFamily: 'JetBrains Mono, monospace',
                  }}
                >
                  {toSnap.commit}
                </span>
              </div>
            </div>
          </div>

          {/* Before / After architecture views */}
          <div className="grid flex-1 overflow-hidden" style={{ gridTemplateColumns: '1fr 1fr' }}>
            {/* Before */}
            <div
              className="flex flex-col overflow-hidden"
              style={{ borderRight: '1px solid #141c25' }}
            >
              <div className="flex-1 overflow-y-auto" style={{ padding: '16px' }}>
                <div className="label-upper mb-2" style={{ fontSize: '0.58rem' }}>Architecture Tree</div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem' }}>
                  {data.before.map((line, i) => (
                    <div key={i} style={{ color: '#4a5568', lineHeight: 1.9, paddingLeft: i === 0 ? 0 : 4 }}>
                      {line}
                    </div>
                  ))}
                </div>

                <div className="mt-4">
                  <div className="label-upper mb-2" style={{ fontSize: '0.58rem' }}>Dependency</div>
                  <div
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.7rem',
                      color: '#718096',
                    }}
                  >
                    {data.dependencyBefore}
                  </div>
                </div>

                {/* Mini graph */}
                <div className="mt-4">
                  <div className="label-upper mb-2" style={{ fontSize: '0.58rem' }}>Service Graph</div>
                  <div style={{ opacity: 0.6 }}>
                    <ArchitectureGraph compact />
                  </div>
                </div>
              </div>
            </div>

            {/* After */}
            <div className="flex flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto" style={{ padding: '16px' }}>
                <div className="label-upper mb-2" style={{ fontSize: '0.58rem' }}>Architecture Tree</div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem' }}>
                  {data.after.map((line, i) => (
                    <div
                      key={i}
                      style={{
                        color: line.includes('NEW') ? '#68d391' : '#718096',
                        lineHeight: 1.9,
                        paddingLeft: i === 0 ? 0 : 4,
                      }}
                    >
                      {line}
                    </div>
                  ))}
                </div>

                <div className="mt-4">
                  <div className="label-upper mb-2" style={{ fontSize: '0.58rem' }}>Dependency</div>
                  <div
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.7rem',
                      color: '#68d391',
                    }}
                  >
                    {data.dependencyAfter}
                  </div>
                </div>

                {/* Mini graph */}
                <div className="mt-4">
                  <div className="label-upper mb-2" style={{ fontSize: '0.58rem' }}>Service Graph</div>
                  <ArchitectureGraph compact />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: detected changes + structural changes */}
        <div
          className="flex flex-col flex-shrink-0 overflow-hidden"
          style={{ width: 300, borderLeft: '1px solid #141c25', background: '#080b0f' }}
        >

          {/* Detected changes */}
          <div
            className="flex-shrink-0"
            style={{ padding: '8px 14px', borderBottom: '1px solid #141c25', background: '#0c1117' }}
          >
            <div className="label-upper">Detected Changes</div>
          </div>
          <div className="flex-shrink-0" style={{ borderBottom: '1px solid #141c25' }}>
            {data.detectedChanges.map((change, i) => (
              <div
                key={i}
                style={{
                  padding: '8px 14px',
                  borderBottom: i < data.detectedChanges.length - 1 ? '1px solid #0f161d' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <span style={{ fontSize: '0.65rem', color: '#3d4f63' }}>+</span>
                <ChangeBadge typeKey={change.key} />
              </div>
            ))}
          </div>

          {/* Structural changes */}
          <div
            className="flex-shrink-0"
            style={{ padding: '8px 14px', borderBottom: '1px solid #141c25', background: '#0c1117' }}
          >
            <div className="label-upper">Structural Changes</div>
          </div>
          <div className="overflow-y-auto flex-1">
            {data.structuralChanges.map((c, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '4px 14px',
                  borderBottom: '1px solid #0f161d',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.65rem',
                }}
              >
                <span
                  style={{
                    color: c.op === '+' ? '#68d391' : '#fc8181',
                    width: 12,
                    flexShrink: 0,
                  }}
                >
                  {c.op}
                </span>
                <span
                  style={{
                    color: c.op === '+' ? '#a0aec0' : '#4a5568',
                    textDecoration: c.op === '-' ? 'line-through' : 'none',
                    opacity: c.op === '-' ? 0.7 : 1,
                  }}
                >
                  {c.path}
                </span>
              </div>
            ))}

            {/* Recent architecture changes list */}
            <div
              style={{
                padding: '8px 14px',
                borderTop: '1px solid #141c25',
                borderBottom: '1px solid #141c25',
                background: '#0c1117',
                marginTop: 8,
              }}
            >
              <div className="label-upper">Architecture Changes Log</div>
            </div>
            {mockArchitecturalChanges.slice(0, 5).map((change) => (
              <div
                key={change.id}
                style={{
                  padding: '8px 14px',
                  borderBottom: '1px solid #0f161d',
                  cursor: 'pointer',
                  transition: 'background 0.1s',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.02)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background = 'transparent';
                }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <ChangeBadge typeKey={change.changeTypeKey} />
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="commit-hash" style={{ fontSize: '0.62rem' }}>
                    {change.commitSha}
                  </span>
                  <span
                    style={{
                      fontSize: '0.62rem',
                      color: '#3d4f63',
                      fontFamily: 'JetBrains Mono, monospace',
                    }}
                  >
                    {change.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
