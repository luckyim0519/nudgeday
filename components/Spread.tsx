import { Artwork } from "@/data/artworks";

interface Props {
  artwork: Artwork;
  index: number;
  total: number;
  flipped: boolean;
}

export default function Spread({ artwork, index, total, flipped }: Props) {
  const num = String(index + 1).padStart(2, "0");

  const cols = artwork.type === "generative"
    ? (flipped ? "45fr 55fr" : "55fr 45fr")
    : (flipped ? "38fr 62fr" : "62fr 38fr");

  const MediaPanel = artwork.type === "generative" ? (
    <div className="w-full h-full overflow-hidden">
      <iframe
        src={artwork.image}
        title={artwork.title}
        className="w-full h-full"
        style={{ border: "none", display: "block" }}
        allow="autoplay"
      />
    </div>
  ) : (
    <div className="flex items-center justify-center p-6 md:p-10 w-full h-full overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={artwork.image}
        alt={artwork.title}
        className="max-h-full max-w-full object-contain"
        loading="lazy"
      />
    </div>
  );

  const TextPanel = (
    <div className="flex flex-col justify-center px-6 md:px-10 py-6 w-full h-full overflow-hidden border-t border-white/5 md:border-t-0">
      {/* Large background number — hidden on mobile to save space */}
      <span className="hidden lg:block font-serif text-9xl leading-none text-white/5 mb-3 select-none shrink-0">
        {num}
      </span>

      <h2 className="font-serif text-xl md:text-2xl lg:text-3xl text-white tracking-wide mb-3 leading-tight shrink-0">
        {artwork.title}
      </h2>

      <div className="w-6 h-px bg-white/20 mb-3 shrink-0" />

      <p className="text-white/35 text-xs tracking-[0.2em] uppercase font-sans mb-4 shrink-0">
        {artwork.medium} &nbsp;·&nbsp; {artwork.year}
      </p>

      <p className="text-white/60 text-sm leading-relaxed font-sans line-clamp-6">
        {artwork.description}
      </p>
    </div>
  );

  return (
    <div className="spread bg-black">
      {/* pt-16 clears the fixed nav */}
      <div className="h-full pt-16">

        {/* Desktop: side-by-side grid */}
        <div
          className="hidden md:grid h-full"
          style={{ gridTemplateColumns: cols }}
        >
          {flipped ? (
            <>
              <div className="h-full overflow-hidden">{TextPanel}</div>
              <div className="h-full overflow-hidden">{MediaPanel}</div>
            </>
          ) : (
            <>
              <div className="h-full overflow-hidden">{MediaPanel}</div>
              <div className="h-full overflow-hidden">{TextPanel}</div>
            </>
          )}
        </div>

        {/* Mobile: image top 55%, text bottom 45% */}
        <div className="md:hidden flex flex-col h-full">
          <div className="h-[55%] overflow-hidden">{MediaPanel}</div>
          <div className="h-[45%] overflow-hidden">{TextPanel}</div>
        </div>

      </div>
    </div>
  );
}
