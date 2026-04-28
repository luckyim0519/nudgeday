"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { artworks, ArtType } from "@/data/artworks";
import Cover from "./Cover";
import Spread from "./Spread";

export default function Magazine() {
  const outerRef  = useRef<HTMLDivElement>(null);
  const innerRef  = useRef<HTMLDivElement>(null);

  const pos         = useRef(0);   // current rendered x (pixels)
  const target      = useRef(0);   // accumulated target x from wheel
  const raf         = useRef<number>();
  const snapping    = useRef(false);
  const lastPage    = useRef(-1);
  const totalRef    = useRef(1);
  const touchOrigin = useRef({ x: 0, p: 0 });
  const touchVel    = useRef(0);
  const lastTouchX  = useRef(0);
  const lastTouchT  = useRef(0);

  const [filter,  setFilter]  = useState<ArtType>("digital");
  const [current, setCurrent] = useState(0);

  const filtered = artworks.filter((a) => a.type === filter);
  const total    = filtered.length + 1;
  totalRef.current = total;

  // ─── Helpers ────────────────────────────────────────────────────────
  const vw    = () => outerRef.current?.clientWidth ?? window.innerWidth;
  const clamp = (v: number) => Math.max(0, Math.min(v, (totalRef.current - 1) * vw()));

  const render = (p: number) => {
    if (innerRef.current) innerRef.current.style.transform = `translateX(${-p}px)`;
    const page = Math.round(p / vw());
    if (page !== lastPage.current) { lastPage.current = page; setCurrent(page); }
  };

  const cancelRaf = () => {
    if (raf.current) { cancelAnimationFrame(raf.current); raf.current = undefined; }
  };

  // Drift animation loop — lerps pos toward target, no snapping
  const startDrift = useCallback(() => {
    if (raf.current) return;
    const animate = () => {
      if (snapping.current) return;
      const d = target.current - pos.current;
      if (Math.abs(d) < 0.1) {
        pos.current = target.current; render(pos.current);
        raf.current = undefined; return;
      }
      pos.current += d * 0.05; // ← slow drift (increase to speed up)
      render(pos.current);
      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ─── Snap — only used by dots, keyboard, Begin button ───────────────
  const snapTo = useCallback((pageIndex?: number) => {
    cancelRaf();
    snapping.current = true;

    const w    = vw();
    const page = pageIndex !== undefined
      ? Math.max(0, Math.min(pageIndex, totalRef.current - 1))
      : Math.round(pos.current / w);
    const dest = Math.max(0, Math.min(page * w, (totalRef.current - 1) * w));

    const run = () => {
      const d = dest - pos.current;
      if (Math.abs(d) < 0.4) {
        pos.current = dest; render(dest);
        snapping.current = false; raf.current = undefined; return;
      }
      pos.current += d * 0.1;
      render(pos.current);
      raf.current = requestAnimationFrame(run);
    };
    raf.current = requestAnimationFrame(run);
  }, []);

  // ─── Filter change → jump to cover instantly ─────────────────────────
  useEffect(() => {
    cancelRaf();
    pos.current = 0; target.current = 0; snapping.current = false; lastPage.current = -1;
    render(0);
  }, [filter]); // eslint-disable-line react-hooks/exhaustive-deps

  // ─── Wheel: continuous drift, stops wherever user stops ─────────────
  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();

      // Break out of explicit snap if user starts scrolling again
      if (snapping.current) { snapping.current = false; cancelRaf(); }

      // Accumulate target — no snap timer, just drift and stop
      target.current = clamp(target.current + (e.deltaY + e.deltaX) * 0.9);

      startDrift();
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [snapTo, startDrift]); // eslint-disable-line react-hooks/exhaustive-deps

  // ─── Touch: direct drag + momentum on release ────────────────────────
  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;

    const onStart = (e: TouchEvent) => {
      cancelRaf();
      snapping.current = false;
      touchOrigin.current = { x: e.touches[0].clientX, p: pos.current };
      lastTouchX.current  = e.touches[0].clientX;
      lastTouchT.current  = Date.now();
      touchVel.current    = 0;
    };

    const onMove = (e: TouchEvent) => {
      const now = Date.now();
      const dx  = lastTouchX.current - e.touches[0].clientX;
      const dt  = now - lastTouchT.current;
      if (dt > 0) touchVel.current = dx / dt;
      lastTouchX.current = e.touches[0].clientX;
      lastTouchT.current = now;

      const next = clamp(touchOrigin.current.p + (touchOrigin.current.x - e.touches[0].clientX));
      pos.current    = next;
      target.current = next;
      render(next);
    };

    const onEnd = () => {
      // Project forward with momentum — higher multiplier = longer coast
      target.current = clamp(pos.current + touchVel.current * 400);
      startDrift();
    };

    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchmove",  onMove,  { passive: true });
    el.addEventListener("touchend",   onEnd);
    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchmove",  onMove);
      el.removeEventListener("touchend",   onEnd);
    };
  }, [snapTo, startDrift]); // eslint-disable-line react-hooks/exhaustive-deps

  // ─── Iframe wheel forwarding (generative art) ───────────────────────
  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.data?.type !== "wheel") return;
      if (snapping.current) { snapping.current = false; cancelRaf(); }
      target.current = clamp(target.current + (e.data.deltaY + e.data.deltaX) * 0.9);
      startDrift();
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [startDrift]); // eslint-disable-line react-hooks/exhaustive-deps

  // ─── Keyboard: still snaps for accessibility ─────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const page = Math.round(pos.current / vw());
      if (e.key === "ArrowRight" || e.key === "ArrowDown") snapTo(page + 1);
      if (e.key === "ArrowLeft"  || e.key === "ArrowUp")   snapTo(page - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [snapTo]);

  return (
    <>
      {/* ── Nav bar ───────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 bg-black/80 backdrop-blur-sm">
        <span className="font-serif text-sm tracking-[0.25em] text-white/60 select-none">
          NUDGEDAY
        </span>

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
          <span className="text-white/15 text-xs">|</span>
          <button
            onClick={() => setFilter("generative")}
            className={`text-xs tracking-[0.2em] uppercase transition-colors duration-200 font-sans ${
              filter === "generative" ? "text-white" : "text-white/25 hover:text-white/60"
            }`}
          >
            Generative
          </button>
        </div>

        <span className="font-sans text-xs tracking-widest text-white/20 tabular-nums">
          {current === 0
            ? "—"
            : `${String(current).padStart(2, "0")} / ${String(filtered.length).padStart(2, "0")}`}
        </span>
      </nav>

      {/* ── Stage ─────────────────────────────────────────────────── */}
      <div ref={outerRef} className="w-screen overflow-hidden bg-black" style={{ height: "100dvh" }}>
        <div
          ref={innerRef}
          className="flex h-full will-change-transform"
          style={{ width: `${total * 100}vw` }}
        >
          <Cover onBegin={() => snapTo(1)} />
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
      </div>

      {/* ── Dot navigation ────────────────────────────────────────── */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-50">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={() => snapTo(i)}
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
