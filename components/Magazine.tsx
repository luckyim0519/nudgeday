"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { artworks, ArtType } from "@/data/artworks";
import Cover from "./Cover";
import Spread from "./Spread";

export default function Magazine() {
  const ref        = useRef<HTMLDivElement>(null);
  const lastWheel  = useRef(0);
  const currentRef = useRef(0);

  const [filter,  setFilter]  = useState<ArtType>("digital");
  const [current, setCurrent] = useState(0);

  const filtered = artworks.filter((a) => a.type === filter);
  const total    = filtered.length + 1; // +1 for cover

  // Keep currentRef in sync for the wheel handler closure
  currentRef.current = current;

  const scrollToPage = useCallback(
    (index: number) => {
      const el = ref.current;
      if (!el) return;
      const clamped = Math.max(0, Math.min(total - 1, index));
      el.scrollTo({ left: clamped * el.clientWidth, behavior: "smooth" });
    },
    [total]
  );

  // When filter changes → jump back to cover instantly
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.scrollTo({ left: 0, behavior: "instant" as ScrollBehavior });
    setCurrent(0);
  }, [filter]);

  // Wheel → one page per gesture
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const now = Date.now();
      if (now - lastWheel.current < 700) return;
      lastWheel.current = now;
      const delta = e.deltaY + e.deltaX;
      if (delta > 0) scrollToPage(currentRef.current + 1);
      if (delta < 0) scrollToPage(currentRef.current - 1);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [scrollToPage]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") scrollToPage(currentRef.current + 1);
      if (e.key === "ArrowLeft"  || e.key === "ArrowUp")   scrollToPage(currentRef.current - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [scrollToPage]);

  // Track current page from scroll
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      setCurrent(Math.round(el.scrollLeft / el.clientWidth));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ── Global nav bar ─────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 bg-black/80 backdrop-blur-sm">
        {/* Logo */}
        <span className="font-serif text-sm tracking-[0.25em] text-white/60 select-none">
          NUDGEDAY
        </span>

        {/* Category tabs */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => setFilter("digital")}
            className={`text-xs tracking-[0.2em] uppercase transition-colors duration-200 font-sans ${
              filter === "digital" ? "text-white" : "text-white/25 hover:text-white/60"
            }`}
          >
            Digital Art
          </button>
          <span className="text-white/15 text-xs">|</span>
          <button
            onClick={() => setFilter("static")}
            className={`text-xs tracking-[0.2em] uppercase transition-colors duration-200 font-sans ${
              filter === "static" ? "text-white" : "text-white/25 hover:text-white/60"
            }`}
          >
            Static Art
          </button>
        </div>

        {/* Page count */}
        <span className="font-sans text-xs tracking-widest text-white/20 tabular-nums">
          {current === 0
            ? "—"
            : `${String(current).padStart(2, "0")} / ${String(filtered.length).padStart(2, "0")}`}
        </span>
      </nav>

      {/* ── Magazine scroll container ──────────────────────────────── */}
      <div ref={ref} className="magazine">
        <Cover onBegin={() => scrollToPage(1)} />
        {filtered.map((artwork, i) => (
          <Spread
            key={artwork.id}
            artwork={artwork}
            index={i}
            total={filtered.length}
            flipped={i % 2 === 1}
          />
        ))}
      </div>

      {/* ── Dot navigation ────────────────────────────────────────── */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-50">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToPage(i)}
            aria-label={`Go to page ${i}`}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? "bg-white w-5 h-0.5"
                : "bg-white/25 w-1 h-1 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </>
  );
}
