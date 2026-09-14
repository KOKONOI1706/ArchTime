import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockAIExplanation, mockRepository, type EvidenceItem } from '../data/mockData';
import EvidenceTypeBadge from '../components/shared/EvidenceTypeBadge';
import ChangeBadge from '../components/shared/ChangeBadge';

const SUGGESTED_QUESTIONS = [
  'Why was Payment extracted from the monolith?',
  'What architectural pattern is visible in this change?',
  'What evidence supports this service extraction?',
  'What changed between the monolith and microservice architectures?',
  'What cannot be determined from the repository evidence?',
];

// ── Evidence section ──────────────────────────────────────────────────────────
function EvidenceSection({ items, type }: { items: EvidenceItem[]; type: EvidenceItem['type'] }) {
  if (items.length === 0) return null;

  return (
    <div className="mb-4">
      <div className="flex items-center gap-3 mb-2">
        <EvidenceTypeBadge type={type} />
        <div style={{ flex: 1, height: 1, background: '#141c25' }} />
      </div>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div
            key={item.id ?? i}
            style={{
              padding: '10px 14px',
              border: '1px solid #141c25',
              background: '#0c1117',
              lineHeight: 1.65,
            }}
          >
            <div style={{ fontSize: '0.75rem', color: '#a0aec0' }}>{item.statement}</div>
            {item.source && (
              <div
                className="flex items-center gap-2 mt-2"
              >
                {item.sourceType && (
                  <span
                    style={{
                      fontSize: '0.55rem',
                      color: '#2d3748',
                      border: '1px solid #1a2332',
                      padding: '1px 5px',
                      fontFamily: 'JetBrains Mono, monospace',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
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
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function AIAnalyst() {
  const navigate = useNavigate();
  const [activeQuery, setActiveQuery] = useState(SUGGESTED_QUESTIONS[0]);
  const data = mockAIExplanation;

  const facts = data.evidence.filter((e) => e.type === 'FACT');
  const inferences = data.evidence.filter((e) => e.type === 'INFERENCE');
  const unknowns = data.evidence.filter((e) => e.type === 'UNKNOWN');

  return (
    <div className="h-full flex flex-col overflow-hidden" style={{ background: '#080b0f' }}>

      {/* Context bar */}
      <div
        className="flex items-center gap-6 flex-shrink-0"
        style={{
          padding: '10px 20px',
          borderBottom: '1px solid #141c25',
          background: '#0c1117',
        }}
      >
        <div>
          <div className="label-upper mb-0.5">Repository</div>
          <span style={{ fontSize: '0.72rem', color: '#718096', fontFamily: 'JetBrains Mono, monospace' }}>
            {mockRepository.fullName}
          </span>
        </div>
        <div style={{ width: 1, height: 20, background: '#141c25' }} />
        <div>
          <div className="label-upper mb-0.5">Commit</div>
          <span className="commit-hash" style={{ fontSize: '0.72rem' }}>
            {data.commit}
          </span>
        </div>
        <div style={{ width: 1, height: 20, background: '#141c25' }} />
        <div>
          <div className="label-upper mb-0.5">Change</div>
          <ChangeBadge typeKey={data.event} />
        </div>
        <div style={{ width: 1, height: 20, background: '#141c25' }} />
        <div>
          <div className="label-upper mb-0.5">Evidence</div>
          <span style={{ fontSize: '0.72rem', color: '#718096', fontFamily: 'JetBrains Mono, monospace' }}>
            {data.evidenceCount} items
          </span>
        </div>
        <div style={{ width: 1, height: 20, background: '#141c25' }} />
        <div>
          <div className="label-upper mb-0.5">Confidence</div>
          <span style={{ fontSize: '0.72rem', color: '#a0aec0', fontFamily: 'JetBrains Mono, monospace' }}>
            {data.confidence}%
          </span>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          <button className="btn-action" onClick={() => navigate('/evidence')}>View Evidence</button>
          <button className="btn-action" onClick={() => navigate('/changes')}>View Changes</button>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">

        {/* Left: questions + response */}
        <div className="flex flex-col flex-1 overflow-hidden">

          {/* Suggested questions */}
          <div
            className="flex-shrink-0"
            style={{
              padding: '12px 20px',
              borderBottom: '1px solid #141c25',
              background: '#080b0f',
            }}
          >
            <div className="label-upper mb-2">Suggested Questions</div>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => setActiveQuery(q)}
                  style={{
                    padding: '4px 10px',
                    border: '1px solid',
                    borderColor: activeQuery === q ? '#2b6cb0' : '#1a2332',
                    background: activeQuery === q ? 'rgba(66,153,225,0.06)' : 'transparent',
                    color: activeQuery === q ? '#63b3ed' : '#4a5568',
                    fontSize: '0.68rem',
                    cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif',
                    transition: 'all 0.1s',
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Active query */}
          <div
            className="flex-shrink-0"
            style={{
              padding: '12px 20px',
              borderBottom: '1px solid #141c25',
            }}
          >
            <div className="label-upper mb-1">Query</div>
            <div
              style={{
                fontSize: '0.82rem',
                color: '#e2e8f0',
                fontStyle: 'italic',
                lineHeight: 1.5,
              }}
            >
              "{activeQuery}"
            </div>
          </div>

          {/* Response area */}
          <div className="flex-1 overflow-y-auto" style={{ padding: '16px 20px' }}>

            {/* Conclusion */}
            <div className="mb-5">
              <div className="label-upper mb-2">Analysis</div>
              <div
                style={{
                  fontSize: '0.78rem',
                  color: '#a0aec0',
                  lineHeight: 1.75,
                  padding: '14px 16px',
                  border: '1px solid #141c25',
                  background: '#0c1117',
                }}
              >
                {data.conclusion}
              </div>
            </div>

            {/* Evidence sections by type */}
            <div className="mb-5">
              <div className="label-upper mb-3">Supporting Evidence</div>
              <EvidenceSection items={facts} type="FACT" />
              <EvidenceSection items={inferences} type="INFERENCE" />
              <EvidenceSection items={unknowns} type="UNKNOWN" />
            </div>

            {/* IMPORTANT caveat */}
            <div
              style={{
                padding: '12px 16px',
                border: '1px solid #1a2332',
                background: '#0c1117',
              }}
            >
              <div className="flex items-start gap-3">
                <span
                  style={{
                    fontSize: '0.55rem',
                    color: '#718096',
                    border: '1px solid #2d3748',
                    padding: '2px 6px',
                    fontFamily: 'JetBrains Mono, monospace',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                    flexShrink: 0,
                    marginTop: 1,
                  }}
                >
                  Note
                </span>
                <div style={{ fontSize: '0.72rem', color: '#4a5568', lineHeight: 1.65 }}>
                  {data.caveat}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: evidence summary + legend */}
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
            <div className="label-upper">Evidence Used</div>
          </div>

          <div className="overflow-y-auto flex-1" style={{ padding: '12px 14px' }}>
            {/* Coverage */}
            <div className="label-upper mb-1.5">Evidence Coverage</div>
            <div
              style={{
                height: 4,
                background: '#141c25',
                borderRadius: 2,
                marginBottom: 6,
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${data.confidence}%`,
                  background: '#4299e1',
                  borderRadius: 2,
                  transition: 'width 0.3s',
                }}
              />
            </div>
            <div
              style={{
                fontSize: '0.72rem',
                color: '#718096',
                fontFamily: 'JetBrains Mono, monospace',
                marginBottom: 12,
              }}
            >
              {data.confidence}%
            </div>

            {/* Type counts */}
            <div className="label-upper mb-2 mt-4">By Type</div>
            {[
              { type: 'FACT' as const, count: facts.length },
              { type: 'INFERENCE' as const, count: inferences.length },
              { type: 'UNKNOWN' as const, count: unknowns.length },
            ].map(({ type, count }) => (
              <div
                key={type}
                className="flex items-center justify-between mb-2"
              >
                <EvidenceTypeBadge type={type} />
                <span
                  style={{
                    fontSize: '0.72rem',
                    color: '#4a5568',
                    fontFamily: 'JetBrains Mono, monospace',
                  }}
                >
                  {count}
                </span>
              </div>
            ))}

            {/* Epistemic guide */}
            <div
              style={{
                marginTop: 20,
                borderTop: '1px solid #141c25',
                paddingTop: 14,
              }}
            >
              <div className="label-upper mb-3">Interpretation Guide</div>
              <div className="space-y-3">
                {[
                  { type: 'FACT' as const, desc: 'Directly derived from repository data.' },
                  { type: 'INFERENCE' as const, desc: 'AI interpretation of observed patterns.' },
                  { type: 'UNKNOWN' as const, desc: 'Cannot be determined from evidence.' },
                ].map(({ type, desc }) => (
                  <div key={type}>
                    <EvidenceTypeBadge type={type} />
                    <div style={{ fontSize: '0.62rem', color: '#3d4f63', marginTop: 4, lineHeight: 1.5 }}>
                      {desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ArchTime principle */}
            <div
              style={{
                marginTop: 16,
                borderTop: '1px solid #141c25',
                paddingTop: 12,
              }}
            >
              <div className="label-upper mb-2">Principle</div>
              <div style={{ fontSize: '0.62rem', color: '#2d3748', lineHeight: 1.6, fontStyle: 'italic' }}>
                ArchTime provides architectural evidence and context, not architectural authority.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
