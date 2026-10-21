import { useEffect, useRef } from 'react';

/**
 * Ambient "flexible polygon" annotation background.
 *
 * Scattered ROI polygons — the editable region annotations common to every
 * medical-imaging viewer — each with little square vertex handles. They breathe
 * gently, and a brighter highlight traces around one at a time, like an
 * annotation being drawn or edited. Fixed (no parallax), charcoal linework.
 *
 * Calm by design: slow motion, low contrast, pauses off-screen / hidden,
 * respects prefers-reduced-motion.
 */

const INK = '46, 46, 46'; // annotation linework, matches the body text

// soft mesh-gradient blobs (brand yellows + cream, one cool note for depth).
// Each drifts on a slow orbit and parallaxes toward the cursor by `depth`.
const BLOBS = [
  { col: '243, 223, 73', a: 0.26, bx: 0.2, by: 0.28, rad: 0.52, orbit: 0.05, speed: 0.09, phase: 0.0, depth: 0.5 },
  { col: '250, 236, 150', a: 0.5, bx: 0.78, by: 0.22, rad: 0.55, orbit: 0.06, speed: 0.06, phase: 1.6, depth: 0.95 },
  { col: '255, 253, 244', a: 0.7, bx: 0.55, by: 0.72, rad: 0.5, orbit: 0.05, speed: 0.07, phase: 3.1, depth: 0.7 },
  { col: '223, 230, 238', a: 0.36, bx: 0.14, by: 0.82, rad: 0.48, orbit: 0.07, speed: 0.05, phase: 2.2, depth: 1.0 },
  { col: '247, 228, 168', a: 0.44, bx: 0.92, by: 0.78, rad: 0.5, orbit: 0.05, speed: 0.1, phase: 4.3, depth: 0.6 },
];

type Vert = {
  ang: number;
  r: number;
  amp: number;
  phase: number;
  speed: number;
};
type Poly = {
  cx: number;
  cy: number;
  verts: Vert[];
  closed: boolean;
};

// tiny seeded RNG so the layout is stable between renders
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Rect = { x0: number; y0: number; x1: number; y1: number };

function buildPolys(exclusions: Rect[], W: number, H: number): Poly[] {
  // fresh random layout on every load
  const rnd = mulberry32((Math.random() * 2 ** 32) >>> 0);
  const COUNT = 16;
  const minDim = Math.min(W, H) || 1;

  const polys: Poly[] = [];
  let attempts = 0;
  while (polys.length < COUNT && attempts < COUNT * 90) {
    attempts++;
    const cx = 0.03 + rnd() * 0.94;
    const cy = 0.05 + rnd() * 0.9;

    // build the shape first so we know its extent
    const complex = rnd() < 0.3; // some intricate / concave ROIs
    const n = complex ? 7 + Math.floor(rnd() * 5) : 4 + Math.floor(rnd() * 3);
    const baseR = (complex ? 0.055 : 0.04) + rnd() * 0.045;
    const verts: Vert[] = [];
    let maxR = 0;
    for (let i = 0; i < n; i++) {
      const ang = (i / n) * Math.PI * 2 + (rnd() - 0.5) * 0.45;
      const lobe = complex ? (i % 2 === 0 ? 1 : 0.62) : 1; // lobed outlines
      const r = baseR * lobe * (0.72 + rnd() * 0.55);
      maxR = Math.max(maxR, r);
      verts.push({
        ang,
        r,
        amp: r * (0.07 + rnd() * 0.09),
        phase: rnd() * Math.PI * 2,
        speed: 0.18 + rnd() * 0.34,
      });
    }
    const closed = rnd() > 0.2; // ~80% closed, rest freehand

    // keep clear of other polygons …
    let ok = true;
    for (const p of polys) {
      if (Math.hypot(cx - p.cx, cy - p.cy) < 0.1) {
        ok = false;
        break;
      }
    }
    // … and out of the text / photo zones (polygon extent converted to
    // normalised coords for each axis)
    if (ok) {
      const dx = (maxR * minDim) / W;
      const dy = (maxR * minDim) / H;
      for (const e of exclusions) {
        if (cx + dx > e.x0 && cx - dx < e.x1 && cy + dy > e.y0 && cy - dy < e.y1) {
          ok = false;
          break;
        }
      }
    }
    if (ok) polys.push({ cx, cy, verts, closed });
  }

  return polys;
}

