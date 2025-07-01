import type { Metadata } from "next";
import { Geist, Geist_Mono, Rubik } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/sections/NavBar";


const rubik = Rubik({
  subsets: ['latin'],
  weight: ['400', '700'],
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
    <html lang="es" className= {'${rubik.variable}'}>
      
      <body className={`font-sans antialiased`}>
        <header>
          <NavBar/>
        </header>
        {children}
      </body>
    </html>
  );
}
