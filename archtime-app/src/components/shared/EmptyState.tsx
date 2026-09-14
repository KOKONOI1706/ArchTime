interface EmptyStateProps {
  title: string;
  body?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export default function EmptyState({ title, body, action }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <div
        style={{
          width: 28,
          height: 28,
          border: '1px solid #1a2332',
          marginBottom: 14,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span style={{ fontSize: '0.7rem', color: '#2d3748' }}>—</span>
      </div>
      <div className="empty-state-title">{title}</div>
      {body && <div className="empty-state-body">{body}</div>}
      {action && (
        <button
          onClick={action.onClick}
          className="btn-action"
          style={{ marginTop: 16 }}
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
