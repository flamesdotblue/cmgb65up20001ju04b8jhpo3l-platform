export default function Features() {
  const items = [
    {
      title: 'Smooth Interaction',
      desc: 'Drag to rotate the globe in any direction. Pinch/scroll to zoom depending on device support.',
    },
    {
      title: 'Futuristic Aesthetic',
      desc: 'A red tech-forward theme designed to fit corporate, educational, and environmental narratives.',
    },
    {
      title: 'Lightweight Embed',
      desc: 'Powered by Spline for quick integration, fast loading, and reliable performance.',
    },
  ];

  return (
    <section id="features" className="relative z-10 bg-black">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="text-2xl sm:text-3xl font-semibold">Why this globe?</h2>
        <p className="mt-2 text-white/70 max-w-2xl">
          A ready-to-use 3D hero module that invites exploration while keeping your content clean and focused.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-lg font-medium">{item.title}</h3>
              <p className="mt-2 text-white/70 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-12">
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-full bg-red-500 px-5 py-3 text-sm font-medium text-white shadow-lg shadow-red-500/30 hover:bg-red-400 transition-colors"
          >
            Get started
          </a>
        </div>
      </div>
    </section>
  );
}
