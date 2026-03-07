import type { Metadata } from "next";
import { Barlow_Condensed, Barlow, Space_Mono } from "next/font/google";
import "./globals.css";

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
});

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "SOLE | Hyper-Dark Sport Luxury",
  description: "Full-Stack Shoe E-Commerce Web & Mobile App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script src="https://checkout.razorpay.com/v1/checkout.js" async></script>
      </head>
      <body
        className={`${barlow.variable} ${barlowCondensed.variable} ${spaceMono.variable} antialiased bg-sole-black text-sole-white font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
