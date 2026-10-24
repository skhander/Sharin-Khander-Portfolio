import { useEffect, useRef } from 'react';

const GLIDER = [
  [1, 0],
  [2, 1],
  [0, 2],
  [1, 2],
  [2, 2],
] as const;

function rng(seed: number) {
  let a = (seed >>> 0) || 1;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function OsLife() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cell = 3;
    const fps = 8;
    const density = 0.14;
    const color = '#1E1E1E';
    let timer: number | null = null;
    let observer: IntersectionObserver | null = null;
    let running = false;

    const start = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const W = Math.ceil(w / cell);
      const H = Math.ceil(h / cell);
      canvas.width = W;
      canvas.height = H;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const rand = rng(3);
      let grid = new Uint8Array(W * H);
      let next = new Uint8Array(W * H);

      const seed = () => {
        for (let p = 0; p < 5; p += 1) {
          const px = Math.floor(rand() * W);
          const py = Math.floor(rand() * H);
          const s = 6 + Math.floor(rand() * 10);
          for (let y = 0; y < s; y += 1) {
            for (let x = 0; x < s; x += 1) {
              if (rand() < density * 3) grid[((py + y) % H) * W + ((px + x) % W)] = 1;
            }
          }
        }
        for (let k = 0; k < 10; k += 1) {
          const gx = Math.floor(rand() * W);
          const gy = Math.floor(rand() * H);
          const flip = rand() < 0.5;
          GLIDER.forEach(([x, y]) => {
            grid[((gy + y) % H) * W + ((gx + (flip ? 2 - x : x)) % W)] = 1;
          });
        }
      };

      const draw = () => {
        ctx.clearRect(0, 0, W, H);
        ctx.fillStyle = color;
        for (let i = 0; i < grid.length; i += 1) {
          if (grid[i]) ctx.fillRect(i % W, (i / W) | 0, 1, 1);
        }
      };

      const step = () => {
        let pop = 0;
        for (let y = 0; y < H; y += 1) {
          for (let x = 0; x < W; x += 1) {
            let n = 0;
            for (let dy = -1; dy <= 1; dy += 1) {
              for (let dx = -1; dx <= 1; dx += 1) {
                if (dx || dy) n += grid[((y + dy + H) % H) * W + ((x + dx + W) % W)];
              }
            }
            const alive = grid[y * W + x];
            const v = (alive && (n === 2 || n === 3)) || (!alive && n === 3) ? 1 : 0;
            next[y * W + x] = v;
            pop += v;
          }
        }
        const swap = grid;
        grid = next;
        next = swap;
        if (pop < (W * H) / 900) seed();
        draw();
      };

      seed();
      draw();
      if (reduced) return;

      const play = (vis: boolean) => {
        if (vis && timer === null) timer = window.setInterval(step, 1000 / fps);
        if (!vis && timer !== null) {
          window.clearInterval(timer);
          timer = null;
        }
      };

      if ('IntersectionObserver' in window) {
        observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => play(entry.isIntersecting));
        });
        observer.observe(canvas);
      } else {
        play(true);
      }
      running = true;
    };

    start();
    let resizeTimer: number | null = null;
    const onResize = () => {
      if (timer !== null) {
        window.clearInterval(timer);
        timer = null;
      }
      observer?.disconnect();
      if (resizeTimer !== null) window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        start();
      }, 200);
    };
    window.addEventListener('resize', onResize);

    return () => {
      if (timer !== null) window.clearInterval(timer);
      if (resizeTimer !== null) window.clearTimeout(resizeTimer);
      observer?.disconnect();
      window.removeEventListener('resize', onResize);
      void running;
    };
  }, []);

  return <canvas className="os-life" data-ros="life" ref={canvasRef} aria-hidden="true" />;
}
