import { useEffect, useRef, useState } from 'react';
import Spline from '@splinetool/react-spline';
import ShadowOverlay from './ShadowOverlay.jsx';
import ShadowWall from './ShadowWall.jsx';

export default function Hero() {
  const [angle, setAngle] = useState(0); // radians
  const baseSpeed = 0.18; // rad/sec slow auto-rotate
  const velocityRef = useRef(0); // additional velocity from drag
  const draggingRef = useRef(false);
  const lastXRef = useRef(0);
  const rafRef = useRef(0);
  const lastTimeRef = useRef(0);

  useEffect(() => {
    const onDown = (e) => {
      draggingRef.current = true;
      lastXRef.current = e.clientX ?? (e.touches ? e.touches[0].clientX : 0);
    };
    const onMove = (e) => {
      if (!draggingRef.current) return;
      const x = e.clientX ?? (e.touches ? e.touches[0].clientX : lastXRef.current);
      const dx = x - lastXRef.current;
      lastXRef.current = x;
      // Convert pixels to angular velocity contribution
      velocityRef.current += dx * 0.003;
      // Clamp
      if (velocityRef.current > 1.4) velocityRef.current = 1.4;
      if (velocityRef.current < -1.4) velocityRef.current = -1.4;
    };
    const onUp = () => {
      draggingRef.current = false;
    };

    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    window.addEventListener('touchstart', onDown, { passive: true });
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('touchend', onUp, { passive: true });

    return () => {
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('touchstart', onDown);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onUp);
    };
  }, []);

  useEffect(() => {
    const loop = (t) => {
      if (!lastTimeRef.current) lastTimeRef.current = t;
      const dt = Math.min(0.05, (t - lastTimeRef.current) / 1000);
      lastTimeRef.current = t;

      // Dampen user velocity gradually
      const vel = velocityRef.current;
      const damp = Math.exp(-3 * dt); // strong damping
      velocityRef.current = vel * damp;

      const newAngle = (angle + (baseSpeed + vel) * dt) % (Math.PI * 2);
      setAngle(newAngle);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [angle]);

  const angleDeg = (angle * 180) / Math.PI;

  return (
    <section className="relative h-[100vh] w-full overflow-hidden" aria-label="Interactive 3D globe with dynamic shadow">
      {/* 3D Scene */}
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/M2rj0DQ6tP7dSzSz/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Dynamic rotating shadow/highlight ring around globe */}
      <ShadowOverlay angleDeg={angleDeg} />

      {/* A wall to the side/bottom that receives the moving shadow */}
      <ShadowWall angleRad={angle} />

      {/* Gradients that don't block pointer events */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/60 to-transparent" />
      </div>

      {/* Copy – non-interactive to ensure dragging always works on globe */}
      <div className="pointer-events-none relative z-10 mx-auto flex h-full max-w-7xl items-center px-6">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-tight">
            Explore a living, rotating Earth
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-white/80">
            Click and drag to spin the globe. The ambient shadow reacts as it rotates.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-widest text-white/80 ring-1 ring-white/20">
              Interactive
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-widest text-white/80 ring-1 ring-white/20">
              Real-time 3D
            </span>
          </div>
        </div>
      </div>

      {/* Hint */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2">
        <div className="rounded-full bg-black/40 px-4 py-2 text-sm text-white/80 ring-1 ring-white/15">
          Click and drag anywhere on the globe to spin
        </div>
      </div>
    </section>
  );
}
