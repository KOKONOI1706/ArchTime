import { useState } from 'react';
import { mockAIExplanation } from '../data/mockData';

const queries = [
  'Why was Payment extracted from Order?',
  'What caused the module split in 2023?',
  'What changed between v1 and v2 architecture?',
];

export default function AIAssistant() {
  const [activeQuery, setActiveQuery] = useState(queries[0]);
  const data = mockAIExplanation;

  return (
    <div className="h-full overflow-y-auto p-6" style={{ background: '#050505' }}>
      <div className="max-w-3xl mx-auto">
        <div className="label-upper mb-6" style={{ fontSize: '0.65rem', letterSpacing: '0.15em' }}>
          Architecture Investigation
        </div>

        {/* Query selector */}
        <div className="border border-border mb-6" style={{ background: '#080808' }}>
          <div className="px-4 py-2 border-b border-border">
            <div className="label-upper mb-1">Query</div>
          </div>
          <div className="p-4 space-y-2">
            {queries.map((q) => (
              <button
                key={q}
                onClick={() => setActiveQuery(q)}
                className="w-full text-left px-3 py-2 border transition-all"
                style={{
                  background: activeQuery === q ? 'rgba(255,255,255,0.04)' : 'transparent',
                  borderColor: activeQuery === q ? '#3a3a3a' : '#1a1a1a',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  fontSize: '0.68rem',
                  color: activeQuery === q ? '#f0f0f0' : '#606060',
                }}
              >
                {activeQuery === q && <span className="text-text-muted mr-2">›</span>}
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Horizontal rule */}
        <div className="border-t border-border mb-6" />

        {/* Analysis header */}
        <div className="label-upper mb-4" style={{ fontSize: '0.65rem', letterSpacing: '0.15em' }}>Analysis</div>

        <div className="space-y-5">
          {/* Detected event */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="label-upper mb-1">Detected Event</div>
              <div className="font-mono text-text-primary" style={{ fontSize: '0.72rem' }}>
                {data.event}
              </div>
            </div>
            <div className="border-l border-border pl-4">
              <div className="label-upper mb-1">Confidence</div>
              <div className="font-mono text-text-primary" style={{ fontSize: '0.72rem' }}>
                {data.confidence}%
              </div>
            </div>
          </div>

          <div className="border-t border-border" />

          {/* Evidence */}
          <div>
            <div className="label-upper mb-3">Evidence</div>
            <div className="space-y-2">
              {data.evidence.map((ev) => (
                <div
                  key={ev.index}
                  className="flex items-start gap-3 p-2 border"
                  style={{
                    borderColor: '#1a1a1a',
                    background: '#080808',
                  }}
                >
                  <span className="font-mono text-text-muted flex-shrink-0" style={{ fontSize: '0.6rem', marginTop: 1 }}>
                    [{ev.index}]
                  </span>
                  <span className="text-text-secondary flex-1" style={{ fontSize: '0.63rem', lineHeight: 1.6 }}>
                    {ev.text}
                  </span>
                  <span
                    className={`evidence-badge flex-shrink-0 ${
                      ev.type === 'FACT' ? 'badge-fact' : ev.type === 'INFERENCE' ? 'badge-inference' : 'badge-unknown'
                    }`}
                  >
                    {ev.type}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-border" />

          {/* Conclusion */}
          <div>
            <div className="label-upper mb-2">Conclusion</div>
            <div className="text-text-secondary" style={{ fontSize: '0.65rem', lineHeight: 1.8 }}>
              {data.conclusion}
            </div>
          </div>

          <div className="border-t border-border" />

          {/* Caveat / distinction */}
          <div className="p-3 border border-border-bright" style={{ background: '#0a0a0a' }}>
            <div className="flex items-start gap-2">
              <span className="evidence-badge badge-unknown flex-shrink-0" style={{ marginTop: 2 }}>IMPORTANT</span>
              <div className="text-text-muted" style={{ fontSize: '0.6rem', lineHeight: 1.7 }}>
                {data.caveat}
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-5 pt-2">
            <span className="text-text-muted" style={{ fontSize: '0.55rem' }}>Legend:</span>
            {[
              { badge: 'badge-fact', label: 'FACT — derived from repository data' },
              { badge: 'badge-inference', label: 'INFERENCE — AI interpretation' },
              { badge: 'badge-unknown', label: 'UNKNOWN — insufficient evidence' },
            ].map((item) => (
              <div key={item.badge} className="flex items-center gap-1.5">
                <span className={`evidence-badge ${item.badge}`}>{item.badge.replace('badge-', '').toUpperCase()}</span>
                <span className="text-text-muted" style={{ fontSize: '0.55rem' }}>{item.label.split('—')[1]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
