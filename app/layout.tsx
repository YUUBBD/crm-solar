import "./globals.css";
import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { Sidebar } from "@/components/Sidebar";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Solar CRM",
  description: "CRM para ventas, instalaciones y postventa de energía solar",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body>
        <Sidebar />
        <main className="main-wrap">
          <div className="mobile-bar">
            <b>☀ Solar CRM</b>
            <span>Administrador</span>
          </div>
          {children}
        </main>
      </body>
    </html>
  );
}
