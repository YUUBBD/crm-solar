import { prisma } from "@/lib/prisma"; import { ok } from "../_utils";
export async function GET(){
 try {
 const [customers,leads,projects,tasks,quotes,tickets,products,revenue,openLeads] = await Promise.all([
  prisma.customer.count(), prisma.lead.count(), prisma.project.count(), prisma.task.count({where:{status:"PENDING"}}), prisma.quote.count({where:{status:{in:["SENT","ACCEPTED"]}}}), prisma.serviceTicket.count({where:{status:{not:"CLOSED"}}}), prisma.product.count(), prisma.quote.aggregate({where:{status:"ACCEPTED"},_sum:{total:true}}), prisma.lead.count({where:{stage:{notIn:["WON","LOST"]}}})
 ]);
 const pipeline=await prisma.lead.groupBy({by:["stage"],_count:{_all:true},_sum:{amount:true}});
 const recent=await prisma.customer.findMany({orderBy:{createdAt:"desc"},take:5,select:{id:true,name:true,city:true,createdAt:true}});
 return ok({counts:{customers,leads,projects,tasks,quotes,tickets,products,revenue:revenue._sum.total||0,openLeads},pipeline,recent});
 } catch (error) {
  console.error("[v0] Dashboard data load failed", error);
  return ok({error:"No se pudo conectar con la base de datos"}, 500);
 }
}
