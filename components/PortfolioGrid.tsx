"use client";

import { useState } from "react";
import { artworks, Artwork } from "@/data/artworks";
import ArtModal from "./ArtModal";

const CATEGORIES = ["all", "digital", "painting", "photography", "illustration", "mixed"] as const;

export default function PortfolioGrid() {
  const [selected, setSelected] = useState<number | null>(null);
  const [filter, setFilter]     = useState<string>("all");

  const filtered = filter === "all"
    ? artworks
    : artworks.filter((a) => a.category === filter);

  function open(index: number)  { setSelected(index); }
  function close()              { setSelected(null); }
  function prev()               { setSelected((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length)); }
  function next()               { setSelected((i) => (i === null ? null : (i + 1) % filtered.length)); }

  return (
    <>
      {/* Filter bar */}
      <div className="flex flex-wrap gap-4 px-6 py-5 border-b border-white/5">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => { setFilter(cat); setSelected(null); }}
            className={`text-xs tracking-[0.15em] uppercase transition-colors duration-150 ${
              filter === cat
                ? "text-white"
                : "text-white/25 hover:text-white/60"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry grid */}
      <div className="masonry p-0.5">
        {filtered.map((artwork, i) => (
          <ArtCard
            key={artwork.id}
            artwork={artwork}
            onClick={() => open(i)}
          />
        ))}
      </div>

      {/* Modal */}
      {selected !== null && (
        <ArtModal
          artwork={filtered[selected]}
          total={filtered.length}
          index={selected}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}
    </>
  );
}

function ArtCard({ artwork, onClick }: { artwork: Artwork; onClick: () => void }) {
  return (
    <div
      className="masonry-item relative group cursor-pointer overflow-hidden"
      onClick={onClick}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={artwork.image}
        alt={artwork.title}
        className="w-full block grayscale group-hover:grayscale-0 transition-all duration-500"
        loading="lazy"
      />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-white text-xs tracking-[0.15em] uppercase">
            {artwork.title}
          </p>
          <p className="text-white/50 text-xs tracking-wider mt-0.5">
            {artwork.medium} · {artwork.year}
          </p>
        </div>
      </div>
    </div>
  );
}
