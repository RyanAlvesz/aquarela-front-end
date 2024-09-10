import type { Metadata } from "next";
import "./globals.css";
import { Ubuntu, Gloria_Hallelujah } from "next/font/google";

const ubuntu = Ubuntu ({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-ubuntu'
})

const gloriaHallelujah = Gloria_Hallelujah ({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-gloria'
})

export const metadata: Metadata = {
  title: "Aquarela",
  description: "Site Aquarela",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className={`${ubuntu.variable} ${gloriaHallelujah.variable}`}>
      <body className={`min-h-screen font-ubuntu`}>
        {children}
      </body>
    </html>
  );
}
