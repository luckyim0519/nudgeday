export type Category = "digital" | "painting" | "photography" | "illustration" | "mixed";
export type ArtType  = "digital" | "static" | "generative";

export interface Artwork {
  id: string;
  title: string;
  medium: string;
  year: number;
  category: Category;
  type: ArtType;   // "digital" → Digital Art tab | "static" → Static Art tab
  image: string;
  description: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// ADD YOUR ARTWORKS HERE
// 1. Drop image files into /public/images/
// 2. Set image: "/images/your-file.jpg"
// 3. Write your own description for each piece
// ─────────────────────────────────────────────────────────────────────────────
export const artworks: Artwork[] = [
  {
    id: "1",
    title: "Void I",
    medium: "Digital",
    year: 2024,
    category: "digital",
    type: "digital",
    image: "https://picsum.photos/seed/nd1/700/900",
    description:
      "An exploration of empty space as a subject rather than a background. The work asks what remains when everything recognisable is stripped away — and whether that remainder is nothing, or everything.",
  },
  {
    id: "2",
    title: "Flux",
    medium: "Oil on canvas",
    year: 2023,
    category: "painting",
    type: "static",
    image: "https://picsum.photos/seed/nd2/900/600",
    description:
      "Painted across three sittings without cleaning the brush between sessions. Each layer carries the residue of the last — a record of time passing, of decisions made and unmade.",
  },
  {
    id: "3",
    title: "Signal",
    medium: "Photography",
    year: 2024,
    category: "photography",
    type: "static",
    image: "https://picsum.photos/seed/nd3/600/900",
    description:
      "Taken at 4am in an empty parking structure. The fluorescent light had been flickering for months. This image captures the exact moment it chose to hold still.",
  },
  {
    id: "4",
    title: "Collapse",
    medium: "Digital",
    year: 2024,
    category: "digital",
    type: "digital",
    image: "https://picsum.photos/seed/nd4/900/700",
    description:
      "Structure failing gradually, then all at once. The composition mirrors how we experience breaking points — invisible until they are undeniable.",
  },
  {
    id: "5",
    title: "Membrane",
    medium: "Mixed media",
    year: 2023,
    category: "mixed",
    type: "static",
    image: "https://picsum.photos/seed/nd5/700/1000",
    description:
      "Wax, ink, and heat on paper. The surface behaves like skin — absorbing, repelling, scarring. Made during a period of thinking about thresholds and what it means to be permeable.",
  },
  {
    id: "6",
    title: "Noise II",
    medium: "Illustration",
    year: 2024,
    category: "illustration",
    type: "digital",
    image: "https://picsum.photos/seed/nd6/800/800",
    description:
      "The second in a series about interference patterns. Where two signals meet and cancel each other out, something new — neither of them — briefly exists.",
  },
  {
    id: "7",
    title: "Drift",
    medium: "Photography",
    year: 2023,
    category: "photography",
    type: "static",
    image: "https://picsum.photos/seed/nd7/1000/650",
    description:
      "Shot from a moving car on a road I didn't know. Everything is slightly wrong — the angle, the exposure, the moment. That wrongness is the point.",
  },
  {
    id: "8",
    title: "Echo",
    medium: "Digital",
    year: 2024,
    category: "digital",
    type: "digital",
    image: "https://picsum.photos/seed/nd8/650/900",
    description:
      "A form repeated until it loses meaning, then gains a different one. Repetition as transformation. The ninth iteration looks nothing like the first.",
  },
  {
    id: "9",
    title: "Residue",
    medium: "Oil on canvas",
    year: 2022,
    category: "painting",
    type: "static",
    image: "https://picsum.photos/seed/nd9/1000/720",
    description:
      "What is left after the subject leaves the room. This painting began as a portrait and became something else entirely — a study in what presence leaves behind.",
  },

  // ── Generative ──────────────────────────────────────────────────────
  {
    id: "generative_art_1",
    title: "Lighthouse at Dusk",
    medium: "Generative / Canvas API",
    year: 2025,
    category: "digital",
    type: "generative",
    image: "/generative/generative_art_1/",
    description:
      "A lighthouse rendered in the spirit of Monet — impressionist dabs of sunset colour layered over a darkening sea. The beam sweeps slowly, indifferent to the hour.",
  },
  {
    id: "g1",
    title: "Field",
    medium: "Generative / p5.js",
    year: 2024,
    category: "digital",
    type: "generative",
    image: "/generative/field/",
    description:
      "A flow field seeded by Perlin noise. Each particle traces a path determined entirely by its starting position — identical rules, infinite variation.",
  },
  {
    id: "g2",
    title: "Lattice",
    medium: "Generative / WebGL",
    year: 2024,
    category: "digital",
    type: "generative",
    image: "/generative/lattice/",
    description:
      "A recursive grid that folds in on itself. The pattern has no fixed centre — zoom in anywhere and the structure repeats, slightly different each time.",
  },
  {
    id: "g3",
    title: "Pulse",
    medium: "Generative / Canvas API",
    year: 2025,
    category: "digital",
    type: "generative",
    image: "/generative/pulse/",
    description:
      "Concentric waves driven by a sine oscillator. When two waves meet out of phase they cancel — the silence between them is as composed as the sound.",
  },
];
