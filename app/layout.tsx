import type { Metadata, Viewport } from "next";
import { Fraunces, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import GridOverlay from "@/components/GridOverlay";
import ChatWidget from "@/components/ChatWidget";
import Loader from "@/components/Loader";
import { portfolio } from "@/data/portfolio";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${portfolio.name} - ${portfolio.role}`,
    template: `%s | ${portfolio.name}`,
  },
  description: portfolio.bio[0],
  keywords: [
    "Frontend Engineer", "Design Engineer", "React Developer",
    "Next.js", "TypeScript", "Tailwind CSS", "Web Development", portfolio.name
  ],
  authors: [{ name: portfolio.name }],
  creator: portfolio.name,
  metadataBase: new URL(`https://${portfolio.contact.portfolio}`),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: `${portfolio.name} - ${portfolio.role}`,
    description: portfolio.bio[0],
    siteName: `${portfolio.name} Portfolio`,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${portfolio.name} - ${portfolio.role}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${portfolio.name} - ${portfolio.role}`,
    description: portfolio.bio[0],
    images: ["/og-image.jpg"],
  },
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
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0c0e0d" },
    { media: "(prefers-color-scheme: light)", color: "#fafaf8" },
  ],
  colorScheme: "dark light",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: portfolio.name,
  jobTitle: portfolio.role,
  url: `https://${portfolio.contact.portfolio}`,
  email: `mailto:${portfolio.contact.email}`,
  address: { "@type": "PostalAddress", addressLocality: portfolio.location },
  sameAs: [portfolio.contact.github, `https://www.${portfolio.contact.linkedin}`],
  description: portfolio.bio[0],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${jetbrainsMono.variable}`}>
      <body className="cursor-default md:cursor-none">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Loader />
        <GridOverlay />
        <CustomCursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
        <ChatWidget />
      </body>
    </html>
  );
}
