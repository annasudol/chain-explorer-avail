import "@/styles/global.css";

import type { Metadata } from "next";

import Header from "@/components/shared/Header";
import { siteConfig } from "@/config/siteConfig";
import { Web3Provider } from "@/providers/Web3Provider";

export const metadata: Metadata = {
  title: {
    template: `%s | ${siteConfig.name}`,
    default: siteConfig.name,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: siteConfig.name,
    images: [
      {
        url: new URL("/images/og-image.png", siteConfig.url).toString(),
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <Web3Provider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
          </div>
        </Web3Provider>
      </body>
    </html>
  );
}
