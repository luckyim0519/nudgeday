import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Nudgeday",
  description: "Art portfolio",
  openGraph: {
    title: "Nudgeday",
    description: "Art portfolio",
    url: "https://nudgeday.com",
    siteName: "Nudgeday",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${dmSerif.variable} bg-black text-white font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
