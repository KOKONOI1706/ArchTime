import { useState } from 'react';
import { mockArchNodes, mockArchEdges } from '../data/mockData';

export default function ArchitectureGraph() {
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
  const H = 260;

  const nodeMap = Object.fromEntries(mockArchNodes.map((n) => [n.id, n]));

  return (
    <div className="px-3 py-3 border-b border-border">
      <div className="label-upper mb-2">Current Architecture</div>

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
            <line key={`vg${i}`} x1={i * 20} y1={0} x2={i * 20} y2={H} stroke="#0d0d0d" strokeWidth={0.5} />
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
                stroke={isHighlighted ? '#888' : '#222'}
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
                style={{ cursor: 'pointer' }}
              >
                <rect
                  x={node.x}
                  y={node.y}
                  width={node.w}
                  height={node.h}
                  fill={isHovered ? '#1a1a1a' : '#0d0d0d'}
                  stroke={isHovered ? '#888' : isConnected ? '#3a3a3a' : '#1a1a1a'}
                  strokeWidth={1}
                  style={{ transition: 'all 0.1s' }}
                  opacity={isDimmed ? 0.3 : 1}
                />
                <text
                  x={node.x + node.w / 2}
                  y={node.y + 14}
                  textAnchor="middle"
                  fill={isDimmed ? '#333' : isHovered ? '#f0f0f0' : '#888'}
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