const AnnotationBackground = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    const canvas = document.createElement('canvas');
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    mount.appendChild(canvas);
    const ctx = canvas.getContext('2d')!;

    let polys: Poly[] = [];
    let activePoly = 0;
    let headDist = 0;
    let W = 0;
    let H = 0;
    let prevW = 0;
    let prevH = 0;

    // text / photo zones to keep polygons out of (normalised to the canvas)
    const computeExclusions = (): Rect[] => {
      const parent = mount.parentElement;
      if (!parent) return [];
      const mr = mount.getBoundingClientRect();
      if (mr.width < 1 || mr.height < 1) return [];
      const out: Rect[] = [];
      for (const sel of ['.text', '.my-photo']) {
        const el = parent.querySelector(sel);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        const padX = 0.02;
        const padY = 0.03;
        out.push({
          x0: (r.left - mr.left) / mr.width - padX,
          y0: (r.top - mr.top) / mr.height - padY,
          x1: (r.right - mr.left) / mr.width + padX,
          y1: (r.bottom - mr.top) / mr.height + padY,
        });
      }
      return out;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = mount.clientWidth;
      H = mount.clientHeight;
      canvas.width = Math.max(1, Math.round(W * dpr));
      canvas.height = Math.max(1, Math.round(H * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // (re)generate the layout on first run or a real size change
      if (
        polys.length === 0 ||
        Math.abs(W - prevW) > 24 ||
        Math.abs(H - prevH) > 24
      ) {
        prevW = W;
        prevH = H;
        polys = buildPolys(computeExclusions(), W || 1, H || 1);
        activePoly = 0;
        headDist = 0;
      }
    };
    resize();

    // --- cursor (eased) — gently leans the gradient -----------------------
    const target = { x: 0, y: 0 };
    const eased = { x: 0, y: 0 };
    const onPointerMove = (e: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      target.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      target.y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    // --- geometry helpers --------------------------------------------------
    const vertexPoints = (p: Poly, t: number) => {
      const min = Math.min(W, H);
      const pts: Array<[number, number]> = [];
      for (const v of p.verts) {
        const r = (v.r + Math.sin(t * v.speed + v.phase) * v.amp) * min;
        const a = v.ang + Math.sin(t * v.speed * 0.5 + v.phase) * 0.04;
        pts.push([p.cx * W + Math.cos(a) * r, p.cy * H + Math.sin(a) * r]);
      }
      return pts;
    };

    const edgeList = (pts: Array<[number, number]>, closed: boolean) => {
      const edges: Array<[[number, number], [number, number], number]> = [];
      const last = closed ? pts.length : pts.length - 1;
      let total = 0;
      for (let i = 0; i < last; i++) {
        const a = pts[i];
        const b = pts[(i + 1) % pts.length];
        const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
        edges.push([a, b, len]);
        total += len;
      }
      return { edges, total };
    };

    const pointAt = (
      edges: Array<[[number, number], [number, number], number]>,
      dist: number,
    ): [number, number] => {
      let d = dist;
      for (const [a, b, len] of edges) {
        if (d <= len) {
          const f = len === 0 ? 0 : d / len;
          return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f];
        }
        d -= len;
      }
      const e = edges[edges.length - 1];
      return e ? e[1] : [0, 0];
    };

    // --- tracing sequencer -------------------------------------------------
    const TRACE_SPEED = 150;
    const ARC = 0.16;

    // --- drawing -----------------------------------------------------------
    const drawHandle = (x: number, y: number, s: number, strong: boolean) => {
      ctx.beginPath();
      ctx.rect(x - s, y - s, s * 2, s * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = `rgba(${INK}, ${strong ? 0.85 : 0.4})`;
      ctx.stroke();
    };

    const render = (t: number) => {
      // animated mesh gradient — soft blobs drifting on slow orbits and
      // leaning toward the cursor with per-blob parallax depth
      ctx.fillStyle = '#fbf7ec';
      ctx.fillRect(0, 0, W, H);
      const amp = W * 0.05;
      const md = Math.max(W, H);
      for (const bl of BLOBS) {
        const ox = Math.cos(t * bl.speed + bl.phase) * bl.orbit;
        const oy = Math.sin(t * bl.speed * 0.8 + bl.phase) * bl.orbit;
        const px = (bl.bx + ox) * W + eased.x * amp * bl.depth;
        const py = (bl.by + oy) * H + eased.y * amp * bl.depth;
        const r = bl.rad * md;
        const rg = ctx.createRadialGradient(px, py, 0, px, py, r);
        rg.addColorStop(0, `rgba(${bl.col}, ${bl.a})`);
        rg.addColorStop(1, `rgba(${bl.col}, 0)`);
        ctx.fillStyle = rg;
        ctx.fillRect(0, 0, W, H);
      }

      // annotation outlines + handles (fixed)
      const geo = polys.map((p) => {
        const pts = vertexPoints(p, t);
        return { p, pts, ...edgeList(pts, p.closed) };
      });

      for (const { p, pts } of geo) {
        if (pts.length < 2) continue;
        ctx.beginPath();
        ctx.moveTo(pts[0][0], pts[0][1]);
        for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
        if (p.closed) ctx.closePath();

        if (p.closed) {
          ctx.fillStyle = `rgba(${INK}, 0.02)`;
          ctx.fill();
        }
        ctx.lineJoin = 'round';
        ctx.lineWidth = 1.3;
        ctx.strokeStyle = `rgba(${INK}, 0.28)`;
        ctx.stroke();

        for (const [x, y] of pts) drawHandle(x, y, 2.4, false);
      }

      // active trace: a glowing arc + head handle travelling the perimeter
      if (!prefersReduced && geo.length) {
        const active = geo[activePoly % geo.length];
        if (active.total > 4) {
          const arcLen = active.total * ARC;
          const steps = 28;
          ctx.beginPath();
          for (let i = 0; i <= steps; i++) {
            let d = headDist - arcLen + (arcLen * i) / steps;
            d = ((d % active.total) + active.total) % active.total;
            const [x, y] = pointAt(active.edges, d);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.lineCap = 'round';
          ctx.lineWidth = 2;
          ctx.strokeStyle = `rgba(${INK}, 0.7)`;
          ctx.stroke();

          const hd = ((headDist % active.total) + active.total) % active.total;
          const [hx, hy] = pointAt(active.edges, hd);
          ctx.strokeStyle = `rgba(${INK}, 0.45)`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(hx - 8, hy);
          ctx.lineTo(hx + 8, hy);
          ctx.moveTo(hx, hy - 8);
          ctx.lineTo(hx, hy + 8);
          ctx.stroke();
          drawHandle(hx, hy, 3.2, true);
        }
      }
    };

    // --- loop, gated on visibility ----------------------------------------
    let raf = 0;
    let running = false;
    let visible = true;
    let last = performance.now();
    let elapsed = 0;

    const frame = (now: number) => {
      if (!running) return;
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      elapsed += dt;

      eased.x += (target.x - eased.x) * 0.04;
      eased.y += (target.y - eased.y) * 0.04;

      headDist += TRACE_SPEED * dt;
      const ap = polys[activePoly % polys.length];
      const gl = edgeList(vertexPoints(ap, elapsed), ap.closed);
      if (headDist > gl.total) {
        headDist = 0;
        activePoly = (activePoly + 1) % polys.length;
      }

      render(elapsed);
    };

    const start = () => {
      if (running || !visible) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };
    const drawStatic = () => render(0);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (!visible) stop();
        else if (prefersReduced) drawStatic();
        else start();
      },
      { threshold: 0.01 },
    );
    io.observe(mount);

    const onVisibility = () => {
      if (document.hidden) stop();
      else if (visible && !prefersReduced) start();
    };
    document.addEventListener('visibilitychange', onVisibility);

    const ro = new ResizeObserver(() => {
      resize();
      if (prefersReduced || !running) drawStatic();
    });
    ro.observe(mount);

    if (prefersReduced) drawStatic();
    else start();

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pointermove', onPointerMove);
      if (canvas.parentNode === mount) mount.removeChild(canvas);
    };
  }, []);

  return <div className="hero-bg" ref={mountRef} aria-hidden="true" />;
};

export default AnnotationBackground;
