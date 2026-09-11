import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ArchitectureVisualization from '../components/ArchitectureVisualization';
import ArchitectureTimeline from '../components/ArchitectureTimeline';
import ChangeTimeline from '../components/ChangeTimeline';
import ArchitectureGraph from '../components/ArchitectureGraph';
import MetricsPanel from '../components/MetricsPanel';
import AIExplanation from '../components/AIExplanation';
import CommitTable from '../components/CommitTable';
import EvidencePanel from '../components/EvidencePanel';
import DiffView from '../components/DiffView';
import { mockMetrics, type TimelineEvent, type ArchitecturalChange, type Commit } from '../data/mockData';

export default function Overview() {
  const navigate = useNavigate();
  const [vizMode, setVizMode] = useState<'3D' | '2D' | 'GRAPH'>('3D');
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [showEvidence, setShowEvidence] = useState(false);
  const [showDiff, setShowDiff] = useState(false);

  const handleEventSelect = useCallback((event: TimelineEvent) => {
    setSelectedEvent(event);
  }, []);

  const handleChangeSelect = useCallback((_: ArchitecturalChange) => {
    setShowDiff(true);
  }, []);

  const handleCommitSelect = useCallback((_: Commit) => {
    setShowDiff(true);
  }, []);

  return (
    <div className="flex h-full overflow-hidden" style={{ background: '#050505' }}>
      {/* Main content column */}
      <div className="flex flex-col flex-1 overflow-hidden border-r border-border">

        {/* Architecture Overview header + visualization */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Section header + metrics */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-border flex-shrink-0">
            <div className="label-upper">Architecture Overview</div>
            <div className="flex items-center gap-5">
              {[
                { label: 'Modules', value: mockMetrics.modules },
                { label: 'Packages', value: mockMetrics.packages },
                { label: 'Classes', value: mockMetrics.classes },
                { label: 'Dependencies', value: mockMetrics.dependencies.toLocaleString() },
              ].map((m) => (
                <div key={m.label} className="flex items-center gap-1.5">
                  <span className="text-text-muted" style={{ fontSize: '0.58rem' }}>{m.label}</span>
                  <span className="text-text-primary font-mono" style={{ fontSize: '0.65rem' }}>{m.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 3D Visualization */}
          <div className="flex-1 overflow-hidden relative" style={{ minHeight: 0 }}>
            <ArchitectureVisualization mode={vizMode} onModeChange={setVizMode} />
          </div>
        </div>

        {/* Timeline */}
        <ArchitectureTimeline selectedEvent={selectedEvent} onEventSelect={handleEventSelect} />

        {/* Section header for commits */}
        <div className="px-4 py-2 border-t border-b border-border flex-shrink-0">
          <div className="label-upper">Recent Commits</div>
        </div>

        {/* Commit table */}
        <div className="overflow-y-auto flex-shrink-0" style={{ maxHeight: 180 }}>
          <CommitTable onCommitSelect={handleCommitSelect} />
        </div>
      </div>

      {/* Right panel */}
      <div
        className="flex flex-col overflow-y-auto flex-shrink-0"
        style={{ width: 280, background: '#050505' }}
      >
        <ChangeTimeline onChangeSelect={handleChangeSelect} />
        <ArchitectureGraph />
        <MetricsPanel />
        <AIExplanation onViewEvidence={() => setShowEvidence(true)} />
      </div>

      {/* Evidence drawer */}
      {showEvidence && (
        <EvidencePanel onClose={() => setShowEvidence(false)} />
      )}

      {/* Diff drawer */}
      {showDiff && (
        <DiffView onClose={() => setShowDiff(false)} />
      )}
    </div>
  );
}
