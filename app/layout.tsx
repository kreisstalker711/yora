import type { Metadata } from "next";
import { Fraunces, Inter_Tight } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { AuthProvider } from "@/src/context/AuthContext";
import { CurrencyProvider } from "@/src/context/CurrencyContext";
import { CartProvider } from "@/src/context/CartContext";
import { WishlistProvider } from "@/src/context/WishlistContext";

const fraunces = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const interTight = Inter_Tight({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
      className={`${fraunces.variable} ${interTight.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink selection:bg-accent/20 selection:text-primary">
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
        <AuthProvider>
          <CurrencyProvider>
            <CartProvider>
              <WishlistProvider>{children}</WishlistProvider>
            </CartProvider>
          </CurrencyProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
