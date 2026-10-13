import { PrismaClient } from "@prisma/client";

const databaseUrl = process.env.DATABASE_URL ?? process.env.CRM_PRISMA_DATABASE_URL ?? process.env.CRM_POSTGRES_URL ?? process.env.CRM_DATABASE_URL;
if (databaseUrl && !process.env.DATABASE_URL) process.env.DATABASE_URL = databaseUrl;
if (databaseUrl && !process.env.DIRECT_URL) process.env.DIRECT_URL = databaseUrl;

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

