import { mockDiffData } from '../data/mockData';

interface DiffViewProps {
  onClose?: () => void;
  inline?: boolean;
}

export default function DiffView({ onClose, inline = false }: DiffViewProps) {
  const data = mockDiffData;

  const content = (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="label-upper mb-1">Commit</div>
          <div className="font-mono text-text-primary" style={{ fontSize: '0.7rem' }}>
            {data.commitSha} — "{data.message}"
          </div>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-text-muted" style={{ fontSize: '0.6rem' }}>{data.author}</span>
            <span className="text-text-muted" style={{ fontSize: '0.6rem' }}>{data.date}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="label-upper mb-1">Change Type</div>
          <div className="font-mono text-text-primary" style={{ fontSize: '0.65rem' }}>{data.changeType}</div>
          <div className="flex items-center gap-1 mt-1 justify-end">
            <span className="text-text-muted" style={{ fontSize: '0.58rem' }}>Confidence:</span>
            <span className="font-mono text-text-primary" style={{ fontSize: '0.65rem' }}>{data.confidence}%</span>
          </div>
        </div>
      </div>

      <div className="border-t border-border" />

      {/* Before / After */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="label-upper mb-2">Before</div>
          <div className="border border-border p-3" style={{ background: '#080808' }}>
            {data.before.map((line, i) => (
              <div key={i} className="font-mono text-text-muted" style={{ fontSize: '0.62rem', lineHeight: 1.8 }}>
                {line}
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="label-upper mb-2">After</div>
          <div className="border border-border p-3" style={{ background: '#080808' }}>
            {data.after.map((line, i) => (
              <div
                key={i}
                className="font-mono"
                style={{
                  fontSize: '0.62rem',
                  lineHeight: 1.8,
                  color: line.includes('NEW') ? '#d0d0d0' : '#888',
                }}
              >
                {line}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-border" />

      {/* Structural Changes */}
      <div>
        <div className="label-upper mb-2">Structural Changes</div>
        <div className="space-y-0.5">
          {data.structuralChanges.map((c, i) => (
            <div key={i} className="flex items-center gap-2 font-mono" style={{ fontSize: '0.62rem' }}>
              <span style={{ color: c.op === '+' ? '#d0d0d0' : '#444', width: 10, flexShrink: 0 }}>
                {c.op}
              </span>
              <span
                style={{
                  color: c.op === '+' ? '#c0c0c0' : '#444',
                  textDecoration: c.op === '-' ? 'line-through' : 'none',
                }}
              >
                {c.path}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-border" />

      {/* Dependency Changes */}
      <div>
        <div className="label-upper mb-2">Dependency Changes</div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-text-muted mb-1" style={{ fontSize: '0.58rem' }}>Before:</div>
            <div className="font-mono text-text-muted" style={{ fontSize: '0.65rem' }}>
              {data.dependencyBefore}
            </div>
          </div>
          <div>
            <div className="text-text-muted mb-1" style={{ fontSize: '0.58rem' }}>After:</div>
            <div className="font-mono text-text-primary" style={{ fontSize: '0.65rem' }}>
              {data.dependencyAfter}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (inline) {
    return (
      <div className="p-6">
        <div className="label-upper mb-4" style={{ fontSize: '0.65rem' }}>Architectural Diff</div>
        {content}
      </div>
    );
  }

  return (
    <div
      className="fixed inset-y-0 right-0 z-50 border-l border-border overflow-y-auto"
      style={{ width: 560, background: '#080808' }}
    >
      <div className="flex items-center justify-between px-5 py-3 border-b border-border sticky top-0" style={{ background: '#080808' }}>
        <div className="label-upper" style={{ fontSize: '0.65rem' }}>Architectural Diff — {data.commitSha}</div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-text-muted hover:text-text-primary transition-colors"
            style={{ fontSize: '0.7rem', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
          >
            ✕
          </button>
        )}
      </div>
      <div className="px-5 py-4">{content}</div>
    </div>
  );
}
