import { useState } from 'react';

interface SettingItem {
  label: string;
  value: string;
  type: 'text' | 'select' | 'toggle' | 'textarea';
  options?: string[];
  description?: string;
}

interface SettingGroup {
  id: string;
  label: string;
  description: string;
  items: SettingItem[];
}

const settingGroups: SettingGroup[] = [
  {
    id: 'repository',
    label: 'Repository',
    description: 'Configure the repository connection and analysis scope.',
    items: [
      {
        label: 'Remote URL',
        value: 'https://github.com/org/ecommerce-platform',
        type: 'text',
        description: 'Repository remote URL',
      },
      {
        label: 'Default Branch',
        value: 'main',
        type: 'text',
        description: 'Branch to analyze',
      },
      {
        label: 'Analysis Start',
        value: '2023-01-01',
        type: 'text',
        description: 'Earliest date for analysis scope',
      },
      {
        label: 'Analysis End',
        value: '2025-06-12',
        type: 'text',
        description: 'Latest date for analysis scope',
      },
    ],
  },
  {
    id: 'mining',
    label: 'Mining',
    description: 'Control how ArchTime processes the repository history.',
    items: [
      {
        label: 'Commit Analysis Depth',
        value: 'FULL',
        type: 'select',
        options: ['FULL', 'SHALLOW', 'INCREMENTAL'],
        description: 'How deep to mine commit history',
      },
      {
        label: 'AST Parser',
        value: 'JavaParser 3.25',
        type: 'text',
        description: 'Parser used for Java AST analysis',
      },
      {
        label: 'Dependency Analysis',
        value: 'ENABLED',
        type: 'toggle',
        description: 'Analyze inter-module dependencies',
      },
      {
        label: 'Confidence Threshold',
        value: '80%',
        type: 'text',
        description: 'Minimum confidence to report a change',
      },
      {
        label: 'Auto Re-analyze on Pull',
        value: 'DISABLED',
        type: 'toggle',
        description: 'Trigger re-analysis when branch is updated',
      },
    ],
  },
  {
    id: 'ai',
    label: 'AI',
    description: 'Configure the AI analysis model and evidence thresholds.',
    items: [
      {
        label: 'LLM Provider',
        value: 'OpenAI',
        type: 'select',
        options: ['OpenAI', 'Anthropic', 'Local (Ollama)', 'Disabled'],
        description: 'Language model provider for analysis',
      },
      {
        label: 'Model',
        value: 'gpt-4o',
        type: 'text',
        description: 'Model identifier',
      },
      {
        label: 'Temperature',
        value: '0.1',
        type: 'text',
        description: 'Lower = more deterministic (recommended for analysis)',
      },
      {
        label: 'Evidence Threshold',
        value: '3',
        type: 'text',
        description: 'Minimum evidence items required before AI analysis',
      },
      {
        label: 'Include Inferences',
        value: 'ENABLED',
        type: 'toggle',
        description: 'Allow AI to generate inferences beyond direct evidence',
      },
    ],
  },
  {
    id: 'system',
    label: 'System',
    description: 'System-level configuration for jobs and data.',
    items: [
      {
        label: 'Concurrent Analysis Jobs',
        value: '2',
        type: 'text',
        description: 'Maximum parallel analysis jobs',
      },
      {
        label: 'Log Level',
        value: 'INFO',
        type: 'select',
        options: ['DEBUG', 'INFO', 'WARN', 'ERROR'],
        description: 'Application log verbosity',
      },
      {
        label: 'Data Export Format',
        value: 'JSON',
        type: 'select',
        options: ['JSON', 'CSV', 'GraphML'],
        description: 'Format for analysis data export',
      },
    ],
  },
];

