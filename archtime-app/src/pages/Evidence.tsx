import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockEvidenceData, type EvidenceItem } from '../data/mockData';
import EvidenceTypeBadge from '../components/shared/EvidenceTypeBadge';
import ChangeBadge from '../components/shared/ChangeBadge';

type Filter = 'ALL' | 'FACT' | 'INFERENCE' | 'UNKNOWN';

// ── Evidence card ─────────────────────────────────────────────────────────────
function EvidenceCard({ item, index }: { item: EvidenceItem; index: number }) {
  const navigate = useNavigate();

  return (
    <div
      style={{
        border: '1px solid #141c25',
        background: '#0c1117',
        padding: '12px 16px',
        marginBottom: 1,
      }}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-4 mb-2">
        <div className="flex items-center gap-3">
          <span
            style={{
              fontSize: '0.6rem',
              color: '#2d3748',
              fontFamily: 'JetBrains Mono, monospace',
              width: 18,
              flexShrink: 0,
            }}
          >
            {String(index).padStart(2, '0')}
          </span>
          <EvidenceTypeBadge type={item.type} />
        </div>
        {item.commitSha && (
          <span
            className="commit-hash"
            style={{ fontSize: '0.65rem', flexShrink: 0 }}
          >
            {item.commitSha}
          </span>
        )}
      </div>

      {/* Statement */}
      <div
        style={{
          fontSize: '0.75rem',
          color: '#a0aec0',
          lineHeight: 1.65,
          paddingLeft: 24,
        }}
      >
        {item.statement}
      </div>

      {/* Source */}
      {item.source && (
        <div
          className="flex items-center gap-2 mt-2"
          style={{ paddingLeft: 24 }}
        >
          {item.sourceType && (
            <span
              style={{
                fontSize: '0.55rem',
                color: '#2d3748',
                border: '1px solid #1a2332',
                padding: '1px 5px',
                fontFamily: 'JetBrains Mono, monospace',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              {item.sourceType}
            </span>
          )}
          <span
            style={{
              fontSize: '0.65rem',
              color: '#3d4f63',
              fontFamily: 'JetBrains Mono, monospace',
            }}
          >
            {item.source}
          </span>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2 mt-2" style={{ paddingLeft: 24 }}>
        {item.commitSha && (
          <button
            className="btn-action"
            style={{ fontSize: '0.58rem', padding: '1px 6px' }}
          >
            Open Commit
          </button>
        )}
        {item.filePath && (
          <button
            className="btn-action"
            style={{ fontSize: '0.58px', padding: '1px 6px' }}
          >
            View File
          </button>
        )}
        {item.type !== 'UNKNOWN' && (
          <button
            className="btn-action"
            style={{ fontSize: '0.58rem', padding: '1px 6px' }}
            onClick={() => navigate('/changes')}
          >
            View Change
          </button>
        )}
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function Evidence() {
  const data = mockEvidenceData;
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<Filter>('ALL');

  const filtered =
    activeFilter === 'ALL'
      ? data.evidenceItems
      : data.evidenceItems.filter((e) => e.type === activeFilter);

  const factCount = data.evidenceItems.filter((e) => e.type === 'FACT').length;
  const inferCount = data.evidenceItems.filter((e) => e.type === 'INFERENCE').length;
  const unknownCount = data.evidenceItems.filter((e) => e.type === 'UNKNOWN').length;

  return (
    <div className="h-full flex flex-col overflow-hidden" style={{ background: '#080b0f' }}>

      {/* Context header */}
      <div
        className="flex items-start justify-between flex-shrink-0"
        style={{
          padding: '12px 20px',
          borderBottom: '1px solid #141c25',
          background: '#0c1117',
        }}
      >
        <div>
          <div className="label-upper mb-1">Architectural Change</div>
          <div className="flex items-center gap-3 mb-1">
            <ChangeBadge typeKey={data.changeTypeKey} label={data.changeType} />
            <span
              className="commit-hash"
              style={{ fontSize: '0.72rem' }}
            >
              {data.commitSha}
            </span>
          </div>
          <div
            style={{
              fontSize: '0.68rem',
              color: '#4a5568',
              fontFamily: 'JetBrains Mono, monospace',
              maxWidth: 500,
            }}
          >
            {data.message}
          </div>
          <div
            className="flex items-center gap-3 mt-1"
            style={{ fontSize: '0.65rem', color: '#3d4f63' }}
          >
            <span>{data.author}</span>
            <span>·</span>
            <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>{data.date}</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="label-upper mb-0.5">Confidence</div>
            <div
              style={{
                fontSize: '1.1rem',
                fontWeight: 600,
                color: '#e2e8f0',
                fontFamily: 'JetBrains Mono, monospace',
              }}
            >
              {data.confidence}%
            </div>
          </div>
          <div className="text-right">
            <div className="label-upper mb-0.5">Evidence Items</div>
            <div
              style={{
                fontSize: '1.1rem',
                fontWeight: 600,
                color: '#e2e8f0',
                fontFamily: 'JetBrains Mono, monospace',
              }}
            >
              {data.evidenceItems.length}
            </div>
          </div>
          <div className="flex flex-col gap-1.5" style={{ marginLeft: 8 }}>
            <button className="btn-action" onClick={() => navigate('/changes')}>
              View Change
            </button>
            <button className="btn-action" onClick={() => navigate('/analyst')}>
              Ask AI Analyst
            </button>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">

        {/* Main: evidence items */}
        <div className="flex flex-col flex-1 overflow-hidden">

          {/* Filter bar + counts */}
          <div
            className="flex items-center gap-4 flex-shrink-0"
            style={{
              padding: '8px 20px',
              borderBottom: '1px solid #141c25',
            }}
          >
            <div className="flex items-center gap-px">
              {(['ALL', 'FACT', 'INFERENCE', 'UNKNOWN'] as Filter[]).map((f) => (
                <button
                  key={f}
                  className={`btn-mode ${activeFilter === f ? 'active' : ''}`}
                  onClick={() => setActiveFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-4" style={{ marginLeft: 'auto' }}>
              {[
                { label: 'FACT', count: factCount, color: '#68d391' },
                { label: 'INFERENCE', count: inferCount, color: '#f6ad55' },
                { label: 'UNKNOWN', count: unknownCount, color: '#4a5568' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-1.5">
                  <span style={{ fontSize: '0.65rem', color: item.color, fontWeight: 600 }}>
                    {item.count}
                  </span>
                  <span style={{ fontSize: '0.62rem', color: '#3d4f63' }}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Evidence list */}
          <div className="flex-1 overflow-y-auto" style={{ padding: '12px 20px' }}>
            {filtered.length === 0 ? (
              <div style={{ padding: '24px', textAlign: 'center', color: '#2d3748', fontSize: '0.72rem' }}>
                No evidence items match the selected filter.
              </div>
            ) : (
              filtered.map((item, i) => (
                <EvidenceCard key={item.id} item={item} index={i + 1} />
              ))
            )}

            {/* Epistemic notice */}
            <div
              style={{
                marginTop: 16,
                padding: '12px 16px',
                border: '1px solid #1a2332',
                background: '#080b0f',
              }}
            >
              <div className="label-upper mb-2" style={{ fontSize: '0.58rem' }}>
                Evidence Interpretation Guide
              </div>
              <div className="flex items-start gap-8">
                {[
                  {
                    badge: 'FACT' as const,
                    desc: 'Directly observed in the repository. Commit, file, or AST data.',
                  },
                  {
                    badge: 'INFERENCE' as const,
                    desc: 'Reasonable interpretation based on observed patterns. Not directly proven.',
                  },
                  {
                    badge: 'UNKNOWN' as const,
                    desc: 'Cannot be determined from available repository evidence.',
                  },
                ].map((item) => (
                  <div key={item.badge} className="flex items-start gap-2">
                    <EvidenceTypeBadge type={item.badge} />
                    <span style={{ fontSize: '0.65rem', color: '#3d4f63', lineHeight: 1.5 }}>
                      {item.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: evidence sources summary */}
        <div
          className="flex flex-col flex-shrink-0 overflow-hidden"
          style={{ width: 240, borderLeft: '1px solid #141c25', background: '#080b0f' }}
        >
          <div
            style={{
              padding: '8px 14px',
              borderBottom: '1px solid #141c25',
              background: '#0c1117',
            }}
          >
            <div className="label-upper">Evidence Sources</div>
          </div>

          <div className="overflow-y-auto flex-1" style={{ padding: '12px 14px' }}>
            {/* Changed files */}
            <div className="label-upper mb-2" style={{ marginTop: 4 }}>Changed Files</div>
            {data.changedFiles.map((f, i) => (
              <div
                key={i}
                className="flex items-center gap-2 mb-1"
                style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem' }}
              >
                <span
                  style={{
                    color: f.op === '+' ? '#68d391' : '#fc8181',
                    width: 10,
                    flexShrink: 0,
                  }}
                >
                  {f.op}
                </span>
                <span
                  style={{
                    color: f.op === '+' ? '#718096' : '#3d4f63',
                    textDecoration: f.op === '-' ? 'line-through' : 'none',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {f.path}
                </span>
              </div>
            ))}

            {/* AST Changes */}
            <div className="label-upper mb-2 mt-4">AST Changes</div>
            {data.astChanges.map((c, i) => (
              <div key={i} className="flex items-start gap-2 mb-1">
                <span style={{ fontSize: '0.6rem', color: '#2d3748' }}>›</span>
                <span style={{ fontSize: '0.65rem', color: '#4a5568', lineHeight: 1.5 }}>{c}</span>
              </div>
            ))}

            {/* Architecture delta */}
            <div className="label-upper mb-2 mt-4">Architecture Delta</div>
            <div
              style={{
                padding: '8px 10px',
                background: '#0c1117',
                border: '1px solid #141c25',
              }}
            >
              <div style={{ fontSize: '0.6rem', color: '#3d4f63', marginBottom: 4 }}>Before</div>
              <div
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.65rem',
                  color: '#4a5568',
                  marginBottom: 8,
                }}
              >
                {data.archBefore}
              </div>
              <div style={{ fontSize: '0.6rem', color: '#3d4f63', marginBottom: 4 }}>After</div>
              <div
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.65rem',
                  color: '#a0aec0',
                }}
              >
                {data.archAfter}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
