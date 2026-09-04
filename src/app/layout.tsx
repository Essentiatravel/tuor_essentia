import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../index.css";
import Providers from "@/components/providers";
import HeaderWrapper from "@/components/header-wrapper";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ESSENTIA TRAVEL - Explore a Itália com quem entende",
  description: "Explore a magia da Itália com quem entende. Roteiros personalizados, guias locais experientes e experiências autênticas em Roma, Toscana e mais.",
  openGraph: {
    title: "ESSENTIA TRAVEL - Explore a Itália com quem entende",
    description: "Explore a magia da Itália com quem entende. Roteiros personalizados, guias locais experientes e experiências autênticas.",
    type: "website",
    locale: "pt_BR",
    siteName: "ESSENTIA TRAVEL",
  },
  twitter: {
    card: "summary_large_image",
    title: "ESSENTIA TRAVEL - Explore a Itália com quem entende",
    description: "Explore a magia da Itália com quem entende. Roteiros personalizados, guias locais experientes e experiências autênticas.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18194429136"
          strategy="afterInteractive"
        />
        <Script id="google-ads-tag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18194429136');
          `}
        </Script>
      </head>
      <body
        className={`${geistSans?.variable || ""} ${geistMono?.variable || ""} antialiased`}
        suppressHydrationWarning
      >
        <Providers>
          <HeaderWrapper />
          {children}
        </Providers>
      </body>
    </html>
  );
}
