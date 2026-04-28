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

  const MediaPanel = (
    <div className="flex items-center justify-center p-8 md:p-16 min-h-0">
      {artwork.type === "generative" ? (
        <iframe
          src={artwork.image}
          title={artwork.title}
          className="w-full h-full rounded-sm"
          style={{ maxHeight: "calc(100dvh - 80px)", border: "none" }}
          allow="autoplay"
        />
      ) : (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={artwork.image}
          alt={artwork.title}
          className="max-h-full max-w-full object-contain"
          style={{ maxHeight: "calc(100dvh - 80px)" }}
          loading="lazy"
        />
      )}
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
      <div
        className="h-full flex flex-col md:grid pt-16"
        style={{
          gridTemplateColumns: flipped ? "38fr 62fr" : "62fr 38fr",
        }}
      >
        {flipped ? (
          <>
            <div className="flex-1 md:order-2 md:flex-none">{MediaPanel}</div>
            <div className="flex-1 md:order-1 md:flex-none">{TextPanel}</div>
          </>
        ) : (
          <>
            <div className="flex-1 md:flex-none">{MediaPanel}</div>
            <div className="flex-1 md:flex-none">{TextPanel}</div>
          </>
        )}
      </div>
    </div>
  );
}
