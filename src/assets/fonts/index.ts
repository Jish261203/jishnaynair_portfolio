import localFont from "next/font/local";
import { Geist, Geist_Mono, Pixelify_Sans } from "next/font/google";

export const incognito = localFont({
  src: [
    {
      path: "./incognito/incognito_bold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "./incognito/incognito_condensed.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./incognito/incognito_medium.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./incognito/incognito_regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--incognito",
  display: "swap",
});



export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const pixelifySans = Pixelify_Sans({
  variable: "--font-pixelify",
  subsets: ["latin"],
});