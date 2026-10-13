import { PrismaClient } from "@prisma/client";

const env = process.env as Record<string, string | undefined>;
const databaseUrl = env["DATABASE_URL"] ?? env["CRM_PRISMA_DATABASE_URL"] ?? env["CRM_POSTGRES_URL"] ?? env["CRM_DATABASE_URL"];
if (databaseUrl && !env["DATABASE_URL"]) env["DATABASE_URL"] = databaseUrl;
if (databaseUrl && !env["DIRECT_URL"]) env["DIRECT_URL"] = databaseUrl;

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

const prismaOptions = databaseUrl ? { datasources: { db: { url: databaseUrl } } } : undefined;
export const prisma = globalForPrisma.prisma ?? new PrismaClient(prismaOptions);
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

