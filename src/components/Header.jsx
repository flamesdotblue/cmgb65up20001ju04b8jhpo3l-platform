import { Rocket } from 'lucide-react';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between rounded-b-xl bg-black/30 backdrop-blur-md ring-1 ring-white/10">
          <div className="flex items-center gap-2 px-4">
            <Rocket className="h-5 w-5 text-red-400" />
            <span className="font-semibold tracking-tight">Orbital</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-white/80 px-4">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </nav>
        </div>
      </div>
    </header>
  );
}
