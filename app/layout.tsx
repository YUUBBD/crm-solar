import "./globals.css";
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { Sidebar } from "@/components/Sidebar";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const manropeDisplay = Manrope({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Solar CRM",
  description: "CRM para ventas, instalaciones y postventa de energía solar",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${manrope.variable} ${manropeDisplay.variable}`}>
      <body>
        <Sidebar />
        <main className="main-wrap">
          <div className="mobile-bar">
            <b>☀ E. Solarok</b>
            <span>Administrador</span>
          </div>
          {children}
        </main>
      </body>
    </html>
  );
}
