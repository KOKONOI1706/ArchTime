// ─── Mock Data Layer ────────────────────────────────────────────────────────
// Replace these with real REST API calls when backend is available.
// Each export maps to a conceptual API endpoint.

export interface RepositoryInfo {
  name: string;
  branch: string;
  commits: number;
  stack: string;
  lastAnalyzed: string;
}

export interface AnalysisStatus {
  label: string;
  status: 'READY' | 'RUNNING' | 'PENDING' | 'ERROR';
}

export interface ArchitectureMetrics {
  modules: number;
  packages: number;
  classes: number;
  dependencies: number;
}

export interface Module {
  id: string;
  name: string;
  classes: number;
  dependencies: number;
  since: string;
  x: number; // normalized 0-1
  y: number; // normalized 0-1
  peak: number; // height value 0-1
}

export interface TimelineEvent {
  id: string;
  year: string;
  date: string;
  title: string;
  subtitle: string;
  type: 'SERVICE_EXTRACTION' | 'MODULE_SPLIT' | 'PACKAGE_RESTRUCTURE' | 'NEW_MODULE' | 'INITIAL' | 'MICROSERVICE_MIGRATION' | 'DEPENDENCY_CHANGE';
  normalizedX: number; // 0-1 position along timeline
  commitSha: string;
  confidence: number;
}

export interface ArchitecturalChange {
  id: string;
  type: string;
  date: string;
  time: string;
  from: string;
  to: string;
  commitSha: string;
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

export interface AIExplanationData {
  query: string;
  event: string;
  confidence: number;
  evidence: Array<{ index: number; text: string; type: 'FACT' | 'INFERENCE' | 'UNKNOWN' }>;
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
  confidence: number;
  before: string[];
  after: string[];
  structuralChanges: Array<{ op: '+' | '-'; path: string }>;
  dependencyBefore: string;
  dependencyAfter: string;
}

export interface EvidenceData {
  commitSha: string;
  message: string;
  author: string;
  date: string;
  changedFiles: Array<{ op: '+' | '-'; path: string }>;
  astChanges: string[];
  archBefore: string;
  archAfter: string;
}

// ─── Repository ─────────────────────────────────────────────────────────────

export const mockRepository: RepositoryInfo = {
  name: 'ecommerce-platform',
  branch: 'main',
  commits: 1245,
  stack: 'Java / Spring Boot',
  lastAnalyzed: '2025-06-12 14:32:17',
};

// ─── Analysis Status ─────────────────────────────────────────────────────────

export const mockAnalysisStatus: AnalysisStatus[] = [
  { label: 'Git Mining', status: 'READY' },
  { label: 'AST Analysis', status: 'READY' },
  { label: 'Graph Building', status: 'READY' },
  { label: 'Snapshot Gen', status: 'READY' },
  { label: 'Indexing', status: 'READY' },
];

// ─── Metrics ─────────────────────────────────────────────────────────────────

export const mockMetrics: ArchitectureMetrics = {
  modules: 12,
  packages: 48,
  classes: 312,
  dependencies: 1284,
};

// ─── Modules (for point cloud labeling) ──────────────────────────────────────

export const mockModules: Module[] = [
  { id: 'payment-service', name: 'Payment Service', classes: 24, dependencies: 18, since: '2024-06-12', x: 0.72, y: 0.68, peak: 0.9 },
  { id: 'order-service', name: 'Order Service', classes: 31, dependencies: 22, since: '2023-01-15', x: 0.45, y: 0.55, peak: 0.85 },
  { id: 'user-service', name: 'User Service', classes: 19, dependencies: 12, since: '2023-01-15', x: 0.25, y: 0.45, peak: 0.7 },
  { id: 'api-gateway', name: 'API Gateway', classes: 8, dependencies: 8, since: '2024-01-20', x: 0.5, y: 0.82, peak: 0.75 },
  { id: 'notification-service', name: 'Notification Service', classes: 14, dependencies: 9, since: '2023-11-03', x: 0.6, y: 0.35, peak: 0.55 },
  { id: 'user-core', name: 'User Core', classes: 12, dependencies: 7, since: '2023-11-03', x: 0.2, y: 0.3, peak: 0.5 },
  { id: 'user-api', name: 'User API', classes: 7, dependencies: 5, since: '2023-11-03', x: 0.15, y: 0.6, peak: 0.4 },
  { id: 'inventory', name: 'Inventory', classes: 22, dependencies: 14, since: '2023-03-08', x: 0.35, y: 0.65, peak: 0.65 },
  { id: 'search', name: 'Search Service', classes: 16, dependencies: 10, since: '2024-09-10', x: 0.8, y: 0.4, peak: 0.48 },
  { id: 'analytics', name: 'Analytics', classes: 11, dependencies: 6, since: '2025-01-15', x: 0.88, y: 0.55, peak: 0.38 },
  { id: 'database', name: 'Database Layer', classes: 28, dependencies: 0, since: '2023-01-15', x: 0.5, y: 0.15, peak: 0.72 },
  { id: 'monolith', name: 'Core Monolith', classes: 98, dependencies: 42, since: '2023-01-15', x: 0.5, y: 0.5, peak: 1.0 },
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
    confidence: 100,
  },
  {
    id: 'user-split',
    year: '2023',
    date: '2023-11-03',
    title: 'Module Split',
    subtitle: 'User Service Split',
    type: 'MODULE_SPLIT',
    normalizedX: 0.28,
    commitSha: 'f3e7b10',
    confidence: 89,
  },
  {
    id: 'payment-extraction',
    year: '2024',
    date: '2024-06-12',
    title: 'Module Separation',
    subtitle: 'Payment Extraction',
    type: 'SERVICE_EXTRACTION',
    normalizedX: 0.55,
    commitSha: 'd82f91a',
    confidence: 94,
  },
  {
    id: 'microservice',
    year: '2025',
    date: '2025-01-10',
    title: 'Microservice Migration',
    subtitle: 'Service Decoupling',
    type: 'MICROSERVICE_MIGRATION',
    normalizedX: 0.88,
    commitSha: 'e19a44c',
    confidence: 91,
  },
];

