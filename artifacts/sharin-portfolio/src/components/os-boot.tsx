import { useEffect, useState } from 'react';

export function OsBoot({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (reduced) {
      setProgress(1);
      const done = window.setTimeout(onDone, 80);
      return () => window.clearTimeout(done);
    }

    let p = 0;
    const iv = window.setInterval(() => {
      p = Math.min(1, p + (Math.random() < 0.3 ? 0.22 : 0.06));
      setProgress(p);
      if (p >= 1) {
        window.clearInterval(iv);
        window.setTimeout(onDone, 280);
      }
    }, 180);

    return () => window.clearInterval(iv);
  }, [onDone, reduced]);

  return (
    <div className="os-boot" data-ros="boot" role="status" aria-live="polite">
      <div className="os-boot-window">
        <p className="os-boot-bar-title">SHARIN.KHANDER</p>
        <div className="os-boot-track">
          <b className="os-boot-bar" style={{ ['--p' as string]: progress }} />
        </div>
        <p className="os-boot-pct">{Math.round(progress * 100)}%</p>
      </div>
    </div>
  );
}
