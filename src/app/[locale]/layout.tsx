import type { Metadata } from "next";
import { Geist, Geist_Mono, Rubik } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import NavBar from "@/components/nav/nav_bar";
import Footer from "@/components/nav/footer";

import { CartProvider } from "@/context/CartProvider";
import { ProductsProvider } from "@/context/ProductsProvider";

import { SpeedInsights } from "@vercel/speed-insights/next"

const rubik = Rubik({
  subsets: ['latin'],
  variable: '--font-rubik',
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wally Pickers",
  description: "Especialistas en importación y distribución de productos internacionales de calidad",
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} className= {`${rubik.variable} ${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <ProductsProvider>
        <CartProvider>
          <NextIntlClientProvider messages={messages}>
            <body className={`font-sans antialiased`}>
              <header>
                <NavBar/>
              </header>
                {children}
                <SpeedInsights/>
              <Footer/>
            </body>
          </NextIntlClientProvider>
        </CartProvider>
      </ProductsProvider>
    </html>
  );
}
