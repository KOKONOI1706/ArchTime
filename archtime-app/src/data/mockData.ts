// ─── Mock Data Layer ────────────────────────────────────────────────────────
// Replace these with real REST API calls when backend is available.
// Each export maps to a conceptual API endpoint.
// The same commit hashes, dates, and module names appear consistently
// across all pages (Overview, Timeline, Architecture, Changes, Evidence, AI Analyst).

// ─── Interfaces ──────────────────────────────────────────────────────────────

export interface RepositoryInfo {
  owner: string;
  name: string;
  fullName: string;
  visibility: 'PUBLIC' | 'PRIVATE';
  language: string;
  framework: string;
  branch: string;
  commits: number;
  stack: string;
  analysisStart: string;
  analysisEnd: string;
  lastAnalyzed: string;
  url: string;
}

export interface AnalysisStatus {
  label: string;
  status: 'READY' | 'RUNNING' | 'PENDING' | 'ERROR';
  detail?: string;
}

export interface AnalysisStep {
  id: string;
  label: string;
  status: 'DONE' | 'RUNNING' | 'PENDING';
}

export interface ArchitectureMetrics {
  modules: number;
  packages: number;
  classes: number;
  dependencies: number;
}

export interface AnalysisMetrics {
  architecturalChanges: number;
  refactorings: number;
  evidenceCoverage: number; // 0–100 percent
  analysisConfidence: number; // 0–100 percent
}

export interface Module {
  id: string;
  name: string;
  classes: number;
  dependencies: number;
  dependents: number;
  since: string;
  lastChanged: string;
  x: number; // normalized 0-1
  y: number; // normalized 0-1
  peak: number; // height value 0-1
  type: 'SERVICE' | 'CORE' | 'INFRA' | 'GATEWAY';
}

export interface TimelineEvent {
  id: string;
  year: string;
  date: string;
  title: string;
  subtitle: string;
  type:
    | 'SERVICE_EXTRACTION'
    | 'MODULE_SPLIT'
    | 'PACKAGE_RESTRUCTURE'
    | 'NEW_MODULE'
    | 'INITIAL'
    | 'MICROSERVICE_MIGRATION'
    | 'DEPENDENCY_CHANGE';
  normalizedX: number; // 0-1 position along timeline
  commitSha: string;
  author: string;
  confidence: number;
  affectedModules: string[];
  filesChanged: number;
  evidenceCount: number;
}

export interface ArchitecturalChange {
  id: string;
  type: string;
  changeTypeKey:
    | 'SERVICE_EXTRACTION'
    | 'MODULE_SPLIT'
    | 'PACKAGE_RESTRUCTURE'
    | 'NEW_MODULE'
    | 'DEPENDENCY_CHANGE'
    | 'MICROSERVICE_MIGRATION'
    | 'INITIAL';
  date: string;
  time: string;
  from: string;
  to: string;
  commitSha: string;
  author: string;
  description: string;
  confidence: number;
  evidenceCount: number;
}

