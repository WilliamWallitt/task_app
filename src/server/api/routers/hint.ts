import {z} from "zod";

import {createTRPCRouter, publicProcedure} from "~/server/api/trpc";

export const hintRouter = createTRPCRouter({
    get: publicProcedure
        .query(({ ctx }) => {
            return ctx.db.hint.findMany({
                include: {
                    bullets: true
                }
            })
        }),

    getLatest: publicProcedure.query(async ({ ctx }) => {
        return ctx.db.hint.findMany({
            orderBy: {createdAt: "desc"},
            include: {
                bullets: true
            }
        });
    }),

    add: publicProcedure
        .input(z.object({
            hint: z.string().min(10)
        })).mutation(async ({ctx, input}) => {
            return ctx.db.hint.create({
                data: {
                    hint: input.hint,
                },
                include: {
                    bullets: true
                }
            })
        }),

    delete: publicProcedure
        .input(z.number()).mutation(async ({ctx, input}) => {

            const _ = await ctx.db.hint_Bullet.deleteMany({
                where: {
                    hintId: input
                }
            })

            return ctx.db.hint.delete({
                where: {
                    id: input,
                }
            });
        })
});
