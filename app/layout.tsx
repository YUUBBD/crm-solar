import "./globals.css"; import { Sidebar } from "@/components/Sidebar";
export const metadata={title:"Solar CRM",description:"CRM para ventas, instalaciones y postventa de energía solar"};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="es"><body><Sidebar/><main className="main-wrap"><div className="mobile-bar"><b>☀ Solar CRM</b><span>Administrador</span></div>{children}</main></body></html>}
