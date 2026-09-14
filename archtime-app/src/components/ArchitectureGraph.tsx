import { useState } from 'react';
import { mockArchNodes, mockArchEdges } from '../data/mockData';

interface ArchitectureGraphProps {
  onNodeSelect?: (id: string) => void;
  compact?: boolean;
}

export default function ArchitectureGraph({ onNodeSelect, compact = false }: ArchitectureGraphProps) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);


  const highlightedEdges = hoveredNode
    ? mockArchEdges.filter((e) => e.from === hoveredNode || e.to === hoveredNode)
    : [];

  const connectedNodes = new Set<string>();
  highlightedEdges.forEach((e) => {
    connectedNodes.add(e.from);
    connectedNodes.add(e.to);
  });

  // Layout: scale all positions uniformly
  const W = 400;
  const H = compact ? 180 : 260;

  const nodeMap = Object.fromEntries(mockArchNodes.map((n) => [n.id, n]));

  return (
    <div style={{ paddingBottom: compact ? 0 : undefined }}>
      {!compact && <div className="label-upper mb-2" style={{ padding: '4px 12px 0' }}>Current Architecture</div>}

      <div className="relative" style={{ width: '100%', height: H }}>
        <svg
          width="100%"
          height={H}
          viewBox={`0 0 ${W} ${H}`}
          style={{ overflow: 'visible' }}
        >
          {/* Background grid */}
          {Array.from({ length: 14 }).map((_, i) => (
            <line key={`hg${i}`} x1={0} y1={i * 20} x2={W} y2={i * 20} stroke="#0d0d0d" strokeWidth={0.5} />
          ))}
          {Array.from({ length: 20 }).map((_, i) => (
            <line key={`vg${i}`} x1={i * 20} y1={0} x2={i * 20} y2={H} stroke="#0d0d0d" strokeWidth={0.3} />
          ))}

          {/* Edges */}
          {mockArchEdges.map((edge, i) => {
            const from = nodeMap[edge.from];
            const to = nodeMap[edge.to];
            if (!from || !to) return null;

            const x1 = from.x + from.w / 2;
            const y1 = from.y + from.h;
            const x2 = to.x + to.w / 2;
            const y2 = to.y;

            const isHighlighted = highlightedEdges.some(
              (e) => e.from === edge.from && e.to === edge.to,
            );

            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={isHighlighted ? '#4299e1' : '#1a2332'}
                strokeWidth={isHighlighted ? 1.5 : 1}
                style={{ transition: 'stroke 0.1s' }}
              />
            );
          })}

          {/* Nodes */}
          {mockArchNodes.map((node) => {
            const isHovered = hoveredNode === node.id;
            const isConnected = connectedNodes.has(node.id);
            const isDimmed = hoveredNode !== null && !isConnected && !isHovered;

            return (
              <g
                key={node.id}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => onNodeSelect?.(node.id)}
                style={{ cursor: 'pointer' }}
              >
                <rect
                  x={node.x}
                  y={node.y}
                  width={node.w}
                  height={node.h}
                  fill={isHovered ? '#0f1922' : '#0c1117'}
                  stroke={isHovered ? '#4299e1' : isConnected ? '#2d4060' : '#141c25'}
                  strokeWidth={1}
                  style={{ transition: 'all 0.1s' }}
                  opacity={isDimmed ? 0.3 : 1}
                />
                <text
                  x={node.x + node.w / 2}
                  y={node.y + 14}
                  textAnchor="middle"
                  fill={isDimmed ? '#2d3748' : isHovered ? '#e2e8f0' : '#718096'}
                  fontSize={8}
                  fontFamily="JetBrains Mono, monospace"
                  style={{ transition: 'fill 0.1s' }}
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
