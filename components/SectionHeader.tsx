import { ReactNode } from "react";
export function SectionHeader({title,subtitle,action}:{title:string;subtitle?:string;action?:ReactNode}){return <div className="section-head"><div><h1>{title}</h1>{subtitle&&<p>{subtitle}</p>}</div>{action}</div>}
