import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import Loader from "@/src/components/Loader";
import SmoothScroll from "@/src/components/SmoothScroll";
import PageTransitionProvider from "@/src/components/PageTransitionProvider";

const outfit = Outfit({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yora | Pure Organic Wellness",
  description: "Premium Cold-Pressed Organic Oils and traditional wellness products straight from the farm.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FFFDF8] text-[#182218] selection:bg-[#63C132]/20 selection:text-[#0F3D2E]">
        <Loader />
        {children}
      </body>
    </html>
  );
}
