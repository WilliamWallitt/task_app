import {z} from "zod";

import {createTRPCRouter, publicProcedure} from "~/server/api/trpc";

export const noteRouter = createTRPCRouter({
    get: publicProcedure
        .input(z.number())
        .query(({ ctx, input }) => {
            return ctx.db.note.findMany({
                where: {
                   userId: input
                }
            })
        }),

    getLatest: publicProcedure.input(z.number()).query(async ({ ctx, input }) => {
        return ctx.db.note.findMany({
            where: {
                userId: input
            },
            orderBy: {createdAt: "desc"},
        });
    }),

    add: publicProcedure
        .input(z.object({
            note: z.string(),
            userId: z.number()
        })).mutation(async ({ctx, input}) => {
            return ctx.db.note.create({
                data: {
                    note: input.note,
                    updatedAt: new Date(Date.now()),
                    userId: input.userId
                }
            })
        }),
    delete: publicProcedure
        .input(z.number()).mutation(async ({ctx, input}) => {
            return ctx.db.note.delete({
                where: {
                    id: input
                }
            });
        }),
    deleteAll: publicProcedure.input(z.number()).mutation(async ({ctx, input}) => {
        await ctx.db.note.deleteMany({
            where: {
                userId: input
            }
        });
    }),
    update: publicProcedure.input(
        z.object({
            id: z.number(),
            note: z.string()
        }),
    ).mutation(async ({ctx, input}) => {

        return ctx.db.note.update({
            where: {
                id: input.id
            },
            data: {
                note: input.note,
                updatedAt: new Date(Date.now()),
            }
        });

    })
});
