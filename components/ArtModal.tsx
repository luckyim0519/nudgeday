"use client";

import { useEffect, useCallback } from "react";
import { Artwork } from "@/data/artworks";

interface Props {
  artwork: Artwork;
  total: number;
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function ArtModal({ artwork, total, index, onClose, onPrev, onNext }: Props) {
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape")      onClose();
      if (e.key === "ArrowLeft")   onPrev();
      if (e.key === "ArrowRight")  onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [handleKey]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black flex flex-col"
      onClick={onClose}
    >
      {/* Top bar */}
      <div
        className="flex items-center justify-between px-6 py-4 shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="text-white/30 text-xs tracking-[0.2em] uppercase font-sans">
          {index + 1} / {total}
        </span>
        <button
          onClick={onClose}
          className="text-white/40 hover:text-white text-xs tracking-[0.2em] uppercase transition-colors duration-150"
        >
          Close
        </button>
      </div>

      {/* Image area */}
      <div
        className="flex-1 flex items-center justify-center px-6 min-h-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Prev */}
        <button
          onClick={onPrev}
          className="shrink-0 w-10 text-white/20 hover:text-white transition-colors duration-150 text-xl pr-4"
        >
          ←
        </button>

        {/* Art */}
        <div className="flex-1 flex items-center justify-center min-h-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={artwork.image}
            alt={artwork.title}
            className="max-h-full max-w-full object-contain select-none"
            style={{ maxHeight: "calc(100vh - 160px)" }}
          />
        </div>

        {/* Next */}
        <button
          onClick={onNext}
          className="shrink-0 w-10 text-white/20 hover:text-white transition-colors duration-150 text-xl pl-4"
        >
          →
        </button>
      </div>

      {/* Bottom info */}
      <div
        className="shrink-0 px-6 py-5 flex items-baseline justify-between border-t border-white/5"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <h2 className="text-white text-sm tracking-[0.15em] uppercase font-sans">
            {artwork.title}
          </h2>
          <p className="text-white/40 text-xs tracking-wider mt-1">
            {artwork.medium}
          </p>
        </div>
        <span className="text-white/25 text-xs font-sans">{artwork.year}</span>
      </div>
    </div>
  );
}
