import { useRef, useMemo, useState, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { mockModules, type Module } from '../data/mockData';

// ── Simplex-like noise (simple implementation) ────────────────────────────────
function smoothNoise(x: number, z: number): number {
  const n = Math.sin(x * 1.3 + z * 0.7) * 0.5 +
    Math.sin(x * 0.6 - z * 1.1) * 0.3 +
    Math.sin(x * 2.1 + z * 0.3) * 0.15 +
    Math.sin(x * 0.3 + z * 2.4) * 0.1;
  return (n + 1) * 0.5;
}

// ── Module-influenced height map ─────────────────────────────────────────────
function moduleInfluencedHeight(nx: number, nz: number, modules: Module[]): number {
  let baseHeight = smoothNoise(nx * 4, nz * 4) * 0.35;

  for (const mod of modules) {
    const dx = nx - mod.x;
    const dz = nz - mod.y;
    const dist = Math.sqrt(dx * dx + dz * dz);
    const radius = 0.12;
    if (dist < radius) {
      const influence = (1 - dist / radius);
      baseHeight += mod.peak * 0.8 * influence * influence;
    }
  }

  return Math.min(baseHeight, 1.2);
}

// ── Point cloud mesh ──────────────────────────────────────────────────────────
interface PointCloudProps {
  onHover: (mod: Module | null, screenPos: { x: number; y: number }) => void;
}

function PointCloud({ onHover }: PointCloudProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const { camera, gl } = useThree();
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  raycaster.params.Points = { threshold: 0.05 };

  const { positions, colors, pointModules } = useMemo(() => {
    const res = 80;
    const count = res * res;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const pointModules: Array<Module | null> = [];

    let idx = 0;
    for (let xi = 0; xi < res; xi++) {
      for (let zi = 0; zi < res; zi++) {
        const nx = xi / (res - 1);
        const nz = zi / (res - 1);
        const h = moduleInfluencedHeight(nx, nz, mockModules);

        const x = (nx - 0.5) * 8;
        const y = h * 4;
        const z = (nz - 0.5) * 8;

        positions[idx * 3] = x;
        positions[idx * 3 + 1] = y;
        positions[idx * 3 + 2] = z;

        // Brightness based on height
        const brightness = 0.15 + h * 0.8;
        colors[idx * 3] = brightness;
        colors[idx * 3 + 1] = brightness;
        colors[idx * 3 + 2] = brightness;

        // Find nearest module
        let nearestMod: Module | null = null;
        let nearestDist = 0.15;
        for (const mod of mockModules) {
          const dx = nx - mod.x;
          const dz = nz - mod.y;
          const dist = Math.sqrt(dx * dx + dz * dz);
          if (dist < nearestDist) {
            nearestDist = dist;
            nearestMod = mod;
          }
        }
        pointModules.push(nearestMod);
        idx++;
      }
    }
    return { positions, colors, pointModules };
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [positions, colors]);

  const material = useMemo(() => new THREE.PointsMaterial({
    size: 0.04,
    vertexColors: true,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.9,
  }), []);

  // Subtle slow rotation
  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.015;
    }
  });

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!pointsRef.current) return;
    const rect = gl.domElement.getBoundingClientRect();
    const mouse = new THREE.Vector2(
      ((e.clientX - rect.left) / rect.width) * 2 - 1,
      -((e.clientY - rect.top) / rect.height) * 2 + 1,
    );
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(pointsRef.current);
    if (intersects.length > 0) {
      const idx = intersects[0].index ?? 0;
      onHover(pointModules[idx], { x: e.clientX, y: e.clientY });
    } else {
      onHover(null, { x: 0, y: 0 });
    }
  }, [camera, gl, raycaster, pointModules, onHover]);

  return (
    <points ref={pointsRef} geometry={geometry} material={material} onPointerMove={handlePointerMove as unknown as (e: THREE.Event) => void} />
  );
}

// ── Wireframe grid ────────────────────────────────────────────────────────────
function Grid() {
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const verts: number[] = [];
    const s = 4;
    const n = 20;
    for (let i = -n; i <= n; i += 2) {
      verts.push(-s, 0, i * (s / n), s, 0, i * (s / n));
      verts.push(i * (s / n), 0, -s, i * (s / n), 0, s);
    }
    geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
    return geo;
  }, []);

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial color="#1a1a1a" transparent opacity={0.6} />
    </lineSegments>
  );
}

