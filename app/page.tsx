import PortfolioGrid from "@/components/PortfolioGrid";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      {/* Header */}
      <header className="px-6 py-8 flex items-baseline justify-between border-b border-white/5">
        <h1 className="font-serif text-2xl tracking-widest">NUDGEDAY</h1>
        <nav className="flex gap-8">
          <a
            href="mailto:hello@nudgeday.com"
            className="text-xs tracking-[0.15em] uppercase text-white/30 hover:text-white transition-colors duration-150"
          >
            Contact
          </a>
        </nav>
      </header>

      {/* Grid */}
      <PortfolioGrid />

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-white/5 mt-2">
        <p className="text-white/15 text-xs tracking-wider">
          © {new Date().getFullYear()} Nudgeday
        </p>
      </footer>
    </main>
  );
}
