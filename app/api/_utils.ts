import { NextResponse } from "next/server";
export function ok(data: unknown, status=200){ return NextResponse.json(data,{status}); }
export function fail(message:string,status=400){ return NextResponse.json({error:message},{status}); }
export function num(v:any){ const n=Number(v); return Number.isFinite(n)?n:undefined; }
export function date(v:any){ if(!v) return undefined; const d=new Date(v); return Number.isNaN(d.getTime())?undefined:d; }