// ── Canvas wrapper for 2D mode ─────────────────────────────────────────────
function TwoDView() {
  return (
    <div className="w-full h-full flex items-center justify-center relative" style={{ background: '#050505' }}>
      <svg width="100%" height="100%" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid meet">
        {/* Grid */}
        {Array.from({ length: 20 }).map((_, i) => (
          <line key={`hg${i}`} x1={0} y1={i * 20} x2={800} y2={i * 20} stroke="#111" strokeWidth={0.5} />
        ))}
        {Array.from({ length: 40 }).map((_, i) => (
          <line key={`vg${i}`} x1={i * 20} y1={0} x2={i * 20} y2={400} stroke="#111" strokeWidth={0.5} />
        ))}

        {/* Modules as circles */}
        {mockModules.map((mod) => (
          <g key={mod.id}>
            <circle
              cx={mod.x * 780 + 10}
              cy={(1 - mod.y) * 380 + 10}
              r={mod.peak * 18 + 4}
              fill="none"
              stroke="#3a3a3a"
              strokeWidth={1}
            />
            <circle
              cx={mod.x * 780 + 10}
              cy={(1 - mod.y) * 380 + 10}
              r={2}
              fill="#d0d0d0"
            />
            <text
              x={mod.x * 780 + 14}
              y={(1 - mod.y) * 380 + 4}
              fill="#606060"
              fontSize={7}
              fontFamily="JetBrains Mono, monospace"
            >
              {mod.name}
            </text>
          </g>
        ))}

        {/* Axis labels */}
        <text x={5} y={395} fill="#333" fontSize={7} fontFamily="monospace">MODULE SPACE →</text>
        <text x={5} y={10} fill="#333" fontSize={7} fontFamily="monospace">↑ DEP INTENSITY</text>
      </svg>
    </div>
  );
}

