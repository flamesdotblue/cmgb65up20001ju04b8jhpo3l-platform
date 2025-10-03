import { useMemo } from 'react';

export default function ShadowWall({ angleRad = 0 }) {
  // Compute an elliptical path for the projected shadow center
  const { x, y, scaleX, opacity } = useMemo(() => {
    const cos = Math.cos(angleRad);
    const sin = Math.sin(angleRad);
    // Path radius on the panel
    const radiusX = 90; // px offset in X
    const radiusY = 45; // px offset in Y
    // Shadow squashes as it moves "up" or "down"
    const sx = 1 + 0.25 * cos; // scale between 0.75 and 1.25
    // Shadow darkens a touch when closer
    const op = 0.25 + 0.25 * (1 + cos) / 2; // 0.25 -> 0.5
    return {
      x: radiusX * cos,
      y: radiusY * sin,
      scaleX: sx,
      opacity: op,
    };
  }, [angleRad]);

  return (
    <div className="pointer-events-none select-none">
      {/* Desktop: right side wall */}
      <div className="hidden lg:block absolute right-6 top-24 bottom-24 w-[28rem] rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.02] backdrop-blur-sm overflow-hidden">
        <div className="absolute inset-0">
          {/* Subtle wall texture */}
          <div className="absolute inset-0 opacity-[0.4]"
               style={{ background: 'radial-gradient(1000px 400px at 20% 20%, rgba(255,255,255,0.06), rgba(0,0,0,0))' }} />
        </div>
        {/* Projected shadow shape that moves */}
        <div className="absolute left-1/2 top-1/2 h-[44vmin] w-[44vmin] -translate-x-1/2 -translate-y-1/2"
             style={{
               transform: `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${scaleX}, 0.8)`,
               filter: 'blur(26px)',
               opacity,
             }}
        >
          <div className="h-full w-full rounded-full"
               style={{
                 background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.5), rgba(0,0,0,0) 60%)',
               }}
          />
        </div>
      </div>

      {/* Mobile/Tablet: bottom wall */}
      <div className="lg:hidden absolute left-4 right-4 bottom-4 h-[28vh] rounded-3xl border border-white/10 bg-gradient-to-t from-white/[0.04] to-white/[0.02] backdrop-blur-sm overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-[0.4]"
               style={{ background: 'radial-gradient(800px 300px at 80% 80%, rgba(255,255,255,0.06), rgba(0,0,0,0))' }} />
        </div>
        <div className="absolute left-1/2 top-1/2 h-[44vmin] w-[44vmin] -translate-x-1/2 -translate-y-1/2"
             style={{
               transform: `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${scaleX}, 0.8)`,
               filter: 'blur(24px)',
               opacity,
             }}
        >
          <div className="h-full w-full rounded-full"
               style={{
                 background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.5), rgba(0,0,0,0) 60%)',
               }}
          />
        </div>
      </div>
    </div>
  );
}
