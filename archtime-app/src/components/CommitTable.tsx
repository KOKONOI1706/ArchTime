import { useState } from 'react';
import { mockCommits, type Commit } from '../data/mockData';

interface CommitTableProps {
  onCommitSelect: (commit: Commit) => void;
}

export default function CommitTable({ onCommitSelect }: CommitTableProps) {
  const [hoveredSha, setHoveredSha] = useState<string | null>(null);

  return (
    <div className="flex-shrink-0" style={{ background: '#050505' }}>
      {/* Table header */}
      <div
        className="grid border-b border-border"
        style={{
          gridTemplateColumns: '72px 1fr 120px 100px 1fr',
          padding: '6px 14px',
          borderTop: '1px solid #1a1a1a',
        }}
      >
        <div className="label-upper" style={{ fontSize: '0.65rem' }}>SHA</div>
        <div className="label-upper" style={{ fontSize: '0.65rem' }}>Message</div>
        <div className="label-upper" style={{ fontSize: '0.65rem' }}>Author</div>
        <div className="label-upper" style={{ fontSize: '0.65rem' }}>Date</div>
        <div className="label-upper" style={{ fontSize: '0.65rem' }}>Architectural Change</div>
      </div>

      {/* Rows */}
      {mockCommits.map((commit) => {
        const isHovered = hoveredSha === commit.sha;
        return (
          <div
            key={commit.sha}
            className="grid border-b cursor-pointer"
            style={{
              gridTemplateColumns: '72px 1fr 120px 100px 1fr',
              padding: '7px 14px',
              borderBottomColor: '#111',
              background: isHovered ? 'rgba(255,255,255,0.025)' : 'transparent',
              transition: 'background 0.1s',
              alignItems: 'center',
              gap: 0,
            }}
            onMouseEnter={() => setHoveredSha(commit.sha)}
            onMouseLeave={() => setHoveredSha(null)}
            onClick={() => onCommitSelect(commit)}
          >
            <span
              className="font-mono"
              style={{
                fontSize: '0.73rem',
                color: isHovered ? '#f0f0f0' : '#888',
                transition: 'color 0.1s',
              }}
            >
              {commit.sha}
            </span>
            <span
              className="font-mono"
              style={{
                fontSize: '0.73rem',
                color: isHovered ? '#c0c0c0' : '#606060',
                paddingRight: 8,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {commit.message}
            </span>
            <span style={{ fontSize: '0.72rem', color: '#606060' }}>
              {commit.author}
            </span>
            <span className="font-mono" style={{ fontSize: '0.72rem', color: '#555' }}>
              {commit.date}
            </span>
            <span style={{ fontSize: '0.72rem', color: isHovered ? '#c0c0c0' : '#606060' }}>
              {commit.architecturalChange}
            </span>
          </div>
        );
      })}

      {/* Hover metadata row */}
      {hoveredSha && (() => {
        const commit = mockCommits.find((c) => c.sha === hoveredSha);
        if (!commit) return null;
        return (
          <div
            className="flex items-center gap-4 px-3 py-1.5 border-t"
            style={{ borderColor: '#1a1a1a', background: '#0a0a0a' }}
          >
            <span className="text-text-muted font-mono" style={{ fontSize: '0.55rem' }}>
              FILES: {commit.filesChanged}
            </span>
            <span className="text-text-muted font-mono" style={{ fontSize: '0.55rem' }}>
              +{commit.additions}
            </span>
            <span className="text-text-muted font-mono" style={{ fontSize: '0.55rem' }}>
              -{commit.deletions}
            </span>
            <span className="text-text-muted font-mono" style={{ fontSize: '0.55rem' }}>
              TYPE: {commit.changeType}
            </span>
          </div>
        );
      })()}
    </div>
  );
}
