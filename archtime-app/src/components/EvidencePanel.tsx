import { mockEvidenceData } from '../data/mockData';

interface EvidencePanelProps {
  onClose?: () => void;
  inline?: boolean;
}

export default function EvidencePanel({ onClose, inline = false }: EvidencePanelProps) {
  const data = mockEvidenceData;

  const content = (
    <div className="space-y-5">
      {/* Commit meta */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-1">
        {[
          { label: 'COMMIT', value: data.commitSha },
          { label: 'DATE', value: data.date },
          { label: 'AUTHOR', value: data.author },
          { label: 'MESSAGE', value: data.message },
        ].map((item) => (
          <div key={item.label}>
            <div className="label-upper mb-0.5">{item.label}</div>
            <div className="text-text-secondary font-mono" style={{ fontSize: '0.65rem' }}>{item.value}</div>
          </div>
        ))}
      </div>

      <div className="border-t border-border" />

      {/* Changed files */}
      <div>
        <div className="label-upper mb-2">Changed Files</div>
        <div className="space-y-0.5">
          {data.changedFiles.map((f, i) => (
            <div key={i} className="flex items-center gap-2 font-mono" style={{ fontSize: '0.62rem' }}>
              <span style={{ color: f.op === '+' ? '#c0c0c0' : '#444', width: 10 }}>{f.op}</span>
              <span className={f.op === '+' ? 'text-text-secondary' : 'text-text-muted'} style={{ textDecoration: f.op === '-' ? 'line-through' : 'none' }}>
                {f.path}
              </span>
              {f.op === '+' && (
                <span className="evidence-badge badge-fact ml-auto">FACT</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-border" />

      {/* AST Changes */}
      <div>
        <div className="label-upper mb-2">AST Changes</div>
        <div className="space-y-0.5">
          {data.astChanges.map((c, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-text-muted font-mono" style={{ fontSize: '0.55rem' }}>›</span>
              <span className="text-text-secondary" style={{ fontSize: '0.62rem' }}>{c}</span>
              <span className="evidence-badge badge-fact ml-auto">FACT</span>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-border" />

      {/* Architecture Evidence */}
      <div>
        <div className="label-upper mb-2">Architecture Evidence</div>
        <div className="space-y-2">
          <div>
            <span className="text-text-muted" style={{ fontSize: '0.58rem' }}>Before:</span>
            <div className="font-mono mt-0.5" style={{ fontSize: '0.65rem', color: '#555' }}>
              {data.archBefore}
            </div>
          </div>
          <div>
            <span className="text-text-muted" style={{ fontSize: '0.58rem' }}>After:</span>
            <div className="font-mono mt-0.5" style={{ fontSize: '0.65rem', color: '#d0d0d0' }}>
              {data.archAfter}
            </div>
          </div>
        </div>
      </div>

      {/* Interpretation notice */}
      <div className="border border-border-bright p-2" style={{ background: '#0a0a0a' }}>
        <div className="flex items-start gap-2">
          <span className="evidence-badge badge-unknown" style={{ marginTop: 1, flexShrink: 0 }}>IMPORTANT</span>
          <span className="text-text-muted" style={{ fontSize: '0.58rem', lineHeight: 1.6 }}>
            Items marked <strong className="text-text-secondary">FACT</strong> are derived directly from repository data.
            Items marked <strong className="text-text-secondary">INFERENCE</strong> are AI-generated interpretations.
            Items marked <strong className="text-text-secondary">UNKNOWN</strong> cannot be determined from available evidence.
          </span>
        </div>
      </div>
    </div>
  );

  if (inline) {
    return (
      <div className="p-6">
        <div className="label-upper mb-4" style={{ fontSize: '0.65rem' }}>Evidence</div>
        {content}
      </div>
    );
  }

  // Drawer mode
  return (
    <div
      className="fixed inset-y-0 right-0 z-50 border-l border-border overflow-y-auto"
      style={{ width: 420, background: '#080808' }}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-border sticky top-0" style={{ background: '#080808' }}>
        <div className="label-upper" style={{ fontSize: '0.65rem' }}>Evidence — {data.commitSha}</div>
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
      <div className="px-4 py-4">
        {content}
      </div>
    </div>
  );
}
