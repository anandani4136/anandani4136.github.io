export type Vec2 = { x: number; y: number };

/** A set of dot positions plus a per-dot depth cue (0.4 far … ~1.1 near). */
export type Formation = { pts: Vec2[]; depth: number[] };

export type FormationKind = 'dataField' | 'network' | 'cloud' | 'box' | 'reconfigure';

function mulberry32(seed: number) {
  let s = seed;
  return () => {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Perspective projection of a 3D world point; returns screen pos + scale. */
function projectS(x: number, y: number, z: number, w: number, h: number) {
  const focal = 2.4;
  const zc = z + 3.3;
  const s = focal / zc;
  const unit = Math.min(w, h) * 0.62;
  return { x: w / 2 + x * s * unit, y: h / 2 + y * s * unit, s };
}

/** Normalise a list of projection scales into pleasant depth cues. */
function normDepth(sArr: number[]): number[] {
  let mn = Infinity;
  let mx = -Infinity;
  for (const s of sArr) {
    if (s < mn) mn = s;
    if (s > mx) mx = s;
  }
  const range = mx - mn;
  if (range < 1e-4) return sArr.map(() => 1);
  return sArr.map((s) => 0.42 + 0.68 * ((s - mn) / range));
}

/** Ambient scattered field, full-bleed so centered text stays readable. */
export function createDataField(count: number, w: number, h: number): Formation {
  const rand = mulberry32(11);
  const pts: Vec2[] = new Array(count);
  const depth: number[] = new Array(count);
  for (let i = 0; i < count; i++) {
    pts[i] = { x: rand() * w, y: rand() * h };
    depth[i] = 0.5 + rand() * 0.55;
  }
  return { pts, depth };
}

/**
 * An evenly-spread phyllotaxis constellation with a bright core — sparse, clean
 * links between neighbours read as ideas connecting into a coherent solution.
 * `local` gently expands and rotates the field so it feels alive.
 */
export function createNetwork(count: number, w: number, h: number, local: number): Formation {
  const rand = mulberry32(23);
  const cx = w / 2;
  const cy = h / 2;
  const maxR = Math.min(w, h) * 0.42;
  const golden = Math.PI * (3 - Math.sqrt(5));
  const grow = 0.86 + 0.26 * local;
  const rot = local * 0.55;

  const pts: Vec2[] = new Array(count);
  const depth: number[] = new Array(count);
  for (let i = 0; i < count; i++) {
    const idx = i + 0.5;
    const r = Math.sqrt(idx / count) * maxR * grow;
    const a = idx * golden + rot;
    const jit = (rand() - 0.5) * maxR * 0.05;
    pts[i] = {
      x: cx + Math.cos(a) * r * 1.32 + jit,
      y: cy + Math.sin(a) * r * 0.92 + jit,
    };
    // Core nodes glow brightest, tapering toward the rim.
    depth[i] = 0.55 + (1 - r / (maxR * grow)) * 0.55 + rand() * 0.08;
  }
  return { pts, depth };
}

/** A 3D sphere shell of dots that expands and slowly rotates — an exploration cloud. */
export function createCloud(count: number, w: number, h: number, local: number): Formation {
  const rand = mulberry32(37);
  const radius = 0.5 + 0.85 * local;
  const angle = local * 1.3;
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  const pts: Vec2[] = new Array(count);
  const sArr: number[] = new Array(count);
  for (let i = 0; i < count; i++) {
    const u = rand() * 2 - 1;
    const phi = rand() * Math.PI * 2;
    const st = Math.sqrt(Math.max(0, 1 - u * u));
    const r = radius * (0.88 + rand() * 0.26);
    const x0 = r * st * Math.cos(phi);
    const y = r * st * Math.sin(phi);
    const z0 = r * u;
    const x = x0 * c + z0 * s;
    const z = -x0 * s + z0 * c;
    const p = projectS(x, y, z, w, h);
    pts[i] = { x: p.x, y: p.y };
    sArr[i] = p.s;
  }
  return { pts, depth: normDepth(sArr) };
}

const CUBE_CORNERS = [
  [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
  [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1],
];
const CUBE_EDGES = [
  [0, 1], [1, 2], [2, 3], [3, 0],
  [4, 5], [5, 6], [6, 7], [7, 4],
  [0, 4], [1, 5], [2, 6], [3, 7],
];

/** A 3D wireframe cube in perspective; a portion of dots break out of it. */
export function createBox(count: number, w: number, h: number, local: number): Formation {
  const rand = mulberry32(51);
  const size = 0.72;
  const ay = 0.62 + local * 0.5;
  const ax = 0.5;
  const cy = Math.cos(ay);
  const sy = Math.sin(ay);
  const cx = Math.cos(ax);
  const sx = Math.sin(ax);

  const pts: Vec2[] = new Array(count);
  const sArr: number[] = new Array(count);
  for (let i = 0; i < count; i++) {
    const j = rand();
    const edge = CUBE_EDGES[i % 12];
    const tt = ((i * 41) % 100) / 100;
    const a = CUBE_CORNERS[edge[0]];
    const b = CUBE_CORNERS[edge[1]];
    let x = (a[0] + (b[0] - a[0]) * tt) * size;
    let y = (a[1] + (b[1] - a[1]) * tt) * size;
    let z = (a[2] + (b[2] - a[2]) * tt) * size;

    let nx = x * cy + z * sy;
    let nz = -x * sy + z * cy;
    x = nx;
    z = nz;
    let ny = y * cx - z * sx;
    nz = y * sx + z * cx;
    y = ny;
    z = nz;

    if (i % 5 === 0 && local > 0.45) {
      const esc = (local - 0.45) / 0.55;
      const dir = Math.atan2(y, x);
      x += Math.cos(dir) * 1.15 * esc;
      y += Math.sin(dir) * 1.15 * esc - 0.35 * esc;
      z += (j - 0.5) * 1.6 * esc;
    }
    const p = projectS(x, y, z, w, h);
    pts[i] = { x: p.x, y: p.y };
    sArr[i] = p.s;
  }
  return { pts, depth: normDepth(sArr) };
}

/** A wide receding perspective ground grid that ripples — echoing the hero terrain. */
export function createReconfigure(count: number, w: number, h: number, local: number): Formation {
  const cols = Math.max(6, Math.round(Math.sqrt(count) * 1.7));
  const rows = Math.ceil(count / cols);
  const pts: Vec2[] = new Array(count);
  const sArr: number[] = new Array(count);
  for (let i = 0; i < count; i++) {
    const row = Math.floor(i / cols);
    const col = i % cols;
    const gx = cols > 1 ? col / (cols - 1) - 0.5 : 0;
    const gz = rows > 1 ? row / (rows - 1) : 0;
    const wave =
      (Math.sin(gx * 6 + gz * 7 + local * Math.PI * 2) +
        Math.cos(gx * 4 - local * Math.PI * 2)) *
      0.16 *
      local;
    const p = projectS(gx * 3, 0.12 + wave, gz * 2.6, w, h);
    pts[i] = { x: p.x, y: p.y };
    sArr[i] = p.s;
  }
  return { pts, depth: normDepth(sArr) };
}

export function blend(a: Vec2[], b: Vec2[], t: number): Vec2[] {
  const k = Math.max(0, Math.min(1, t));
  return a.map((p, i) => ({
    x: p.x + (b[i].x - p.x) * k,
    y: p.y + (b[i].y - p.y) * k,
  }));
}

export function blendArr(a: number[], b: number[], t: number): number[] {
  const k = Math.max(0, Math.min(1, t));
  return a.map((v, i) => v + (b[i] - v) * k);
}

export function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

export type WaveGrid = {
  pts: Vec2[];
  depth: number[];
  cols: number;
  rows: number;
};

/**
 * A wide, shallow ground plane that recedes toward a full-width horizon line
 * (rather than a single vanishing point) so it reads as an unbounded terrain.
 * Near rows run off both screen edges; the plane undulates over time.
 */
export function perspectiveWave(count: number, w: number, h: number, t: number): WaveGrid {
  const aspect = w / h;
  const cols = Math.max(10, Math.round(Math.sqrt(count * aspect) * 1.55));
  const rows = Math.max(4, Math.ceil(count / cols));

  const horizon = h * 0.46;
  const zNear = 1;
  const zFar = 6;
  const camK = h * 0.62; // vertical spread (kept shallow → wide, not tall)
  const minScale = 1 / zFar;

  const pts: Vec2[] = new Array(count);
  const depth: number[] = new Array(count);

  for (let i = 0; i < count; i++) {
    const row = Math.floor(i / cols);
    const col = i % cols;
    const tRow = rows > 1 ? row / (rows - 1) : 0; // 0 near, 1 far
    const z = zNear + (zFar - zNear) * tRow;
    const scale = 1 / z;
    const colT = cols > 1 ? col / (cols - 1) - 0.5 : 0;

    // Lateral half-width stays broad even far away → horizon is a wide line,
    // not a point. Near rows overrun the screen edges.
    const halfSpan = w * (0.9 + 1.15 * scale);

    // Layered ripples; the tRow terms travel toward the viewer so the terrain
    // visibly flows rather than just wobbling in place.
    const hill =
      Math.sin(colT * 5 + t * 0.75) * 0.6 +
      Math.sin(tRow * 7 - t * 1.05 + colT * 3) * 0.55 +
      Math.sin(tRow * 13 - t * 1.7) * 0.25 +
      Math.sin(colT * 11 + t * 1.3) * 0.2;

    pts[i] = {
      x: w / 2 + colT * halfSpan,
      y: horizon + camK * scale + hill * 46 * scale,
    };
    depth[i] = 0.3 + 0.72 * ((scale - minScale) / (1 - minScale));
  }

  return { pts, depth, cols, rows };
}

export function formationFor(
  kind: FormationKind,
  count: number,
  w: number,
  h: number,
  local = 1,
): Formation {
  switch (kind) {
    case 'dataField':
      return createDataField(count, w, h);
    case 'network':
      return createNetwork(count, w, h, local);
    case 'cloud':
      return createCloud(count, w, h, local);
    case 'box':
      return createBox(count, w, h, local);
    case 'reconfigure':
      return createReconfigure(count, w, h, local);
    default:
      return createDataField(count, w, h);
  }
}

/** How strongly to draw connecting edges for a given formation (0–1). */
export function edgeStrengthFor(kind: FormationKind): number {
  switch (kind) {
    case 'network':
      return 0.8;
    case 'reconfigure':
      return 0.55;
    case 'box':
      return 0.5;
    case 'cloud':
      return 0.38;
    case 'dataField':
      return 0.22;
    default:
      return 0;
  }
}

/** Neighbour distance for connecting edges — small for the sparse network web. */
export function edgeThresholdFor(kind: FormationKind, w: number): number {
  if (kind === 'network') return w < 640 ? 40 : 52;
  return w < 640 ? 88 : 116;
}