// ── Graph mode ────────────────────────────────────────────────────────────────
function GraphView() {
  const edges = [
    { x1: 400, y1: 40, x2: 180, y2: 160 },
    { x1: 400, y1: 40, x2: 400, y2: 160 },
    { x1: 400, y1: 40, x2: 620, y2: 160 },
    { x1: 400, y1: 160, x2: 620, y2: 160 },
    { x1: 400, y1: 160, x2: 400, y2: 280 },
    { x1: 400, y1: 280, x2: 400, y2: 360 },
  ];

  const nodes = [
    { x: 400, y: 40, label: 'api-gateway' },
    { x: 180, y: 160, label: 'user-service' },
    { x: 400, y: 160, label: 'order-service' },
    { x: 620, y: 160, label: 'payment-service' },
    { x: 400, y: 280, label: 'notification-service' },
    { x: 400, y: 360, label: 'database' },
  ];

  return (
    <div className="w-full h-full" style={{ background: '#050505' }}>
      <svg width="100%" height="100%" viewBox="0 0 800 420">
        {/* Grid */}
        {Array.from({ length: 21 }).map((_, i) => (
          <line key={`hg${i}`} x1={0} y1={i * 20} x2={800} y2={i * 20} stroke="#0d0d0d" strokeWidth={0.5} />
        ))}
        {Array.from({ length: 41 }).map((_, i) => (
          <line key={`vg${i}`} x1={i * 20} y1={0} x2={i * 20} y2={420} stroke="#0d0d0d" strokeWidth={0.5} />
        ))}

        {edges.map((e, i) => (
          <line key={i} x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2} stroke="#2a2a2a" strokeWidth={1} />
        ))}

        {nodes.map((n) => (
          <g key={n.label} className="arch-node" style={{ cursor: 'pointer' }}>
            <rect x={n.x - 60} y={n.y - 11} width={120} height={22} fill="#0f0f0f" stroke="#2a2a2a" strokeWidth={1} />
            <text x={n.x} y={n.y + 4} textAnchor="middle" fill="#c0c0c0" fontSize={9} fontFamily="JetBrains Mono, monospace">
              {n.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

// ── Tooltip ───────────────────────────────────────────────────────────────────
interface TooltipProps {
  module: Module;
  x: number;
  y: number;
  containerRect: DOMRect | null;
}

function HudTooltip({ module, x, y, containerRect }: TooltipProps) {
  if (!containerRect) return null;
  const relX = x - containerRect.left + 12;
  const relY = y - containerRect.top - 10;

  return (
    <div
      className="tooltip-hud pointer-events-none"
      style={{ left: relX, top: relY, position: 'absolute', zIndex: 50, minWidth: 180 }}
    >
      <div className="text-text-primary font-mono mb-2" style={{ fontSize: '0.78rem', fontWeight: 600 }}>
        {module.name}
      </div>
      <div className="space-y-0.5">
        <div className="flex justify-between gap-4">
          <span className="text-text-muted" style={{ fontSize: '0.68rem' }}>Module:</span>
          <span className="text-text-secondary font-mono" style={{ fontSize: '0.68rem' }}>{module.id}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-text-muted" style={{ fontSize: '0.68rem' }}>Classes:</span>
          <span className="text-text-secondary font-mono" style={{ fontSize: '0.68rem' }}>{module.classes}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-text-muted" style={{ fontSize: '0.68rem' }}>Dependencies:</span>
          <span className="text-text-secondary font-mono" style={{ fontSize: '0.68rem' }}>{module.dependencies}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-text-muted" style={{ fontSize: '0.68rem' }}>Since:</span>
          <span className="text-text-secondary font-mono" style={{ fontSize: '0.68rem' }}>{module.since}</span>
        </div>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
interface ArchitectureVisualizationProps {
  mode: '3D' | '2D' | 'GRAPH';
  onModeChange: (mode: '3D' | '2D' | 'GRAPH') => void;
}

export default function ArchitectureVisualization({ mode, onModeChange }: ArchitectureVisualizationProps) {
  const [hoveredModule, setHoveredModule] = useState<Module | null>(null);
  const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerRect, setContainerRect] = useState<DOMRect | null>(null);

  const handleHover = useCallback((mod: Module | null, pos: { x: number; y: number }) => {
    setHoveredModule(mod);
    setHoverPos(pos);
    if (containerRef.current && !containerRect) {
      setContainerRect(containerRef.current.getBoundingClientRect());
    }
  }, [containerRect]);

  const handleContainerMouseMove = useCallback(() => {
    if (containerRef.current) {
      setContainerRect(containerRef.current.getBoundingClientRect());
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full scanlines"
      onMouseMove={handleContainerMouseMove}
      style={{ background: '#050505' }}
    >
      {/* Mode buttons */}
      <div className="absolute top-2 right-2 flex gap-px z-20">
        {(['3D', '2D', 'GRAPH'] as const).map((m) => (
          <button
            key={m}
            className={`btn-mode ${mode === m ? 'active' : ''}`}
            onClick={() => onModeChange(m)}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Corner HUD decorations */}
      <div className="absolute top-0 left-0 pointer-events-none" style={{ fontSize: '0.58rem', padding: 8, color: '#1a2332', fontFamily: 'JetBrains Mono, monospace' }}>
        MODULE_SPACE / DEP_INTENSITY / TIME
      </div>
      <div className="absolute bottom-0 right-0 pointer-events-none" style={{ fontSize: '0.58rem', padding: 8, color: '#1a2332', fontFamily: 'JetBrains Mono, monospace' }}>
        ΔT 2023.01 → 2025.06
      </div>

      {/* Visualization */}
      {mode === '3D' && (
        <Canvas
          camera={{ position: [0, 4, 8], fov: 45 }}
          style={{ background: '#050505' }}
          gl={{ antialias: true, alpha: false }}
        >
          <ambientLight intensity={0.1} />
          <PointCloud onHover={handleHover} />
          <Grid />
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={3}
            maxDistance={18}
            autoRotate={false}
          />
        </Canvas>
      )}

      {mode === '2D' && <TwoDView />}
      {mode === 'GRAPH' && <GraphView />}

      {/* Tooltip */}
      {hoveredModule && mode === '3D' && (
        <HudTooltip
          module={hoveredModule}
          x={hoverPos.x}
          y={hoverPos.y}
          containerRect={containerRect}
        />
      )}
    </div>
  );
}
