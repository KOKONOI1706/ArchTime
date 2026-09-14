import { useState } from 'react';
import ArchitectureVisualization from '../components/ArchitectureVisualization';
import ArchitectureGraph from '../components/ArchitectureGraph';
import { mockModules, type Module } from '../data/mockData';

type Level = 'Module' | 'Package' | 'Class';
type VizMode = '3D' | '2D' | 'GRAPH';

const LEVELS: Level[] = ['Module', 'Package', 'Class'];

const SNAPSHOTS = [
  { label: '2023-01-15 — Initial Monolith', value: 'initial' },
  { label: '2023-11-03 — After User Split', value: 'user-split' },
  { label: '2024-06-12 — After Payment Extraction', value: 'payment-extraction' },
  { label: '2025-01-10 — After Microservice Migration', value: 'microservice' },
];

// ── Node detail panel ─────────────────────────────────────────────────────────
function NodeDetail({ module }: { module: Module }) {
  return (
    <div
      style={{
        background: '#0c1117',
        border: '1px solid #141c25',
        padding: '16px',
        width: 260,
        flexShrink: 0,
      }}
    >
      <div className="label-upper mb-3">Module Detail</div>

      <div className="space-y-3">
        <div>
          <div className="label-upper mb-0.5">Name</div>
          <div style={{ fontSize: '0.78rem', color: '#e2e8f0', fontWeight: 500 }}>{module.name}</div>
        </div>
        <div>
          <div className="label-upper mb-0.5">ID</div>
          <div
            style={{
              fontSize: '0.68rem',
              color: '#718096',
              fontFamily: 'JetBrains Mono, monospace',
            }}
          >
            {module.id}
          </div>
        </div>
        <div>
          <div className="label-upper mb-0.5">Type</div>
          <div style={{ fontSize: '0.68rem', color: '#718096' }}>{module.type}</div>
        </div>

        <div style={{ borderTop: '1px solid #141c25', paddingTop: 10 }}>
          {[
            { label: 'Classes', value: module.classes },
            { label: 'Dependencies', value: module.dependencies },
            { label: 'Dependents', value: module.dependents },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between mb-1.5"
            >
              <span style={{ fontSize: '0.68rem', color: '#4a5568' }}>{item.label}</span>
              <span
                style={{
                  fontSize: '0.72rem',
                  color: '#a0aec0',
                  fontFamily: 'JetBrains Mono, monospace',
                }}
              >
                {item.value}
              </span>
            </div>
          ))}
        </div>

        <div style={{ borderTop: '1px solid #141c25', paddingTop: 10 }}>
          <div>
            <div className="label-upper mb-0.5">Introduced</div>
            <div
              style={{
                fontSize: '0.68rem',
                color: '#718096',
                fontFamily: 'JetBrains Mono, monospace',
              }}
            >
              {module.since}
            </div>
          </div>
          <div className="mt-2">
            <div className="label-upper mb-0.5">Last Changed</div>
            <div
              style={{
                fontSize: '0.68rem',
                color: '#718096',
                fontFamily: 'JetBrains Mono, monospace',
              }}
            >
              {module.lastChanged}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function Architecture() {
  const [vizMode, setVizMode] = useState<VizMode>('3D');
  const [activeLevel, setActiveLevel] = useState<Level>('Module');
  const [activeSnapshot, setActiveSnapshot] = useState(SNAPSHOTS[SNAPSHOTS.length - 1].value);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);

  const filteredModules = searchQuery
    ? mockModules.filter(
        (m) =>
          m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          m.id.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : mockModules;

  return (
    <div className="h-full flex flex-col overflow-hidden" style={{ background: '#080b0f' }}>

      {/* Controls bar */}
      <div
        className="flex items-center gap-4 flex-shrink-0"
        style={{
          padding: '8px 20px',
          borderBottom: '1px solid #141c25',
          background: '#080b0f',
        }}
      >
        {/* Abstraction level */}
        <div className="flex items-center gap-1">
          <span className="label-upper mr-2">Level</span>
          {LEVELS.map((level) => (
            <button
              key={level}
              className={`btn-mode ${activeLevel === level ? 'active' : ''}`}
              onClick={() => setActiveLevel(level)}
            >
              {level}
            </button>
          ))}
        </div>

        <div style={{ width: 1, height: 16, background: '#141c25' }} />

        {/* Snapshot selector */}
        <div className="flex items-center gap-2">
          <span className="label-upper">Snapshot</span>
          <select
            className="select-field"
            value={activeSnapshot}
            onChange={(e) => setActiveSnapshot(e.target.value)}
          >
            {SNAPSHOTS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        <div style={{ width: 1, height: 16, background: '#141c25' }} />

        {/* Search */}
        <div className="flex items-center gap-2">
          <span className="label-upper">Search</span>
          <input
            className="input-field"
            style={{ width: 200, height: 26, padding: '2px 8px', fontSize: '0.72rem' }}
            placeholder="module or package..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div style={{ marginLeft: 'auto', fontSize: '0.65rem', color: '#2d3748' }}>
          {filteredModules.length} modules · {activeLevel} view
        </div>
      </div>

      {/* Main split: visualization + right panel */}
      <div className="flex flex-1 overflow-hidden">

        {/* Left: visualization */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 overflow-hidden relative">
            <ArchitectureVisualization mode={vizMode} onModeChange={setVizMode} />
          </div>

          {/* Graph mode panel below */}
          {vizMode === 'GRAPH' && (
            <div
              className="flex-shrink-0"
              style={{
                height: 260,
                borderTop: '1px solid #141c25',
                overflow: 'hidden',
              }}
            >
              <div
                className="flex items-center justify-between flex-shrink-0"
                style={{
                  padding: '6px 16px',
                  borderBottom: '1px solid #141c25',
                  background: '#0c1117',
                }}
              >
                <div className="label-upper">Service Graph</div>
              </div>
              <ArchitectureGraph onNodeSelect={(id) => {
                const mod = mockModules.find((m) => m.id === id);
                if (mod) setSelectedModule(mod);
              }} />
            </div>
          )}
        </div>

        {/* Right panel: module list + detail */}
        <div
          className="flex flex-col flex-shrink-0 overflow-hidden"
          style={{
            width: 260,
            borderLeft: '1px solid #141c25',
            background: '#080b0f',
          }}
        >
          {selectedModule ? (
            <>
              <div
                className="flex items-center justify-between flex-shrink-0"
                style={{ padding: '8px 14px', borderBottom: '1px solid #141c25', background: '#0c1117' }}
              >
                <div className="label-upper">Module Detail</div>
                <button
                  onClick={() => setSelectedModule(null)}
                  style={{
                    fontSize: '0.65rem',
                    color: '#4a5568',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                  }}
                >
                  ✕
                </button>
              </div>
              <div className="overflow-y-auto flex-1" style={{ padding: '14px' }}>
                <NodeDetail module={selectedModule} />
              </div>
            </>
          ) : (
            <>
              <div
                className="flex-shrink-0"
                style={{ padding: '8px 14px', borderBottom: '1px solid #141c25', background: '#0c1117' }}
              >
                <div className="label-upper">Modules</div>
              </div>
              <div className="overflow-y-auto flex-1">
                {filteredModules.map((mod) => (
                  <div
                    key={mod.id}
                    style={{
                      padding: '8px 14px',
                      borderBottom: '1px solid #0f161d',
                      cursor: 'pointer',
                      transition: 'background 0.1s',
                    }}
                    onClick={() => setSelectedModule(mod)}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.02)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.background = 'transparent';
                    }}
                  >
                    <div
                      style={{
                        fontSize: '0.72rem',
                        color: '#a0aec0',
                        fontWeight: 500,
                        marginBottom: 2,
                      }}
                    >
                      {mod.name}
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        style={{
                          fontSize: '0.62rem',
                          color: '#3d4f63',
                          fontFamily: 'JetBrains Mono, monospace',
                        }}
                      >
                        {mod.classes} classes
                      </span>
                      <span
                        style={{
                          fontSize: '0.62rem',
                          color: '#3d4f63',
                          fontFamily: 'JetBrains Mono, monospace',
                        }}
                      >
                        {mod.dependencies} deps
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
