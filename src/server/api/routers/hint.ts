import {z} from "zod";

import {createTRPCRouter, publicProcedure} from "~/server/api/trpc";
import {Simulate} from "react-dom/test-utils";
import input = Simulate.input;

export const hintRouter = createTRPCRouter({

    assignUserToAll: publicProcedure
        .input(z.object({
            userId: z.number()
        })).mutation(async ({ctx, input}) => {

            const hints = await ctx.db.hint.findMany({})
            const hintIds = hints.map(x => x.id)

            const existingHintUsers = await ctx.db.hintUser.findMany({
                where: {
                    userId: input.userId
                }
            })
            const existingHintUserIds = existingHintUsers.map(x => x.hintId)
            const hintIdsToUpdate = hintIds.filter(x => !existingHintUserIds.includes(x))

            await ctx.db.hintUser.createMany({
                data: hintIdsToUpdate.map(x => ({
                    userId: input.userId,
                    hintId: x
                }))
            })

        })
    ,
    unAssignUserToAll: publicProcedure
        .input(z.object({
            userId: z.number()
        })).mutation(async ({ctx, input}) => {

            await ctx.db.hintUser.deleteMany({
                where: {
                    userId: input.userId
                }
            })

        })
    ,
    get: publicProcedure
        .input(z.object({
            userId: z.number()
        }))
        .query(async ({ ctx, input }) => {

            const user = await ctx.db.user.findFirst({
                where: {
                    id: input.userId
                }
            })

            return ctx.db.hint.findMany({
                where: user && user.role === "MASTER"
                    ? {} // If user is MASTER, fetch all tasks
                    : {
                        users: {
                            some: { userId: input.userId }
                        }
                    },
                include: {
                    bullets: true,
                    users: true
                }
            })
        }),

    getLatest: publicProcedure.input(
        z.object({
            userId: z.number()
        })
    ).query(async ({ ctx, input }) => {

        const user = await ctx.db.user.findFirst({
            where: {
                id: input.userId
            }
        })

        return ctx.db.hint.findMany({
            where: user && user.role === "MASTER"
                ? {} // If user is MASTER, fetch all tasks
                : {
                    users: {
                        some: { userId: input.userId }
                    }
                },
            orderBy: {createdAt: "desc"},
            include: {
                bullets: true,
                users: true
            }
        });
    }),

    add: publicProcedure
        .input(z.object({
            hint: z.string().min(4),
            userIds: z.array(z.number()).optional()
        })).mutation(async ({ctx, input}) => {
            return ctx.db.hint.create({
                data: {
                    hint: input.hint,
                    users: input.userIds
                        ? {
                            create: input.userIds.map((userId) => ({
                                user: { connect: { id: userId } },
                            })),
                        }
                        : undefined,
                },
                include: {
                    bullets: true,
                    users: true
                }
            })
        }),

    delete: publicProcedure
        .input(z.number()).mutation(async ({ctx, input}) => {

            await ctx.db.hintUser.deleteMany({
                where: {
                    hintId: input
                }
            })

            // delete hint bullets
            const _ = await ctx.db.hint_Bullet.deleteMany({
                where: {
                    hintId: input
                }
            })
            // delete hint
            return ctx.db.hint.delete({
                where: {
                    id: input,
                }
            });
        }),

    deleteAll: publicProcedure.mutation(async ({ctx}) => {
        await ctx.db.hintUser.deleteMany({})
        await ctx.db.hint_Bullet.deleteMany({})
        await ctx.db.hint.deleteMany({});
    }),
    update: publicProcedure.input(
        z.object({
            id: z.number(),
            hint: z.string().min(4),
            userIds: z.array(z.number()).optional()
        }),
    ).mutation(async ({ctx, input}) => {

        const hint = await ctx.db.hint.findFirstOrThrow({
            where: {
                id: input.id
            },
            include: {
                users: true
            }
        })

        // Get current user IDs linked to the task
        const currentUserIds = hint.users.map(user => user.userId);

        // Determine users to add and remove
        const usersToAdd = input.userIds
            ? input.userIds.filter(id => !currentUserIds.includes(id))
            : [];
        const usersToRemove = input.userIds
            ? currentUserIds.filter(id => !input.userIds?.includes(id))
            : currentUserIds;

        // Remove users explicitly using taskUser model
        await ctx.db.hintUser.deleteMany({
            where: {
                hintId: hint.id,
                userId: { in: usersToRemove }
            }
        });

        return ctx.db.hint.update({
            where: {
                id: input.id
            },
            data: {
                hint: input.hint,
                users: {
                    create: usersToAdd.map((userId) => ({
                        user: { connect: { id: userId } },
                    }))
                }
            },
            include: {
                users: true,
                bullets: true
            }
        })
    }),
    deleteForUser: publicProcedure
        .input(z.object({
            userId: z.number(),
            hintId: z.number()
        }))
        .mutation(async ({ ctx, input }) => {
            // disconnect user from task

            await ctx.db.hintUser.delete({
                where: {
                    hintId_userId: {
                        userId: input.userId,
                        hintId: input.hintId
                    }
                }
            });
        }),

    deleteAllForUser: publicProcedure.input(z.number()).mutation(async ({ctx, input}) => {

        // Remove the user from shared tasks
        await ctx.db.hintUser.deleteMany({
            where: {
                userId: input
            }
        });
    })
});
