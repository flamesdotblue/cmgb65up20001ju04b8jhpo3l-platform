import { useMemo } from 'react';

export default function ShadowOverlay({ angleDeg = 0 }) {
  // A rotating soft arc around the globe to simulate a moving shadow/highlight.
  // This sits over the Spline canvas but doesn't block interactions.
  const ringStyle = useMemo(() => ({
    transform: `translate(-50%, -50%) rotate(${angleDeg}deg)`,
  }), [angleDeg]);

  return (
    <div className="pointer-events-none absolute inset-0">
      {/* Centered container roughly matching globe size */}
      <div className="absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2">
        {/* Outer soft rim */}
        <div
          className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2"
          style={ringStyle}
        >
          <div className="absolute inset-0 rounded-full"
            style={{
              background:
                'radial-gradient(closest-side, rgba(0,0,0,0) 58%, rgba(0,0,0,0.35) 63%, rgba(0,0,0,0.0) 75%)',
              filter: 'blur(6px)',
            }}
          />
        </div>

        {/* Inner moving highlight opposite side for depth */}
        <div
          className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2"
          style={{ transform: `translate(-50%, -50%) rotate(${(angleDeg + 180) % 360}deg)` }}
        >
          <div className="absolute inset-0 rounded-full"
            style={{
              background:
                'radial-gradient(closest-side, rgba(255,255,255,0) 60%, rgba(255,80,80,0.12) 66%, rgba(255,255,255,0) 78%)',
              filter: 'blur(8px)',
              mixBlendMode: 'screen',
            }}
          />
        </div>
      </div>
    </div>
  );
}
