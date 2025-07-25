import type { Metadata } from "next";
import { Geist, Geist_Mono, Rubik } from "next/font/google";
import "./globals.css";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className= {`${rubik.variable} ${geistSans.variable} ${geistMono.variable}`}>
      <ProductsProvider>
        <CartProvider>

        <body className={`font-sans antialiased`}>
          <header>
            <NavBar/>
          </header>
          {children}
          <Footer/>
        </body>
          
        </CartProvider>
      </ProductsProvider>
      
    </html>
  );
}
