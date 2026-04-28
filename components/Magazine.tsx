"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { artworks } from "@/data/artworks";
import Cover from "./Cover";
import Spread from "./Spread";

export default function Magazine() {
  const ref = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const total = artworks.length + 1; // +1 for cover

  const scrollToPage = useCallback((index: number) => {
    const el = ref.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(total - 1, index));
    el.scrollTo({ left: clamped * el.clientWidth, behavior: "smooth" });
  }, [total]);

  // Vertical scroll / trackpad wheel → one page per gesture, with cooldown
  const lastWheel = useRef(0);
  const currentRef = useRef(0);
  currentRef.current = current;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const now = Date.now();
      if (now - lastWheel.current < 700) return; // cooldown between page turns
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
      if (e.key === "ArrowRight" || e.key === "ArrowDown")  scrollToPage(current + 1);
      if (e.key === "ArrowLeft"  || e.key === "ArrowUp")    scrollToPage(current - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, scrollToPage]);

  // Track current page from scroll position
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const page = Math.round(el.scrollLeft / el.clientWidth);
      setCurrent(page);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div ref={ref} className="magazine">
        <Cover onBegin={() => scrollToPage(1)} />
        {artworks.map((artwork, i) => (
          <Spread
            key={artwork.id}
            artwork={artwork}
            index={i}
            total={artworks.length}
            flipped={i % 2 === 1}
          />
        ))}
      </div>

      {/* Dot navigation */}
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
