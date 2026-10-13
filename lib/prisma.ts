import { PrismaClient } from "@prisma/client";

const env = process.env as Record<string, string | undefined>;
const databaseUrl = [
  env["DATABASE_URL"],
  env["CRM_PRISMA_DATABASE_URL"],
  env["CRM_POSTGRES_URL"],
  env["CRM_DATABASE_URL"],
].find((value) => typeof value === "string" && value.trim().length > 0);

if (databaseUrl) {
  process.env.DATABASE_URL = databaseUrl;
  if (!env["DIRECT_URL"]?.trim()) process.env.DIRECT_URL = databaseUrl;
}

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
  prismaDatabaseUrl?: string;
};

function getDatabaseUrl() {
  return [
    process.env.DATABASE_URL,
    process.env.CRM_PRISMA_DATABASE_URL,
    process.env.CRM_POSTGRES_URL,
    process.env.CRM_DATABASE_URL,
  ].find((value) => typeof value === "string" && value.trim().length > 0);
}

function getClient() {
  const currentUrl = getDatabaseUrl();
  if (!currentUrl) throw new Error("No hay una URL de base de datos configurada");
  if (!globalForPrisma.prisma || globalForPrisma.prismaDatabaseUrl !== currentUrl) {
    globalForPrisma.prisma = new PrismaClient({ datasourceUrl: currentUrl });
    globalForPrisma.prismaDatabaseUrl = currentUrl;
  }
  return globalForPrisma.prisma;
}

export const prisma = new Proxy({} as PrismaClient, {
  get(_target, property) {
    const value = Reflect.get(getClient(), property, getClient());
    return typeof value === "function" ? value.bind(getClient()) : value;
  },
});

