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
        })
});
