"use client";
import { useEffect, useMemo, useState } from "react";
import { MapPin, Search, Navigation } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";

declare global { interface Window { L: any } }

type Customer = { id:string; name:string; company?:string|null; phone?:string|null; address?:string|null; city?:string|null; province?:string|null; lat?:number|null; lng?:number|null; customerType?:string|null };

export default function Mapa() {
  const [customers,setCustomers]=useState<Customer[]>([]);
  const [q,setQ]=useState("");
  const [mapReady,setMapReady]=useState(false);
  const [selected,setSelected]=useState<Customer|null>(null);

  useEffect(()=>{
    fetch("/api/customers").then(r=>r.json()).then(setCustomers).catch(()=>setCustomers([]));
  },[]);

  useEffect(()=>{
    if (document.getElementById("leaflet-css")) { loadMap(); return; }
    const link=document.createElement("link"); link.id="leaflet-css"; link.rel="stylesheet"; link.href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"; document.head.appendChild(link);
    const script=document.createElement("script"); script.src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"; script.async=true; script.onload=loadMap; document.body.appendChild(script);
    function loadMap(){ if(window.L) setMapReady(true); }
  },[]);

  const visible=useMemo(()=>customers.filter(c=>!q || [c.name,c.company,c.city,c.province,c.address].filter(Boolean).join(" ").toLowerCase().includes(q.toLowerCase())),[customers,q]);
  const located=visible.filter(c=>Number.isFinite(c.lat) && Number.isFinite(c.lng));

  useEffect(()=>{
    if(!mapReady) return;
    const L=window.L;
    const el=document.getElementById("solar-map");
    if(!el) return;
    const map=L.map(el).setView([-27.37,-55.90],9);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'&copy; OpenStreetMap contributors'}).addTo(map);
    const bounds:any[]=[];
    located.forEach(c=>{
      const marker=L.marker([c.lat,c.lng]).addTo(map);
      marker.bindPopup(`<b>${escapeHtml(c.name)}</b><br>${escapeHtml(c.address||c.city||"Ubicación guardada")}<br><small>${escapeHtml(c.customerType||"Cliente")}</small>`);
      marker.on("click",()=>setSelected(c));
      bounds.push([c.lat,c.lng]);
    });
    if(bounds.length) map.fitBounds(bounds,{padding:[30,30],maxZoom:13});
    return ()=>map.remove();
  },[mapReady,located.map(c=>c.id+":"+c.lat+":"+c.lng).join("|")]);

  return <div className="page"><SectionHeader title="Mapa" subtitle={`${located.length} clientes ubicados · ${customers.length} clientes totales`}/><div className="map-toolbar"><div className="search" style={{position:"relative",flex:1,maxWidth:420}}><Search size={16} style={{position:"absolute",left:10,top:10,color:"#839088"}}/><input className="input" style={{paddingLeft:33}} placeholder="Buscar cliente, ciudad o dirección..." value={q} onChange={e=>setQ(e.target.value)}/></div><div className="map-stat"><MapPin size={16}/> {located.length} con ubicación</div><div className="map-stat"><Navigation size={16}/> Misiones</div></div><div className="map-layout"><div className="card map-card"><div id="solar-map" className="real-map">{!mapReady&&<div className="map-loading">Cargando mapa…</div>}</div></div><div className="card map-list"><div className="panel-title"><h2>Clientes en el mapa</h2></div>{visible.map(c=><button className={`map-client ${selected?.id===c.id?"selected":""}`} key={c.id} onClick={()=>setSelected(c)}><span className="map-client-icon"><MapPin size={15}/></span><span><b>{c.name}</b><small>{c.address||c.city||"Sin dirección"}{c.province?`, ${c.province}`:""}</small></span></button>)}{!visible.length&&<div className="empty">No hay resultados.</div>}</div></div></div>
}
function escapeHtml(v:string){return v.replace(/[&<>'"]/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;","\"":"&quot;"}[ch]!));}
