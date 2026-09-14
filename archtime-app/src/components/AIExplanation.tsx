import { mockAIExplanation } from '../data/mockData';

interface AIExplanationProps {
  onViewEvidence: () => void;
}

export default function AIExplanation({ onViewEvidence }: AIExplanationProps) {
  const data = mockAIExplanation;
  const facts = data.evidence.filter((e) => e.type === 'FACT');

  return (
    <div className="px-3 py-3">
      <div className="label-upper mb-2" style={{ fontSize: '0.68rem' }}>AI Explanation</div>

      {/* Query */}
      <div className="mb-2">
        <div
          style={{
            fontSize: '0.75rem',
            color: '#a0aec0',
            fontStyle: 'italic',
            marginBottom: 4,
          }}
        >
          {data.query}
        </div>
      </div>

      <div style={{ borderTop: '1px solid #141c25', paddingTop: 8 }} className="space-y-2">
        {/* Conclusion */}
        <div style={{ fontSize: '0.72rem', color: '#718096', lineHeight: 1.6 }}>
          {data.conclusion}
        </div>

        {/* Evidence mini list — show top facts only */}
        <div className="space-y-0.5">
          {facts.slice(0, 3).map((ev) => (
            <div key={ev.id} className="flex items-start gap-1.5">
              <span
                className="evidence-badge badge-fact flex-shrink-0"
                style={{ marginTop: 2 }}
              >
                FACT
              </span>
              <span style={{ fontSize: '0.68rem', color: '#718096' }}>{ev.statement}</span>
            </div>
          ))}
        </div>

        {/* Confidence */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1.5">
            <span style={{ fontSize: '0.68rem', color: '#4a5568' }}>Confidence:</span>
            <span
              style={{
                fontSize: '0.75rem',
                color: '#a0aec0',
                fontFamily: 'JetBrains Mono, monospace',
              }}
            >
              {data.confidence}%
            </span>
          </div>
          <button
            onClick={onViewEvidence}
            className="btn-action"
            style={{ fontSize: '0.58rem' }}
          >
            View Evidence
          </button>
        </div>
      </div>
    </div>
  );
}
