import {z} from "zod";

import {createTRPCRouter, publicProcedure} from "~/server/api/trpc";

export const hintBulletRouter = createTRPCRouter({
    add: publicProcedure
        .input(z.object({
            bullet: z.string(),
            hintId: z.number()
        })).mutation(async ({ctx, input}) => {
            return ctx.db.hint_Bullet.create({
                data: {
                    bullet: input.bullet,
                    hintId: input.hintId
                }
            });
        }),

    delete: publicProcedure
        .input(z.number()).mutation(async ({ctx, input}) => {
            return ctx.db.hint_Bullet.delete({
                where: {
                    id: input,
                }
            });
        }),
    deleteAll: publicProcedure.mutation(async ({ctx}) => {
        await ctx.db.hint_Bullet.deleteMany({});
    }),
    update: publicProcedure.input(
        z.object({
            id: z.number(),
            bullet: z.string()
        }),
    ).mutation(async ({ctx, input}) => {
        return ctx.db.hint_Bullet.update({
            where: {
                id: input.id
            },
            data: {
                bullet: input.bullet
            }
        });
    })
});
