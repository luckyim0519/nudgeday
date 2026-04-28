export type Category = "digital" | "painting" | "photography" | "illustration" | "mixed";

export interface Artwork {
  id: string;
  title: string;
  medium: string;
  year: number;
  category: Category;
  image: string; // /images/your-file.jpg  OR  an https:// URL
}

// ─────────────────────────────────────────────────────────────────────────────
// ADD YOUR ARTWORKS HERE
// 1. Drop your image files into /public/images/
// 2. Set image: "/images/your-filename.jpg"
// ─────────────────────────────────────────────────────────────────────────────
export const artworks: Artwork[] = [
  {
    id: "1",
    title: "Void I",
    medium: "Digital",
    year: 2024,
    category: "digital",
    image: "https://picsum.photos/seed/nd1/700/900",
  },
  {
    id: "2",
    title: "Flux",
    medium: "Oil on canvas",
    year: 2023,
    category: "painting",
    image: "https://picsum.photos/seed/nd2/800/600",
  },
  {
    id: "3",
    title: "Signal",
    medium: "Photography",
    year: 2024,
    category: "photography",
    image: "https://picsum.photos/seed/nd3/600/900",
  },
  {
    id: "4",
    title: "Collapse",
    medium: "Digital",
    year: 2024,
    category: "digital",
    image: "https://picsum.photos/seed/nd4/900/700",
  },
  {
    id: "5",
    title: "Membrane",
    medium: "Mixed media",
    year: 2023,
    category: "mixed",
    image: "https://picsum.photos/seed/nd5/700/1000",
  },
  {
    id: "6",
    title: "Noise II",
    medium: "Illustration",
    year: 2024,
    category: "illustration",
    image: "https://picsum.photos/seed/nd6/800/800",
  },
  {
    id: "7",
    title: "Drift",
    medium: "Photography",
    year: 2023,
    category: "photography",
    image: "https://picsum.photos/seed/nd7/900/600",
  },
  {
    id: "8",
    title: "Echo",
    medium: "Digital",
    year: 2024,
    category: "digital",
    image: "https://picsum.photos/seed/nd8/600/800",
  },
  {
    id: "9",
    title: "Residue",
    medium: "Oil on canvas",
    year: 2022,
    category: "painting",
    image: "https://picsum.photos/seed/nd9/1000/700",
  },
];
