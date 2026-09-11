import { useState } from 'react';
import ArchitectureTimeline from '../components/ArchitectureTimeline';
import CommitTable from '../components/CommitTable';
import DiffView from '../components/DiffView';
import { mockTimelineEvents, type TimelineEvent, type Commit } from '../data/mockData';

export default function Timeline() {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(mockTimelineEvents[0]);
  const [showDiff, setShowDiff] = useState(false);

  return (
    <div className="h-full flex flex-col overflow-hidden" style={{ background: '#050505' }}>
      <div className="px-4 py-3 border-b border-border flex-shrink-0">
        <div className="label-upper" style={{ fontSize: '0.65rem' }}>Architecture Evolution Timeline</div>
      </div>

      {/* Selected event detail */}
      {selectedEvent && (
        <div className="px-4 py-4 border-b border-border flex-shrink-0">
          <div className="grid grid-cols-4 gap-6">
            <div>
              <div className="label-upper mb-1">Event</div>
              <div className="text-text-primary font-mono" style={{ fontSize: '0.72rem' }}>
                {selectedEvent.type}
              </div>
            </div>
            <div>
              <div className="label-upper mb-1">Date</div>
              <div className="text-text-primary font-mono" style={{ fontSize: '0.72rem' }}>
                {selectedEvent.date}
              </div>
            </div>
            <div>
              <div className="label-upper mb-1">Title</div>
              <div className="text-text-primary font-mono" style={{ fontSize: '0.72rem' }}>
                {selectedEvent.title}
              </div>
            </div>
            <div>
              <div className="label-upper mb-1">Confidence</div>
              <div className="text-text-primary font-mono" style={{ fontSize: '0.72rem' }}>
                {selectedEvent.confidence}%
              </div>
            </div>
          </div>
          <div className="mt-3">
            <div className="label-upper mb-1">Commit</div>
            <span className="font-mono text-text-secondary" style={{ fontSize: '0.65rem' }}>
              {selectedEvent.commitSha}
            </span>
            <span className="text-text-muted ml-3" style={{ fontSize: '0.6rem' }}>
              {selectedEvent.subtitle}
            </span>
          </div>
        </div>
      )}

      {/* Timeline component */}
      <div className="flex-shrink-0">
        <ArchitectureTimeline selectedEvent={selectedEvent} onEventSelect={setSelectedEvent} />
      </div>

      {/* All events list */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 pt-4 pb-2">
          <div className="label-upper mb-3">All Events</div>
          <div className="space-y-0">
            {mockTimelineEvents.map((event) => {
              const isSelected = selectedEvent?.id === event.id;
              return (
                <div
                  key={event.id}
                  className="flex items-start gap-4 px-3 py-3 border-b cursor-pointer transition-colors"
                  style={{
                    borderColor: '#111',
                    background: isSelected ? 'rgba(255,255,255,0.03)' : 'transparent',
                  }}
                  onClick={() => setSelectedEvent(event)}
                >
                  <div className="flex-shrink-0 mt-0.5">
                    <div
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: isSelected ? '#f0f0f0' : '#333',
                        border: '1px solid #444',
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-0.5">
                      <span className="font-mono text-text-primary" style={{ fontSize: '0.65rem' }}>
                        {event.type}
                      </span>
                      <span className="text-text-muted font-mono" style={{ fontSize: '0.58rem' }}>
                        {event.date}
                      </span>
                      <span className="text-text-muted font-mono" style={{ fontSize: '0.55rem' }}>
                        {event.commitSha}
                      </span>
                    </div>
                    <div className="text-text-secondary" style={{ fontSize: '0.6rem' }}>
                      {event.subtitle}
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-text-muted" style={{ fontSize: '0.55rem' }}>Confidence:</span>
                    <span className="font-mono text-text-secondary" style={{ fontSize: '0.6rem' }}>
                      {event.confidence}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Commit table */}
        <div className="px-4 pb-2 pt-2">
          <div className="label-upper mb-2">Commits</div>
        </div>
        <CommitTable onCommitSelect={() => setShowDiff(true)} />
      </div>

      {showDiff && <DiffView onClose={() => setShowDiff(false)} />}
    </div>
  );
}
