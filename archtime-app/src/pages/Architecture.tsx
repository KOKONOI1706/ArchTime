import { useState } from 'react';
import ArchitectureVisualization from '../components/ArchitectureVisualization';
import ArchitectureGraph from '../components/ArchitectureGraph';

export default function Architecture() {
  const [vizMode, setVizMode] = useState<'3D' | '2D' | 'GRAPH'>('3D');

  return (
    <div className="h-full flex flex-col overflow-hidden" style={{ background: '#050505' }}>
      <div className="px-4 py-2 border-b border-border flex-shrink-0">
        <div className="label-upper">Architecture Visualization</div>
      </div>

      <div className="flex-1 overflow-hidden relative">
        <ArchitectureVisualization mode={vizMode} onModeChange={setVizMode} />
      </div>

      <div className="flex-shrink-0 border-t border-border" style={{ height: 300 }}>
        <div className="px-4 py-2 border-b border-border">
          <div className="label-upper">Service Graph</div>
        </div>
        <ArchitectureGraph />
      </div>
    </div>
  );
}
