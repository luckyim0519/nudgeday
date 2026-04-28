"use client";

interface Props {
  onBegin: () => void;
}

export default function Cover({ onBegin }: Props) {
  return (
    <div className="spread flex flex-col items-center justify-center bg-black">
      <div className="text-center select-none">
        <p className="text-white/20 text-xs tracking-[0.4em] uppercase mb-8 font-sans">
          Selected Works
        </p>
        <h1 className="font-serif text-6xl md:text-8xl tracking-[0.2em] text-white mb-16">
          NUDGEDAY
        </h1>
        <button
          onClick={onBegin}
          className="text-white/30 text-xs tracking-[0.3em] uppercase hover:text-white transition-colors duration-300 font-sans"
        >
          Begin &nbsp;→
        </button>
      </div>

      {/* Bottom hint */}
      <p className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/15 text-xs tracking-widest font-sans">
        swipe or scroll to navigate
      </p>
    </div>
  );
}
