import type { Metadata } from "next";
import { Inter, Hanken_Grotesk } from "next/font/google";
import localFont from "next/font/local";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
});

const faktum = localFont({
  variable: "--font-faktum",
  src: [
    { path: "../fonts/FaktumTest-Regular.otf", weight: "400", style: "normal" },
    { path: "../fonts/FaktumTest-Bold.otf", weight: "700", style: "normal" },
  ],
});

export const metadata: Metadata = {
  title: "Readymade Solutions — We build software that scales with you",
  description:
    "Engineering intelligent software, AI automation, and enterprise infrastructure for ambitious businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${hanken.variable} ${faktum.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
