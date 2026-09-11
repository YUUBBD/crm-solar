import { prisma } from "@/lib/prisma"; import { ok } from "../_utils";
export async function GET(){return ok(await prisma.user.findMany({where:{active:true},orderBy:{name:"asc"},select:{id:true,name:true,email:true,role:true,phone:true}}));}
