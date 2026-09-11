"use client";
import Link from "next/link"; import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, KanbanSquare, CheckSquare, Wrench, FolderKanban, Package, FileText, LifeBuoy, Route, Receipt, Settings, Sun, Map } from "lucide-react";
const items=[
 ["Inicio","/",LayoutDashboard],["Clientes","/clientes",Users],["Mapa","/mapa",Map],["Ventas","/ventas",KanbanSquare],["Seguimientos","/seguimientos",CheckSquare],["Visitas técnicas","/visitas",Wrench],["Presupuestos","/presupuestos",FileText],["Instalaciones","/instalaciones",FolderKanban],["Inventario","/inventario",Package],["Postventa","/postventa",LifeBuoy],["Viajes","/viajes",Route],["Gastos","/gastos",Receipt],["Configuración","/configuracion",Settings]
] as const;
export function Sidebar(){const path=usePathname();return <aside className="sidebar"><div className="brand"><div className="brand-icon"><Sun size={21}/></div><div><b>Solar CRM</b><span>Gestión integral</span></div></div><nav>{items.map(([label,href,Icon])=><Link key={href} href={href} className={path===href?"nav-item active":"nav-item"}><Icon size={18}/><span>{label}</span></Link>)}</nav><div className="side-footer"><div className="avatar">A</div><div><b>Administrador</b><span>Acceso completo</span></div></div></aside>}
