import { Artwork } from "@/data/artworks";

interface Props {
  artwork: Artwork;
  index: number;
  total: number;
  flipped: boolean;
}

export default function Spread({ artwork, index, total, flipped }: Props) {
  const num = String(index + 1).padStart(2, "0");
  const tot = String(total).padStart(2, "0");

  const ImagePanel = (
    <div className="flex items-center justify-center p-8 md:p-16 min-h-0">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={artwork.image}
        alt={artwork.title}
        className="max-h-full max-w-full object-contain"
        style={{ maxHeight: "calc(100dvh - 80px)" }}
        loading="lazy"
      />
    </div>
  );

  const TextPanel = (
    <div className="flex flex-col justify-center px-8 md:px-14 py-12 border-t border-white/5 md:border-t-0 min-h-0">
      {/* Large faint number */}
      <span className="font-serif text-7xl md:text-9xl leading-none text-white/5 mb-4 select-none">
        {num}
      </span>

      {/* Title */}
      <h2 className="font-serif text-2xl md:text-3xl text-white tracking-wide mb-4 leading-tight">
        {artwork.title}
      </h2>

      {/* Divider */}
      <div className="w-6 h-px bg-white/20 mb-4" />

      {/* Meta */}
      <p className="text-white/35 text-xs tracking-[0.2em] uppercase font-sans mb-6">
        {artwork.medium} &nbsp;·&nbsp; {artwork.year}
      </p>

      {/* Description */}
      <p className="text-white/60 text-sm leading-relaxed font-sans max-w-xs">
        {artwork.description}
      </p>
    </div>
  );

  return (
    <div className="spread bg-black">
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-8 py-6">
        <span className="font-serif text-xs tracking-[0.25em] text-white/40">NUDGEDAY</span>
        <span className="font-sans text-xs tracking-widest text-white/20">
          {num} / {tot}
        </span>
      </div>

      {/* Content — stacked on mobile, side by side on desktop */}
      <div
        className="h-full flex flex-col md:grid pt-14"
        style={{
          gridTemplateColumns: flipped ? "38fr 62fr" : "62fr 38fr",
        }}
      >
        {flipped ? (
          <>
            {/* Mobile: image on top always */}
            <div className="flex-1 md:order-2 md:flex-none">{ImagePanel}</div>
            <div className="flex-1 md:order-1 md:flex-none">{TextPanel}</div>
          </>
        ) : (
          <>
            <div className="flex-1 md:flex-none">{ImagePanel}</div>
            <div className="flex-1 md:flex-none">{TextPanel}</div>
          </>
        )}
      </div>
    </div>
  );
}