// ── Toggle component ───────────────────────────────────────────────────────────
function Toggle({ value, onToggle }: { value: string; onToggle: () => void }) {
  const enabled = value === 'ENABLED';
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-2"
      style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
    >
      <div
        className="toggle-track"
        style={{
          borderColor: enabled ? '#2b6cb0' : '#1a2332',
          background: enabled ? 'rgba(66,153,225,0.08)' : 'transparent',
        }}
      >
        <div
          className="toggle-thumb"
          style={{
            left: enabled ? 15 : 2,
            background: enabled ? '#4299e1' : '#2d3748',
          }}
        />
      </div>
      <span
        className="font-mono"
        style={{
          fontSize: '0.62rem',
          color: enabled ? '#4299e1' : '#3d4f63',
          letterSpacing: '0.04em',
        }}
      >
        {value}
      </span>
    </button>
  );
}

// ── Main settings page ─────────────────────────────────────────────────────────
export default function Settings() {
  const [values, setValues] = useState<Record<string, string>>(() => {
    const map: Record<string, string> = {};
    for (const group of settingGroups) {
      for (const item of group.items) {
        map[`${group.id}__${item.label}`] = item.value;
      }
    }
    return map;
  });

  const getValue = (groupId: string, label: string) =>
    values[`${groupId}__${label}`] ?? '';

  const setValue = (groupId: string, label: string, val: string) =>
    setValues((prev) => ({ ...prev, [`${groupId}__${label}`]: val }));

  const toggleValue = (groupId: string, label: string) => {
    const current = getValue(groupId, label);
    setValue(groupId, label, current === 'ENABLED' ? 'DISABLED' : 'ENABLED');
  };

  return (
    <div className="h-full overflow-y-auto" style={{ background: '#080b0f' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '24px 24px 48px' }}>

        <div className="mb-6">
          <div className="page-title">Settings</div>
          <div className="page-subtitle">Configure analysis, AI, and system preferences.</div>
        </div>

        <div className="space-y-4">
          {settingGroups.map((group) => (
            <div
              key={group.id}
              style={{
                background: '#0c1117',
                border: '1px solid #141c25',
              }}
            >
              {/* Group header */}
              <div
                style={{
                  padding: '10px 16px',
                  borderBottom: '1px solid #141c25',
                  background: '#0c1117',
                }}
              >
                <div
                  style={{
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    color: '#e2e8f0',
                    marginBottom: 2,
                  }}
                >
                  {group.label}
                </div>
                <div style={{ fontSize: '0.65rem', color: '#3d4f63' }}>
                  {group.description}
                </div>
              </div>

              {/* Items */}
              {group.items.map((item, i) => {
                const currentValue = getValue(group.id, item.label);
                const isLast = i === group.items.length - 1;

                return (
                  <div
                    key={item.label}
                    className="flex items-center justify-between"
                    style={{
                      padding: '10px 16px',
                      borderBottom: isLast ? 'none' : '1px solid #0f161d',
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: '0.72rem',
                          color: '#a0aec0',
                          marginBottom: 1,
                        }}
                      >
                        {item.label}
                      </div>
                      {item.description && (
                        <div style={{ fontSize: '0.62rem', color: '#3d4f63' }}>
                          {item.description}
                        </div>
                      )}
                    </div>

                    {item.type === 'toggle' ? (
                      <Toggle
                        value={currentValue}
                        onToggle={() => toggleValue(group.id, item.label)}
                      />
                    ) : item.type === 'select' ? (
                      <select
                        className="select-field"
                        value={currentValue}
                        onChange={(e) => setValue(group.id, item.label, e.target.value)}
                      >
                        {item.options?.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        className="input-field"
                        style={{ width: 220, height: 26, padding: '2px 8px', fontSize: '0.72rem' }}
                        value={currentValue}
                        onChange={(e) => setValue(group.id, item.label, e.target.value)}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Version info */}
        <div
          className="flex items-center gap-4 mt-8 pt-4"
          style={{ borderTop: '1px solid #141c25' }}
        >
          <span
            style={{
              fontSize: '0.65rem',
              color: '#2d3748',
              fontFamily: 'JetBrains Mono, monospace',
            }}
          >
            ArchTime v0.9.1-beta
          </span>
          <span
            style={{
              fontSize: '0.62rem',
              color: '#1a2332',
              fontFamily: 'JetBrains Mono, monospace',
            }}
          >
            build 2025.06.12.1421
          </span>
        </div>
      </div>
    </div>
  );
}
