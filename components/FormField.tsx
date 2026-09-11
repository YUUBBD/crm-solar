import { ReactNode } from "react";
export function FormField({label,children}:{label:string;children:ReactNode}){return <label className="field"><span>{label}</span>{children}</label>}
export const inputClass="input";
