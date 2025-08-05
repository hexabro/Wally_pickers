import type { Metadata } from "next";
import { Geist, Geist_Mono, Rubik } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import NavBar from "@/components/nav/nav_bar";
import Footer from "@/components/nav/footer";

import { CartProvider } from "@/context/CartProvider";
import { ProductsProvider } from "@/context/ProductsProvider";

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
  title: "Wally pickers",
  description: "Wally pickers importación de comida mundial",
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
      <ProductsProvider>
        <CartProvider>
          <NextIntlClientProvider messages={messages}>
            <body className={`font-sans antialiased`}>
              <header>
                <NavBar/>
              </header>
              {children}
              <Footer/>
            </body>
          </NextIntlClientProvider>
        </CartProvider>
      </ProductsProvider>
    </html>
  );
}
