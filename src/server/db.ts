import { PrismaClient as SQLiteClient } from '../../prisma/generated/client1'; // Import SQLite Prisma client
import { PrismaClient as MySQLClient } from '../../prisma/generated/client2'; // Import MySQL Prisma client

import { env } from "~/env";

const createPrismaClient = () => {
    // const isProduction = env.NODE_ENV === "production";
    const isProduction = env.DATABASE_URL !== 'file:./dev.db'

    // Use MySQL client in production, SQLite client in development
    return isProduction ? new MySQLClient({
        log: ["error"], // Log errors in production
    }) : new SQLiteClient({
        log: ["query", "error", "warn"], // Log queries, errors, and warnings in development
    });
};

const globalForPrisma = globalThis as unknown as {
    prisma: SQLiteClient | MySQLClient | undefined;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;
