import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockOnboardingSteps } from '../data/mockData';
import StatusIndicator from '../components/shared/StatusIndicator';

type OnboardingPhase = 'INPUT' | 'VALIDATING' | 'VALIDATED' | 'ANALYZING';

const MOCK_REPO_PREVIEW = {
  owner: 'org',
  name: 'ecommerce-platform',
  visibility: 'PRIVATE',
  language: 'Java',
  framework: 'Spring Boot',
  branch: 'main',
  commits: 1245,
  url: 'https://github.com/org/ecommerce-platform',
};

export default function Onboarding() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<OnboardingPhase>('INPUT');
  const [repoUrl, setRepoUrl] = useState('https://github.com/org/ecommerce-platform');
  const [steps, setSteps] = useState(mockOnboardingSteps);

  const handleValidate = () => {
    if (!repoUrl.trim()) return;
    setPhase('VALIDATING');
    setTimeout(() => {
      setPhase('VALIDATED');
    }, 1200);
  };

  const handleStartAnalysis = () => {
    setPhase('ANALYZING');
    // Simulate step-by-step progress
    let currentStep = 0;
    const interval = setInterval(() => {
      setSteps((prev) =>
        prev.map((step, i) => {
          if (i < currentStep) return { ...step, status: 'DONE' };
          if (i === currentStep) return { ...step, status: 'RUNNING' };
          return { ...step, status: 'PENDING' };
        }),
      );
      currentStep++;
      if (currentStep >= steps.length) {
        clearInterval(interval);
        setTimeout(() => navigate('/'), 1500);
      }
    }, 800);
  };

  return (
    <div className="h-full overflow-y-auto" style={{ background: '#080b0f' }}>
      <div style={{ maxWidth: 680, margin: '0 auto', padding: '40px 24px' }}>

        {/* Heading */}
        <div className="mb-8">
          <div className="label-upper mb-1">ArchTime</div>
          <div
            style={{
              fontSize: '1rem',
              fontWeight: 600,
              color: '#e2e8f0',
              marginBottom: 6,
            }}
          >
            Add Repository
          </div>
          <div style={{ fontSize: '0.75rem', color: '#4a5568', lineHeight: 1.6 }}>
            Register a Git repository to begin architecture evolution analysis.
            ArchTime will mine the commit history, reconstruct architecture snapshots,
            and extract evidence for architectural changes.
          </div>
        </div>

        {/* Step 1: URL input */}
        <div
          style={{
            background: '#0c1117',
            border: '1px solid #141c25',
            marginBottom: 3,
          }}
        >
          <div
            style={{
              padding: '8px 14px',
              borderBottom: '1px solid #141c25',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span
              style={{
                fontSize: '0.6rem',
                color: '#2d3748',
                fontFamily: 'JetBrains Mono, monospace',
              }}
            >
              01
            </span>
            <div className="label-upper">Repository URL</div>
          </div>
          <div style={{ padding: '14px' }}>
            <div className="flex items-center gap-3">
              <input
                className="input-field flex-1"
                value={repoUrl}
                onChange={(e) => {
                  setRepoUrl(e.target.value);
                  setPhase('INPUT');
                }}
                placeholder="https://github.com/owner/repository"
                disabled={phase === 'ANALYZING'}
              />
              <button
                className="btn-primary"
                onClick={handleValidate}
                disabled={phase === 'VALIDATING' || phase === 'ANALYZING'}
                style={{
                  flexShrink: 0,
                  opacity: phase === 'VALIDATING' ? 0.6 : 1,
                }}
              >
                {phase === 'VALIDATING' ? 'Validating...' : 'Validate Repository'}
              </button>
            </div>

            {phase === 'INPUT' && (
              <div style={{ fontSize: '0.65rem', color: '#2d3748', marginTop: 8 }}>
                Supports GitHub, GitLab, and local repositories.
              </div>
            )}
          </div>
        </div>

        {/* Step 2: Repository preview */}
        {(phase === 'VALIDATED' || phase === 'ANALYZING') && (
          <div
            style={{
              background: '#0c1117',
              border: '1px solid #141c25',
              borderTop: '1px solid #4299e1',
              marginBottom: 3,
            }}
          >
            <div
              style={{
                padding: '8px 14px',
                borderBottom: '1px solid #141c25',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span
                style={{
                  fontSize: '0.6rem',
                  color: '#2d3748',
                  fontFamily: 'JetBrains Mono, monospace',
                }}
              >
                02
              </span>
              <div className="label-upper">Repository Preview</div>
              <StatusIndicator status="READY" />
            </div>

            <div style={{ padding: '14px' }}>
              <div
                className="grid"
                style={{
                  gridTemplateColumns: '1fr 1fr 1fr',
                  gap: '12px 24px',
                }}
              >
                {[
                  { label: 'Owner/Name', value: `${MOCK_REPO_PREVIEW.owner}/${MOCK_REPO_PREVIEW.name}`, mono: false },
                  { label: 'Visibility', value: MOCK_REPO_PREVIEW.visibility, mono: true },
                  { label: 'Language', value: MOCK_REPO_PREVIEW.language, mono: false },
                  { label: 'Framework', value: MOCK_REPO_PREVIEW.framework, mono: false },
                  { label: 'Default Branch', value: MOCK_REPO_PREVIEW.branch, mono: true },
                  { label: 'Commit Count', value: MOCK_REPO_PREVIEW.commits.toLocaleString(), mono: true },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="label-upper mb-0.5">{item.label}</div>
                    <div
                      style={{
                        fontSize: '0.75rem',
                        color: '#a0aec0',
                        fontFamily: item.mono ? 'JetBrains Mono, monospace' : 'Inter, sans-serif',
                        fontWeight: 500,
                      }}
                    >
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>

              {phase === 'VALIDATED' && (
                <div style={{ marginTop: 16 }}>
                  <button className="btn-primary" onClick={handleStartAnalysis}>
                    Start Analysis
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 3: Analysis progress */}
        {phase === 'ANALYZING' && (
          <div
            style={{
              background: '#0c1117',
              border: '1px solid #141c25',
            }}
          >
            <div
              style={{
                padding: '8px 14px',
                borderBottom: '1px solid #141c25',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span
                style={{
                  fontSize: '0.6rem',
                  color: '#2d3748',
                  fontFamily: 'JetBrains Mono, monospace',
                }}
              >
                03
              </span>
              <div className="label-upper">Analyzing Repository</div>
            </div>

            <div style={{ padding: '14px' }}>
              <div className="space-y-2.5">
                {steps.map((step) => (
                  <div key={step.id} className="flex items-center gap-3">
                    <div
                      style={{
                        width: 14,
                        height: 14,
                        border: '1px solid',
                        borderColor:
                          step.status === 'DONE'
                            ? '#276749'
                            : step.status === 'RUNNING'
                            ? '#2b6cb0'
                            : '#1a2332',
                        background:
                          step.status === 'DONE'
                            ? 'rgba(104,211,145,0.08)'
                            : step.status === 'RUNNING'
                            ? 'rgba(66,153,225,0.08)'
                            : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        fontSize: '0.55rem',
                        color:
                          step.status === 'DONE'
                            ? '#68d391'
                            : step.status === 'RUNNING'
                            ? '#63b3ed'
                            : '#2d3748',
                        transition: 'all 0.2s',
                      }}
                    >
                      {step.status === 'DONE' ? '✓' : step.status === 'RUNNING' ? '◌' : '○'}
                    </div>
                    <span
                      style={{
                        fontSize: '0.72rem',
                        color:
                          step.status === 'DONE'
                            ? '#718096'
                            : step.status === 'RUNNING'
                            ? '#e2e8f0'
                            : '#3d4f63',
                        transition: 'color 0.2s',
                      }}
                    >
                      {step.label}
                    </span>
                    {step.status === 'RUNNING' && (
                      <span style={{ fontSize: '0.62rem', color: '#4299e1' }}>Running...</span>
                    )}
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 12, fontSize: '0.65rem', color: '#2d3748' }}>
                Redirecting to Overview when analysis is complete...
              </div>
            </div>
          </div>
        )}

        {/* Bottom info */}
        {phase === 'INPUT' && (
          <div
            style={{
              marginTop: 32,
              padding: '14px 16px',
              border: '1px solid #141c25',
              background: '#0c1117',
            }}
          >
            <div className="label-upper mb-3">What ArchTime will do</div>
            <div className="space-y-2">
              {[
                '1. Mine the complete Git commit history',
                '2. Parse Java source files and build AST models',
                '3. Reconstruct architecture snapshots at each architectural change',
                '4. Detect and classify architectural changes',
                '5. Extract evidence for each detected change',
                '6. Prepare AI analysis with evidence grounding',
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span style={{ fontSize: '0.6rem', color: '#2d3748', marginTop: 1 }}>›</span>
                  <span style={{ fontSize: '0.7rem', color: '#4a5568', lineHeight: 1.5 }}>{step}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