export interface ArchNode {
  id: string;
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface ArchEdge {
  from: string;
  to: string;
}

export interface KeyMetric {
  label: string;
  value: string | number;
}

export type EvidenceType = 'FACT' | 'INFERENCE' | 'UNKNOWN';

export interface EvidenceItem {
  id: string;
  type: EvidenceType;
  statement: string;
  source?: string;
  sourceType?: 'COMMIT' | 'FILE' | 'AST' | 'DEPENDENCY' | 'SNAPSHOT';
  commitSha?: string;
  filePath?: string;
}

export interface AIExplanationData {
  query: string;
  event: string;
  commit: string;
  confidence: number;
  evidenceCount: number;
  evidence: EvidenceItem[];
  conclusion: string;
  caveat: string;
}

export interface Commit {
  sha: string;
  message: string;
  author: string;
  date: string;
  architecturalChange: string;
  changeType: string;
  filesChanged: number;
  additions: number;
  deletions: number;
}

export interface DiffData {
  commitSha: string;
  message: string;
  author: string;
  date: string;
  changeType: string;
  changeTypeKey:
    | 'SERVICE_EXTRACTION'
    | 'MODULE_SPLIT'
    | 'PACKAGE_RESTRUCTURE'
    | 'NEW_MODULE'
    | 'DEPENDENCY_CHANGE'
    | 'MICROSERVICE_MIGRATION'
    | 'INITIAL';
  confidence: number;
  before: string[];
  after: string[];
  structuralChanges: Array<{ op: '+' | '-'; path: string }>;
  dependencyBefore: string;
  dependencyAfter: string;
  detectedChanges: Array<{ type: string; key: string }>;
}

export interface EvidenceData {
  changeType: string;
  changeTypeKey: string;
  commitSha: string;
  message: string;
  author: string;
  date: string;
  confidence: number;
  evidenceItems: EvidenceItem[];
  changedFiles: Array<{ op: '+' | '-'; path: string }>;
  astChanges: string[];
  archBefore: string;
  archAfter: string;
}

// ─── Repository ─────────────────────────────────────────────────────────────

export const mockRepository: RepositoryInfo = {
  owner: 'org',
  name: 'ecommerce-platform',
  fullName: 'org/ecommerce-platform',
  visibility: 'PRIVATE',
  language: 'Java',
  framework: 'Spring Boot',
  branch: 'main',
  commits: 1245,
  stack: 'Java / Spring Boot',
  analysisStart: '2023-01-15',
  analysisEnd: '2025-06-12',
  lastAnalyzed: '2025-06-12 14:32:17',
  url: 'https://github.com/org/ecommerce-platform',
};

// ─── Analysis Status ─────────────────────────────────────────────────────────

export const mockAnalysisStatus: AnalysisStatus[] = [
  { label: 'Repository Indexed', status: 'READY', detail: '1,245 commits' },
  { label: 'Architecture Reconstructed', status: 'READY', detail: '12 snapshots' },
  { label: 'Evidence Ready', status: 'READY', detail: '94 evidence items' },
  { label: 'AI Analysis', status: 'READY', detail: 'Available' },
];

// ─── Onboarding Steps ────────────────────────────────────────────────────────

export const mockOnboardingSteps: AnalysisStep[] = [
  { id: 'access', label: 'Repository access', status: 'DONE' },
  { id: 'history', label: 'Git history', status: 'DONE' },
  { id: 'files', label: 'Source files', status: 'DONE' },
  { id: 'ast', label: 'Java AST', status: 'DONE' },
  { id: 'arch', label: 'Architecture reconstruction', status: 'RUNNING' },
  { id: 'evidence', label: 'Evidence extraction', status: 'PENDING' },
  { id: 'ai', label: 'AI analysis', status: 'PENDING' },
];

// ─── Metrics ─────────────────────────────────────────────────────────────────

export const mockMetrics: ArchitectureMetrics = {
  modules: 12,
  packages: 48,
  classes: 312,
  dependencies: 1284,
};

export const mockAnalysisMetrics: AnalysisMetrics = {
  architecturalChanges: 18,
  refactorings: 203,
  evidenceCoverage: 87,
  analysisConfidence: 91,
};

// ─── Modules ─────────────────────────────────────────────────────────────────

export const mockModules: Module[] = [
  {
    id: 'payment-service',
    name: 'Payment Service',
    classes: 24,
    dependencies: 18,
    dependents: 2,
    since: '2024-06-12',
    lastChanged: '2025-03-01',
    x: 0.72,
    y: 0.68,
    peak: 0.9,
    type: 'SERVICE',
  },
  {
    id: 'order-service',
    name: 'Order Service',
    classes: 31,
    dependencies: 22,
    dependents: 1,
    since: '2023-01-15',
    x: 0.45,
    y: 0.55,
    peak: 0.85,
    type: 'SERVICE',
    lastChanged: '2025-02-14',
  },
  {
    id: 'user-service',
    name: 'User Service',
    classes: 19,
    dependencies: 12,
    dependents: 3,
    since: '2023-01-15',
    x: 0.25,
    y: 0.45,
    peak: 0.7,
    type: 'SERVICE',
    lastChanged: '2025-01-10',
  },
  {
    id: 'api-gateway',
    name: 'API Gateway',
    classes: 8,
    dependencies: 8,
    dependents: 0,
    since: '2024-01-20',
    x: 0.5,
    y: 0.82,
    peak: 0.75,
    type: 'GATEWAY',
    lastChanged: '2025-01-10',
  },
  {
    id: 'notification-service',
    name: 'Notification Service',
    classes: 14,
    dependencies: 9,
    dependents: 1,
    since: '2023-11-03',
    x: 0.6,
    y: 0.35,
    peak: 0.55,
    type: 'SERVICE',
    lastChanged: '2024-09-10',
  },
  {
    id: 'user-core',
    name: 'User Core',
    classes: 12,
    dependencies: 7,
    dependents: 2,
    since: '2023-11-03',
    x: 0.2,
    y: 0.3,
    peak: 0.5,
    type: 'CORE',
    lastChanged: '2025-01-10',
  },
  {
    id: 'user-api',
    name: 'User API',
    classes: 7,
    dependencies: 5,
    dependents: 1,
    since: '2023-11-03',
    x: 0.15,
    y: 0.6,
    peak: 0.4,
    type: 'SERVICE',
    lastChanged: '2025-01-10',
  },
  {
    id: 'inventory',
    name: 'Inventory',
    classes: 22,
    dependencies: 14,
    dependents: 2,
    since: '2023-03-08',
    x: 0.35,
    y: 0.65,
    peak: 0.65,
    type: 'SERVICE',
    lastChanged: '2024-11-20',
  },
  {
    id: 'search',
    name: 'Search Service',
    classes: 16,
    dependencies: 10,
    dependents: 1,
    since: '2024-09-10',
    x: 0.8,
    y: 0.4,
    peak: 0.48,
    type: 'SERVICE',
    lastChanged: '2025-02-01',
  },
  {
    id: 'analytics',
    name: 'Analytics',
    classes: 11,
    dependencies: 6,
    dependents: 0,
    since: '2025-01-15',
    x: 0.88,
    y: 0.55,
    peak: 0.38,
    type: 'SERVICE',
    lastChanged: '2025-05-20',
  },
  {
    id: 'database',
    name: 'Database Layer',
    classes: 28,
    dependencies: 0,
    dependents: 8,
    since: '2023-01-15',
    x: 0.5,
    y: 0.15,
    peak: 0.72,
    type: 'INFRA',
    lastChanged: '2025-01-10',
  },
  {
    id: 'monolith',
    name: 'Core Monolith',
    classes: 98,
    dependencies: 42,
    dependents: 0,
    since: '2023-01-15',
    x: 0.5,
    y: 0.5,
    peak: 1.0,
    type: 'CORE',
    lastChanged: '2023-11-03',
  },
];

// ─── Timeline Events ──────────────────────────────────────────────────────────

export const mockTimelineEvents: TimelineEvent[] = [
  {
    id: 'initial',
    year: '2023',
    date: '2023-01-15',
    title: 'Monolith',
    subtitle: 'Initial Architecture',
    type: 'INITIAL',
    normalizedX: 0.0,
    commitSha: 'a1b2c3d',
    author: 'Nguyen Van A',
    confidence: 100,
    affectedModules: ['monolith', 'database'],
    filesChanged: 0,
    evidenceCount: 8,
  },
  {
    id: 'user-split',
    year: '2023',
    date: '2023-11-03',
    title: 'Module Split',
    subtitle: 'User Service Extracted',
    type: 'MODULE_SPLIT',
    normalizedX: 0.28,
    commitSha: 'f3e7b10',
    author: 'Nguyen Van A',
    confidence: 89,
    affectedModules: ['user-service', 'user-core', 'user-api', 'monolith'],
    filesChanged: 31,
    evidenceCount: 12,
  },
  {
    id: 'payment-extraction',
    year: '2024',
    date: '2024-06-12',
    title: 'Service Extraction',
    subtitle: 'Payment Extracted',
    type: 'SERVICE_EXTRACTION',
    normalizedX: 0.55,
    commitSha: 'd82f91a',
    author: 'Nguyen Van A',
    confidence: 94,
    affectedModules: ['payment-service', 'order-service', 'monolith'],
    filesChanged: 18,
    evidenceCount: 7,
  },
  {
    id: 'microservice',
    year: '2025',
    date: '2025-01-10',
    title: 'Microservice Migration',
    subtitle: 'Full Service Decoupling',
    type: 'MICROSERVICE_MIGRATION',
    normalizedX: 0.88,
    commitSha: 'e19a44c',
    author: 'Le Thi B',
    confidence: 91,
    affectedModules: ['api-gateway', 'order-service', 'user-service', 'payment-service', 'notification-service'],
    filesChanged: 94,
    evidenceCount: 23,
  },
];

// ─── Architectural Changes ────────────────────────────────────────────────────

export const mockArchitecturalChanges: ArchitecturalChange[] = [
  {
    id: '1',
    type: 'Service Extraction',
    changeTypeKey: 'SERVICE_EXTRACTION',
    date: '2024-06-12',
    time: '14:21',
    from: 'monolith/payment',
    to: 'payment-service',
    commitSha: 'd82f91a',
    author: 'Nguyen Van A',
    description: 'Payment functionality extracted from monolith into dedicated microservice.',
    confidence: 94,
    evidenceCount: 7,
  },
  {
    id: '2',
    type: 'Dependency Change',
    changeTypeKey: 'DEPENDENCY_CHANGE',
    date: '2024-03-18',
    time: '09:32',
    from: 'order',
    to: 'payment-service',
    commitSha: 'a91cc2e',
    author: 'Le Thi B',
    description: 'Order service dependency updated to reference payment-service.',
    confidence: 88,
    evidenceCount: 4,
  },
  {
    id: '3',
    type: 'Module Split',
    changeTypeKey: 'MODULE_SPLIT',
    date: '2023-11-03',
    time: '16:45',
    from: 'user',
    to: 'user-core / user-api',
    commitSha: 'f3e7b10',
    author: 'Nguyen Van A',
    description: 'User module split into separate core and API boundary layers.',
    confidence: 89,
    evidenceCount: 12,
  },
  {
    id: '4',
    type: 'Package Restructure',
    changeTypeKey: 'PACKAGE_RESTRUCTURE',
    date: '2023-07-21',
    time: '11:12',
    from: 'com.shop.*',
    to: 'com.ecommerce.*',
    commitSha: 'c4d2a9e',
    author: 'Pham Duy',
    description: 'Package namespace migrated from com.shop to com.ecommerce.',
    confidence: 96,
    evidenceCount: 9,
  },
  {
    id: '5',
    type: 'New Module',
    changeTypeKey: 'NEW_MODULE',
    date: '2023-04-10',
    time: '08:37',
    from: '',
    to: 'notification-service',
    commitSha: 'b72e3f1',
    author: 'Tran Minh C',
    description: 'Notification service introduced as a new module.',
    confidence: 97,
    evidenceCount: 6,
  },
];

// ─── Architecture Graph Nodes & Edges ─────────────────────────────────────────

export const mockArchNodes: ArchNode[] = [
  { id: 'api-gateway', label: 'api-gateway', x: 150, y: 16, w: 105, h: 22 },
  { id: 'user-service', label: 'user-service', x: 12, y: 76, w: 94, h: 22 },
  { id: 'order-service', label: 'order-service', x: 130, y: 76, w: 100, h: 22 },
  { id: 'payment-service', label: 'payment-service', x: 256, y: 76, w: 114, h: 22 },
  { id: 'notification-service', label: 'notification-service', x: 110, y: 148, w: 142, h: 22 },
  { id: 'database', label: 'database', x: 152, y: 212, w: 78, h: 22 },
];

export const mockArchEdges: ArchEdge[] = [
  { from: 'api-gateway', to: 'user-service' },
  { from: 'api-gateway', to: 'order-service' },
  { from: 'api-gateway', to: 'payment-service' },
  { from: 'order-service', to: 'notification-service' },
  { from: 'notification-service', to: 'database' },
  { from: 'order-service', to: 'payment-service' },
];

// ─── Key Metrics ──────────────────────────────────────────────────────────────

export const mockKeyMetrics: KeyMetric[] = [
  { label: 'Total Commits', value: '1,245' },
  { label: 'Architectural Events', value: 18 },
  { label: 'Modules', value: 12 },
  { label: 'Dependency Changes', value: 47 },
  { label: 'Refactor Commits', value: 203 },
];

// ─── Evidence Items ────────────────────────────────────────────────────────────

export const mockEvidenceItems: EvidenceItem[] = [
  {
    id: 'e1',
    type: 'FACT',
    statement: 'PaymentService, PaymentController, and PaymentRepository were introduced in commit d82f91a.',
    source: 'payment-service/PaymentService.java',
    sourceType: 'FILE',
    commitSha: 'd82f91a',
    filePath: 'payment-service/PaymentService.java',
  },
  {
    id: 'e2',
    type: 'FACT',
    statement: '12 classes moved from monolith/payment/ to payment-service/.',
    source: 'Commit d82f91a — 18 files changed',
    sourceType: 'COMMIT',
    commitSha: 'd82f91a',
  },
  {
    id: 'e3',
    type: 'FACT',
    statement: '4 files removed from monolith/payment/ in the same commit.',
    source: 'Commit d82f91a',
    sourceType: 'COMMIT',
    commitSha: 'd82f91a',
  },
  {
    id: 'e4',
    type: 'FACT',
    statement: 'Dependency boundary changed: Order → PaymentService (previously Order → Payment).',
    source: 'AST dependency graph delta',
    sourceType: 'DEPENDENCY',
    commitSha: 'd82f91a',
  },
  {
    id: 'e5',
    type: 'INFERENCE',
    statement: 'The change is consistent with separating payment responsibilities into a dedicated service boundary.',
    source: 'Structural analysis',
    sourceType: 'AST',
  },
  {
    id: 'e6',
    type: 'INFERENCE',
    statement: 'Commit message "refactor: extract payment into dedicated service" suggests intentional service extraction.',
    source: 'Commit message d82f91a',
    sourceType: 'COMMIT',
    commitSha: 'd82f91a',
  },
  {
    id: 'e7',
    type: 'UNKNOWN',
    statement: 'The original business requirement or technical driver that triggered this extraction cannot be determined from repository evidence.',
    source: undefined,
    sourceType: undefined,
  },
];

// ─── AI Explanation ────────────────────────────────────────────────────────────

export const mockAIExplanation: AIExplanationData = {
  query: 'Why was Payment extracted from Order?',
  event: 'SERVICE_EXTRACTION',
  commit: 'd82f91a',
  confidence: 94,
  evidenceCount: 7,
  evidence: mockEvidenceItems,
  conclusion:
    'Payment functionality was extracted from the monolithic payment module into a dedicated microservice. The repository provides strong structural evidence for WHAT changed and WHERE it moved. The commit message and file movement patterns are consistent with a deliberate service extraction refactoring.',
  caveat:
    'Insufficient evidence to determine the original developer motivation or business requirement that triggered this architectural decision. The AI interpretation of developer intent is an INFERENCE, not a FACT.',
};

// ─── Commits ──────────────────────────────────────────────────────────────────

export const mockCommits: Commit[] = [
  {
    sha: 'd82f91a',
    message: 'refactor: extract payment into dedicated service',
    author: 'Nguyen Van A',
    date: '2024-06-12',
    architecturalChange: 'Service Extraction (payment)',
    changeType: 'SERVICE_EXTRACTION',
    filesChanged: 18,
    additions: 412,
    deletions: 89,
  },
  {
    sha: 'a91cc2e',
    message: 'update order → payment-service dependency',
    author: 'Le Thi B',
    date: '2024-03-18',
    architecturalChange: 'Dependency Change',
    changeType: 'DEPENDENCY_CHANGE',
    filesChanged: 6,
    additions: 44,
    deletions: 31,
  },
  {
    sha: 'f3e7b10',
    message: 'add notification-service module',
    author: 'Tran Minh C',
    date: '2023-11-03',
    architecturalChange: 'New Module',
    changeType: 'NEW_MODULE',
    filesChanged: 24,
    additions: 511,
    deletions: 0,
  },
  {
    sha: 'c4d2a9e',
    message: 'restructure packages com.shop → com.ecommerce',
    author: 'Pham Duy',
    date: '2023-07-21',
    architecturalChange: 'Package Restructure',
    changeType: 'PACKAGE_RESTRUCTURE',
    filesChanged: 78,
    additions: 78,
    deletions: 78,
  },
  {
    sha: 'b72e3f1',
    message: 'split user module into user-core / user-api',
    author: 'Nguyen Van A',
    date: '2023-04-10',
    architecturalChange: 'Module Split (user)',
    changeType: 'MODULE_SPLIT',
    filesChanged: 31,
    additions: 244,
    deletions: 108,
  },
  {
    sha: 'e19a44c',
    message: 'microservice migration: decouple all services',
    author: 'Le Thi B',
    date: '2025-01-10',
    architecturalChange: 'Microservice Migration',
    changeType: 'MICROSERVICE_MIGRATION',
    filesChanged: 94,
    additions: 1820,
    deletions: 340,
  },
];

// ─── Diff Data ────────────────────────────────────────────────────────────────

export const mockDiffData: DiffData = {
  commitSha: 'd82f91a',
  message: 'refactor: extract payment into dedicated service',
  author: 'Nguyen Van A',
  date: '2024-06-12 14:21',
  changeType: 'Service Extraction',
  changeTypeKey: 'SERVICE_EXTRACTION',
  confidence: 94,
  before: ['Monolith', '  └─ Order', '  └─ Payment', '  └─ User'],
  after: ['Services', '  Order', '  Payment Service ← NEW', '  User Service'],
  structuralChanges: [
    { op: '+', path: 'payment-service/' },
    { op: '+', path: 'payment-service/PaymentController.java' },
    { op: '+', path: 'payment-service/PaymentService.java' },
    { op: '+', path: 'payment-service/PaymentRepository.java' },
    { op: '+', path: 'payment-service/pom.xml' },
    { op: '-', path: 'monolith/payment/PaymentService.java' },
    { op: '-', path: 'monolith/payment/PaymentController.java' },
    { op: '-', path: 'monolith/payment/PaymentRepository.java' },
    { op: '-', path: 'monolith/payment/PaymentDTO.java' },
  ],
  dependencyBefore: 'Order → Payment',
  dependencyAfter: 'Order → PaymentService',
  detectedChanges: [
    { type: 'Service Extraction', key: 'SERVICE_EXTRACTION' },
    { type: 'Dependency Change', key: 'DEPENDENCY_CHANGE' },
    { type: 'Package Restructure', key: 'PACKAGE_RESTRUCTURE' },
  ],
};

// ─── Evidence Data (Full Page) ────────────────────────────────────────────────

export const mockEvidenceData: EvidenceData = {
  changeType: 'Service Extraction',
  changeTypeKey: 'SERVICE_EXTRACTION',
  commitSha: 'd82f91a',
  message: 'refactor: extract payment into dedicated service',
  author: 'Nguyen Van A',
  date: '2024-06-12 14:21',
  confidence: 94,
  evidenceItems: mockEvidenceItems,
  changedFiles: [
    { op: '+', path: 'payment-service/PaymentController.java' },
    { op: '+', path: 'payment-service/PaymentService.java' },
    { op: '+', path: 'payment-service/PaymentRepository.java' },
    { op: '+', path: 'payment-service/pom.xml' },
    { op: '-', path: 'monolith/payment/PaymentService.java' },
    { op: '-', path: 'monolith/payment/PaymentController.java' },
    { op: '-', path: 'monolith/payment/PaymentRepository.java' },
    { op: '-', path: 'monolith/payment/PaymentDTO.java' },
  ],
  astChanges: [
    '12 classes moved to payment-service/',
    '4 classes modified (import paths updated)',
    '1 inter-module dependency removed',
    '3 inter-service dependencies added',
  ],
  archBefore: 'Order → Payment',
  archAfter: 'Order → PaymentService',
};
