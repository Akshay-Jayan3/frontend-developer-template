import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import { portfolio } from "@/data/portfolio";

export const metadata: Metadata = {
  title: {
    default: `${portfolio.name} — ${portfolio.role}`,
    template: `%s | ${portfolio.name}`,
  },
  description: portfolio.bio[0],
  keywords: [
    "Frontend Engineer", "Design Engineer", "React Developer",
    "Next.js", "TypeScript", "Tailwind CSS", "Web Development", portfolio.name
  ],
  authors: [{ name: portfolio.name }],
  creator: portfolio.name,
  metadataBase: new URL(`https://${portfolio.contact.github}`),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: `${portfolio.name} — ${portfolio.role}`,
    description: portfolio.bio[0],
    siteName: `${portfolio.name} Portfolio`,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${portfolio.name} — ${portfolio.role}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${portfolio.name} — ${portfolio.role}`,
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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400&display=swap" rel="stylesheet" />
      </head>
      <body className="cursor-default md:cursor-none">
        <CustomCursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
