export default function Settings() {
  const settings = [
    { group: 'Analysis', items: [
      { label: 'Git Mining Depth', value: 'FULL', type: 'select', options: ['FULL', 'SHALLOW', 'INCREMENTAL'] },
      { label: 'AST Parser', value: 'JavaParser 3.25', type: 'text' },
      { label: 'Confidence Threshold', value: '80%', type: 'text' },
      { label: 'Auto Re-analyze on Pull', value: 'ENABLED', type: 'toggle' },
    ]},
    { group: 'Visualization', items: [
      { label: 'Default View Mode', value: '3D', type: 'select', options: ['3D', '2D', 'GRAPH'] },
      { label: 'Point Cloud Resolution', value: '80×80', type: 'text' },
      { label: 'Auto Rotate', value: 'DISABLED', type: 'toggle' },
      { label: 'Scanline Effect', value: 'ENABLED', type: 'toggle' },
    ]},
    { group: 'Repository', items: [
      { label: 'Repository Path', value: '/repos/ecommerce-platform', type: 'text' },
      { label: 'Branch', value: 'main', type: 'text' },
      { label: 'Remote URL', value: 'github.com/org/ecommerce-platform', type: 'text' },
    ]},
  ];

  return (
    <div className="h-full overflow-y-auto p-6" style={{ background: '#050505' }}>
      <div className="max-w-2xl mx-auto">
        <div className="label-upper mb-6" style={{ fontSize: '0.65rem', letterSpacing: '0.15em' }}>Settings</div>

        <div className="space-y-6">
          {settings.map((group) => (
            <div key={group.group} className="border border-border" style={{ background: '#080808' }}>
              <div className="px-4 py-2 border-b border-border">
                <div className="label-upper">{group.group}</div>
              </div>
              <div className="divide-y" style={{ borderColor: '#1a1a1a' }}>
                {group.items.map((item) => (
                  <div key={item.label} className="flex items-center justify-between px-4 py-3">
                    <span className="text-text-secondary" style={{ fontSize: '0.65rem' }}>
                      {item.label}
                    </span>
                    {item.type === 'toggle' ? (
                      <div
                        className="flex items-center gap-2 cursor-pointer"
                        style={{ fontSize: '0.6rem', color: item.value === 'ENABLED' ? '#d0d0d0' : '#444' }}
                      >
                        <div
                          style={{
                            width: 24,
                            height: 12,
                            border: '1px solid',
                            borderColor: item.value === 'ENABLED' ? '#888' : '#2a2a2a',
                            position: 'relative',
                            borderRadius: 1,
                          }}
                        >
                          <div
                            style={{
                              position: 'absolute',
                              top: 1,
                              left: item.value === 'ENABLED' ? 11 : 1,
                              width: 10,
                              height: 8,
                              background: item.value === 'ENABLED' ? '#d0d0d0' : '#333',
                              transition: 'left 0.15s, background 0.15s',
                            }}
                          />
                        </div>
                        <span className="font-mono">{item.value}</span>
                      </div>
                    ) : (
                      <span className="font-mono text-text-primary" style={{ fontSize: '0.65rem' }}>
                        {item.value}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Version info */}
        <div className="mt-8 pt-4 border-t border-border">
          <div className="flex items-center gap-4">
            <span className="text-text-muted" style={{ fontSize: '0.58rem' }}>ArchTime v0.9.1-beta</span>
            <span className="text-text-dim" style={{ fontSize: '0.55rem' }}>build 2025.06.12.1421</span>
          </div>
        </div>
      </div>
    </div>
  );
}
