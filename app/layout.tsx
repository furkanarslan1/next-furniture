import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteConfig = {
  name: "Next Furniture",
  description:
    "Discover modern and stylish furniture for your home. Quality collections for living room, bedroom, dining room, home office and more.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://nextfurniture.com",
  ogImage: "/og-image.jpg",
  creator: "Next Furniture",
  keywords: [
    "furniture",
    "home decor",
    "living room furniture",
    "bedroom furniture",
    "dining room furniture",
    "home office furniture",
    "modern furniture",
    "online furniture store",
    "buy furniture online",
    "quality furniture",
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  // base
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`, // for sub pages: "Living Room | Next Furniture"
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.creator }],
  creator: siteConfig.creator,

  // Open Graph (Facebook, LinkedIn, WhatsApp)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },

  // Twitter
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    // creator: "@nextfurniture",  // if you have twitter account
  },

  // Favicon & Icons
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon-96x96.png",
    apple: "/apple-touch-icon.png",
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Verification (optional)
  // verification: {
  //   google: "your-google-verification-code",
  // },
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
        {children}
        <Toaster />
      </body>
    </html>
  );
}
