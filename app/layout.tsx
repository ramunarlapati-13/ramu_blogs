import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { SpotlightCursor } from "@/components/ui/spotlight-cursor";
import { Footer } from "@/components/Footer";
import { ImageProtection } from "@/components/ImageProtection";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://blogs.imramu.me'),
  title: {
    default: "Ramu Blogs",
    template: "%s | Ramu Blogs",
  },
  description: "A modern personal blog by Ramu Narlapati exploring technology, energy, embedded systems, and modern web development.",
  keywords: ["Technology", "Energy", "Design", "Engineering", "Innovation", "Blog"],
  authors: [{ name: "Ramu Narlapati" }],
  creator: "Ramu Narlapati",
  publisher: "Ramu Narlapati",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Ramu Blogs",
    description: "A modern personal blog by Ramu Narlapati exploring technology, energy, embedded systems, and modern web development.",
    url: 'https://blogs.imramu.me',
    siteName: 'Ramu Blogs',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Ramu Blogs',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Ramu Blogs",
    description: "A modern personal blog by Ramu Narlapati exploring technology, energy, embedded systems, and modern web development.",
    creator: '@ramunarlapati',
    images: ['/images/og-image.png'],
  },
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
  alternates: {
    canonical: './',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ImageProtection />
        <SpotlightCursor />
        <Navbar />
        <div className="pt-16 min-h-screen">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}

