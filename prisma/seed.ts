import { PrismaClient, LeadStage, ProjectStatus, Role, TaskStatus } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.projectMaterial.deleteMany();
  await prisma.quoteItem.deleteMany();
  await prisma.quote.deleteMany();
  await prisma.serviceTicket.deleteMany();
  await prisma.travel.deleteMany();
  await prisma.expense.deleteMany();
  await prisma.task.deleteMany();
  await prisma.technicalVisit.deleteMany();
  await prisma.lead.deleteMany();
  await prisma.project.deleteMany();
  await prisma.product.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.user.deleteMany();

  const admin = await prisma.user.create({ data: { name: "Administrador", email: "admin@solarcrm.local", role: Role.ADMIN, phone: "3764000000" } });
  const sales = await prisma.user.create({ data: { name: "Ventas Solar", email: "ventas@solarcrm.local", role: Role.SALES } });
  const tech = await prisma.user.create({ data: { name: "Técnico Solar", email: "tecnico@solarcrm.local", role: Role.TECHNICIAN } });

  const customer1 = await prisma.customer.create({ data: { name: "Juan Pérez", phone: "3764001111", whatsapp: "3764001111", email: "juan@email.com", address: "Av. Uruguay 1234", city: "Posadas", province: "Misiones", customerType: "Residencial", monthlyKwh: 420, connection: "Monofásica", notes: "Busca reducir dependencia de la red." } });
  const customer2 = await prisma.customer.create({ data: { name: "Comercial Norte SRL", company: "Comercial Norte SRL", phone: "3764002222", email: "compras@comercialnorte.com", address: "Ruta 12 km 7", city: "Garupá", province: "Misiones", customerType: "Comercial", monthlyKwh: 1800, connection: "Trifásica" } });

  const lead1 = await prisma.lead.create({ data: { customerId: customer1.id, title: "Sistema residencial 5 kW", stage: LeadStage.QUOTE, estimatedKw: 5, amount: 5200000, source: "WhatsApp", ownerId: sales.id, notes: "Cotización enviada." } });
  const lead2 = await prisma.lead.create({ data: { customerId: customer2.id, title: "Sistema comercial 20 kW", stage: LeadStage.QUALIFIED, estimatedKw: 20, amount: 18500000, source: "Referido", ownerId: sales.id } });

  const project = await prisma.project.create({ data: { customerId: customer1.id, ownerId: tech.id, name: "Instalación Juan Pérez - 5 kW", status: ProjectStatus.SCHEDULED, scheduledAt: new Date(Date.now() + 5*86400000), installedKw: 5, address: "Av. Uruguay 1234, Posadas", warrantyUntil: new Date(Date.now() + 5*365*86400000) } });

  const panel = await prisma.product.create({ data: { name: "Panel solar 550W", category: "Paneles", sku: "PAN-550", stock: 24, reserved: 4, minStock: 8, unit: "unidad", unitCost: 190000 } });
  const inverter = await prisma.product.create({ data: { name: "Inversor híbrido 5kW", category: "Inversores", sku: "INV-5K", stock: 6, reserved: 1, minStock: 2, unit: "unidad", unitCost: 1250000 } });
  await prisma.product.create({ data: { name: "Estructura aluminio", category: "Estructuras", sku: "EST-01", stock: 15, minStock: 4, unit: "kit", unitCost: 240000 } });

  await prisma.projectMaterial.createMany({ data: [ { projectId: project.id, productId: panel.id, quantity: 10 }, { projectId: project.id, productId: inverter.id, quantity: 1 } ] });

  await prisma.task.create({ data: { customerId: customer1.id, ownerId: sales.id, title: "Llamar para confirmar cotización", dueAt: new Date(Date.now() + 86400000), priority: "HIGH", status: TaskStatus.PENDING } });
  await prisma.task.create({ data: { customerId: customer2.id, ownerId: sales.id, title: "Coordinar visita técnica", dueAt: new Date(Date.now() + 2*86400000), priority: "MEDIUM", status: TaskStatus.PENDING } });
  await prisma.task.create({ data: { ownerId: admin.id, title: "Revisar stock de inversores", dueAt: new Date(), priority: "LOW", status: TaskStatus.DONE } });

  await prisma.technicalVisit.create({ data: { customerId: customer1.id, scheduledAt: new Date(Date.now() - 2*86400000), roofType: "Chapa", shading: "Baja", phase: "Monofásica", panelArea: 28, inverterLocation: "Garaje", notes: "Techo apto para 10 paneles." } });

  const quote = await prisma.quote.create({ data: { leadId: lead1.id, customerId: customer1.id, number: "PRES-0001", subtotal: 4300000, installation: 700000, travel: 200000, discount: 0, total: 5200000, status: "SENT", validUntil: new Date(Date.now()+15*86400000), notes: "Incluye instalación y puesta en marcha.", items: { create: [ { name: "Panel solar 550W", quantity: 10, unitPrice: 190000 }, { name: "Inversor híbrido 5kW", quantity: 1, unitPrice: 1250000 }, { name: "Estructura y protecciones", quantity: 1, unitPrice: 1150000 } ] } } });
  console.log(`Seed OK: ${quote.number}, leads ${lead1.id}/${lead2.id}`);
}
main().finally(() => prisma.$disconnect());
