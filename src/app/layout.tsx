import type { Metadata } from "next";
import "../styles/globals.css";
import { ubuntu, gloriaHallelujah } from "@/fonts/fonts";

export const metadata: Metadata = {
  title: {
    template: "%s | Aquarela",
    default: "Aquarela"
  },
  description: "Site Aquarela",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className={`${ubuntu.variable} ${gloriaHallelujah.variable}`}>
      <link rel="icon" href='/favicon.ico' sizes="any"/>
      <body className={`min-h-screen font-ubuntu`}>
        {children}
      </body>
    </html> 
  );
}