// ─── Architectural Changes (Right Panel Timeline) ──────────────────────────

export const mockArchitecturalChanges: ArchitecturalChange[] = [
  { id: '1', type: 'Service Extraction', date: '2024-06-12', time: '14:21', from: 'payment', to: 'payment-service', commitSha: 'd82f91a' },
  { id: '2', type: 'Dependency Change', date: '2024-03-18', time: '09:32', from: 'order', to: 'payment-service', commitSha: 'a91cc2e' },
  { id: '3', type: 'Module Split', date: '2023-11-03', time: '16:45', from: 'user', to: 'user-core / user-api', commitSha: 'f3e7b10' },
  { id: '4', type: 'Package Restructure', date: '2023-07-21', time: '11:12', from: 'com.shop.*', to: 'com.ecommerce.*', commitSha: 'c4d2a9e' },
  { id: '5', type: 'New Module', date: '2023-04-10', time: '08:37', from: '', to: 'notification-service', commitSha: 'b72e3f1' },
];

// ─── Architecture Graph Nodes & Edges ────────────────────────────────────────

export const mockArchNodes: ArchNode[] = [
  { id: 'api-gateway', label: 'api-gateway', x: 160, y: 20, w: 100, h: 22 },
  { id: 'user-service', label: 'user-service', x: 20, y: 80, w: 90, h: 22 },
  { id: 'order-service', label: 'order-service', x: 135, y: 80, w: 95, h: 22 },
  { id: 'payment-service', label: 'payment-service', x: 255, y: 80, w: 108, h: 22 },
  { id: 'notification-service', label: 'notification-service', x: 115, y: 150, w: 135, h: 22 },
  { id: 'database', label: 'database', x: 155, y: 215, w: 75, h: 22 },
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

// ─── AI Explanation ────────────────────────────────────────────────────────

export const mockAIExplanation: AIExplanationData = {
  query: 'Why did the architecture change?',
  event: 'SERVICE_EXTRACTION',
  confidence: 94,
  evidence: [
    { index: 1, text: '12 classes moved from monolith/payment/ to payment-service/', type: 'FACT' },
    { index: 2, text: '4 files removed from original location', type: 'FACT' },
    { index: 3, text: 'new payment-service module created in commit d82f91a', type: 'FACT' },
    { index: 4, text: 'dependency boundary changed: order → payment-service', type: 'FACT' },
    { index: 5, text: 'Developer motivation was scalability (inferred from commit patterns)', type: 'INFERENCE' },
    { index: 6, text: 'Original business requirement that triggered extraction', type: 'UNKNOWN' },
  ],
  conclusion: 'Payment functionality was extracted from the monolithic payment module into a dedicated microservice. The repository provides strong structural evidence for WHAT changed.',
  caveat: 'Insufficient evidence to determine the original developer motivation or business requirement that triggered this architectural decision.',
};

// ─── Commits ───────────────────────────────────────────────────────────────

export const mockCommits: Commit[] = [
  { sha: 'd82f91a', message: 'refactor: extract payment into dedicated service', author: 'Nguyen Van A', date: '2024-06-12', architecturalChange: 'Service Extraction (payment)', changeType: 'SERVICE_EXTRACTION', filesChanged: 18, additions: 412, deletions: 89 },
  { sha: 'a91cc2e', message: 'update order → payment-service dependency', author: 'Le Thi B', date: '2024-03-18', architecturalChange: 'Dependency Change', changeType: 'DEPENDENCY_CHANGE', filesChanged: 6, additions: 44, deletions: 31 },
  { sha: 'f3e7b10', message: 'add notification-service module', author: 'Tran Minh C', date: '2023-11-03', architecturalChange: 'New Module', changeType: 'NEW_MODULE', filesChanged: 24, additions: 511, deletions: 0 },
  { sha: 'c4d2a9e', message: 'restructure packages com.shop → com.ecommerce', author: 'Pham Duy', date: '2023-07-21', architecturalChange: 'Package Restructure', changeType: 'PACKAGE_RESTRUCTURE', filesChanged: 78, additions: 78, deletions: 78 },
  { sha: 'b72e3f1', message: 'split user module into user-core / user-api', author: 'Nguyen Van A', date: '2023-04-10', architecturalChange: 'Module Split (user)', changeType: 'MODULE_SPLIT', filesChanged: 31, additions: 244, deletions: 108 },
  { sha: 'e19a44c', message: 'microservice migration: decouple all services', author: 'Le Thi B', date: '2025-01-10', architecturalChange: 'Microservice Migration', changeType: 'MICROSERVICE_MIGRATION', filesChanged: 94, additions: 1820, deletions: 340 },
];

// ─── Diff Data ────────────────────────────────────────────────────────────

export const mockDiffData: DiffData = {
  commitSha: 'd82f91a',
  message: 'refactor: extract payment into dedicated service',
  author: 'Nguyen Van A',
  date: '2024-06-12 14:21',
  changeType: 'SERVICE_EXTRACTION',
  confidence: 94,
  before: ['Monolith', '  └─ Order', '  └─ Payment', '  └─ User'],
  after: ['Services', '  Order', '  Payment Service ← NEW', '  User Service'],
  structuralChanges: [
    { op: '+', path: 'payment-service/' },
    { op: '+', path: 'payment-service/PaymentController.java' },
    { op: '+', path: 'payment-service/PaymentService.java' },
    { op: '+', path: 'payment-service/PaymentRepository.java' },
    { op: '-', path: 'monolith/payment/PaymentService.java' },
    { op: '-', path: 'monolith/payment/PaymentController.java' },
    { op: '-', path: 'monolith/payment/PaymentRepository.java' },
    { op: '-', path: 'monolith/payment/PaymentDTO.java' },
  ],
  dependencyBefore: 'Order → Payment',
  dependencyAfter: 'Order → PaymentService',
};

// ─── Evidence Data ────────────────────────────────────────────────────────

export const mockEvidenceData: EvidenceData = {
  commitSha: 'd82f91a',
  message: 'refactor: extract payment into dedicated service',
  author: 'Nguyen Van A',
  date: '2024-06-12 14:21',
  changedFiles: [
    { op: '+', path: 'payment-service/PaymentController.java' },
    { op: '+', path: 'payment-service/PaymentService.java' },
    { op: '+', path: 'payment-service/PaymentRepository.java' },
    { op: '+', path: 'payment-service/pom.xml' },
    { op: '-', path: 'payment/PaymentService.java' },
    { op: '-', path: 'payment/PaymentController.java' },
    { op: '-', path: 'payment/PaymentRepository.java' },
    { op: '-', path: 'payment/PaymentDTO.java' },
  ],
  astChanges: [
    '12 classes moved',
    '4 classes modified',
    '1 dependency removed',
    '3 dependencies added',
  ],
  archBefore: 'Order → Payment',
  archAfter: 'Order → PaymentService',
};
