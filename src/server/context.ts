import type {CreateWSSContextFn, CreateWSSContextFnOptions} from '@trpc/server/adapters/ws';
import {db} from "~/server/db";


export const createContext : CreateWSSContextFn<any> = async (opts: CreateWSSContextFnOptions) => {
    const token = opts.info.connectionParams?.token;
    return {
        db, // Add the Prisma client to the context
    };
}

export type Context = Awaited<ReturnType<typeof createContext>>;