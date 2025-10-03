import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative h-[100vh] w-full overflow-hidden" aria-label="Interactive 3D globe">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/M2rj0DQ6tP7dSzSz/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Soft gradients that won't block pointer events on the 3D scene */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/60 to-transparent" />
      </div>

      {/* Centered copy intentionally non-interactive to allow dragging the globe */}
      <div className="pointer-events-none relative z-10 mx-auto flex h-full max-w-7xl items-center px-6">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-tight">
            Explore a living, rotating Earth
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-white/80">
            Click and drag to spin the red globe. Built for technology, education, and environmental storytelling.
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

      {/* Hint at bottom, non-interactive so it doesn't block dragging */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2">
        <div className="rounded-full bg-black/40 px-4 py-2 text-sm text-white/80 ring-1 ring-white/15">
          Click and drag anywhere on the globe to spin
        </div>
      </div>
    </section>
  );
}
