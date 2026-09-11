import { mockAIExplanation } from '../data/mockData';

interface AIExplanationProps {
  onViewEvidence: () => void;
}

export default function AIExplanation({ onViewEvidence }: AIExplanationProps) {
  const data = mockAIExplanation;

  return (
    <div className="px-3 py-3">
      <div className="label-upper mb-2">AI Explanation</div>

      {/* Query */}
      <div className="mb-2">
        <div className="text-text-primary" style={{ fontSize: '0.65rem', fontStyle: 'italic', marginBottom: 4 }}>
          {data.query}
        </div>
      </div>

      <div className="border-t border-border pt-2 space-y-2">
        {/* Conclusion */}
        <div className="text-text-secondary" style={{ fontSize: '0.6rem', lineHeight: 1.6 }}>
          {data.conclusion}
        </div>

        {/* Evidence mini list */}
        <div className="space-y-0.5">
          {data.evidence.slice(0, 4).map((ev) => (
            <div key={ev.index} className="flex items-start gap-1.5">
              <span className="text-text-muted font-mono" style={{ fontSize: '0.55rem', marginTop: 1 }}>
                [{ev.index}]
              </span>
              <span className="text-text-secondary" style={{ fontSize: '0.58rem' }}>{ev.text}</span>
            </div>
          ))}
        </div>

        {/* Confidence */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1.5">
            <span className="text-text-muted" style={{ fontSize: '0.58rem' }}>Confidence:</span>
            <span className="text-text-primary font-mono" style={{ fontSize: '0.65rem' }}>{data.confidence}%</span>
          </div>
          <button
            onClick={onViewEvidence}
            className="text-text-secondary hover:text-text-primary transition-colors"
            style={{
              fontSize: '0.58rem',
              padding: '2px 8px',
              border: '1px solid #2a2a2a',
              background: 'transparent',
              cursor: 'pointer',
              fontFamily: 'inherit',
              letterSpacing: '0.04em',
            }}
          >
            [ VIEW EVIDENCE ]
          </button>
        </div>
      </div>
    </div>
  );
}
