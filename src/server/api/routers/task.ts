import {z} from "zod";

import {createTRPCRouter, publicProcedure} from "~/server/api/trpc";
import {StatusEnum} from "~/server/api/routers/websocket";


export const taskRouter = createTRPCRouter({

    assignUserToAll: publicProcedure
        .input(z.object({
            userId: z.number()
        })).mutation(async ({ctx, input}) => {

            const tasks = await ctx.db.task.findMany({})
            const taskIds = tasks.map(x => x.id)

            const existingTaskUsers = await ctx.db.taskUser.findMany({
                where: {
                    userId: input.userId
                }
            })
            const existingTaskUserIds = existingTaskUsers.map(x => x.taskId)
            const taskIdsToUpdate = taskIds.filter(x => !existingTaskUserIds.includes(x))

            await ctx.db.taskUser.createMany({
                data: taskIdsToUpdate.map(x => ({
                    userId: input.userId,
                    taskId: x
                }))
            })

        })
    ,
    unAssignUserToAll: publicProcedure
        .input(z.object({
            userId: z.number()
        })).mutation(async ({ctx, input}) => {

            await ctx.db.taskUser.deleteMany({
                where: {
                    userId: input.userId
                }
            })

        })
    ,
    archiveAll: publicProcedure
        .input(z.object({}))
        .mutation(async ({ ctx }) => {
            await ctx.db.task.updateMany({
                data: {
                    archived: true
                }
            })
        }),
    restoreAll: publicProcedure
        .input(z.object({}))
        .mutation(async ({ ctx }) => {
            await ctx.db.task.updateMany({
                data: {
                    archived: false
                }
            })
        }),
    get: publicProcedure
        .input(
            z.object({
                userId: z.number()
            })
        )
        .query(async ({ ctx, input }) => {

            const user = await ctx.db.user.findFirst({
                where: {
                    id: input.userId
                }
            })

            if (user) {
                // update user sign in :)
                await ctx.db.user.update({
                    where: {
                        id: user.id,
                    },
                    data: {
                        lastSignedIn: new Date(Date.now())
                    }
                })

            }

            return ctx.db.task.findMany({
                where: user && user.role === "MASTER"
                    ? {} // If user is MASTER, fetch all tasks
                    : {
                        users: {
                            some: { userId: input.userId }
                        },
                        archived: false
                        },
                include: { users: true, Comment: {
                        orderBy: { createdAt: "desc" }
                    }},
            });
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

    const tasks = await ctx.db.task.findMany({
        where: user && user.role === "MASTER"
            ? {} // If user is MASTER, fetch all tasks
            : {
                users: {
                    some: { userId: input.userId }
                },
                archived: false
            },
        include: { users: true, Comment: {
                orderBy: { createdAt: "desc" }
            }},
        orderBy: { createdAt: "desc" },
    });

    return tasks ?? null;
  }),
  add: publicProcedure
      .input(
          z.object({
              task: z.string().min(10),
              userIds: z.array(z.number()).optional(),
          })
      )
      .mutation(async ({ctx, input}) => {

          return ctx.db.task.create({
              data: {
                  task: input.task,
                  answer: "",
                  attempts: 0,
                  comments: "",
                  difficulty: 0,
                  updatedAt: new Date(Date.now()),
                  users: input.userIds
                      ? {
                          create: input.userIds.map((userId) => ({
                              user: { connect: { id: userId } },
                          })),
                      }
                      : undefined,
              },
              include: { users: true, Comment: true}
          });
      }),
  update: publicProcedure
      .input(
          z.object({
            id: z.number(),
            task: z.string().min(10),
            answer: z.string(), title: z.string(),
            attempts: z.number(),
            comments: z.string(),
            completed: z.boolean(),
            status: StatusEnum,
            difficulty: z.number().max(10),
            userIds: z.array(z.number()).optional(),
              userId: z.number(),
              archive: z.boolean()
          }),
      )
      .mutation(async ({ctx, input}) => {
        let task = await ctx.db.task.findFirstOrThrow({
          where: {
            id: input.id
          },
            include: {
              users: true,
                Comment: true
            }
        })

      // Get current user IDs linked to the task
      const currentUserIds = task.users.map(user => user.userId);

      // Determine users to add and remove
      const usersToAdd = input.userIds
          ? input.userIds.filter(id => !currentUserIds.includes(id))
          : [];
      // filter current ids where id is NOT in input ids
      const usersToRemove = input.userIds
          ? currentUserIds.filter(id => !input.userIds?.includes(id))
          : currentUserIds;

          // Remove users explicitly using taskUser model
          await ctx.db.taskUser.deleteMany({
              where: {
                  taskId: task.id,
                  userId: { in: usersToRemove }
              }
          });

          return ctx.db.task.update({
              where: {
                  id: task.id
              },
              data: {
                  task: input.task,
                  answer: input.answer,
                  attempts: task.answer !== input.answer ? input.attempts + 1 : input.attempts,
                  comments: input.comments,
                  completed: input.completed,
                  status: input.completed
                      ? "COMPLETED"
                      : input.status === "FAILED"
                          ? "FAILED"
                          : input.answer.length === 0
                              ? "DRAFT"
                              : "IN_PROGRESS",
                  updatedAt: new Date(),
                  difficulty: input.difficulty,
                  users: {
                      create: usersToAdd.map((userId) => ({
                          user: {connect: {id: userId}},
                      }))
                  },
                  title: input.title,
                  archived: input.archive
              },
              include: { users: true, Comment: {
                      orderBy: { createdAt: "desc" }
                  }},
          });
      }),
    delete: publicProcedure
        .input(z.number())
        .mutation(async ({ctx, input}) => {

            await ctx.db.comment.deleteMany({
                where: {
                    taskId: input,
                }
            });
            // Remove users explicitly using taskUser model
            await ctx.db.taskUser.deleteMany({
                where: {
                    taskId: input,
                }
            });

            return ctx.db.task.delete({
                where: {
                    id: input
                }
            })
        }),
    deleteAll: publicProcedure
        .mutation(async ({ctx}) => {
            await ctx.db.comment.deleteMany({})
            await ctx.db.taskUser.deleteMany({})
            await ctx.db.task.deleteMany({})
        }),
    deleteForUser: publicProcedure
        .input(z.object({
            userId: z.number(),
            taskId: z.number()
        }))
        .mutation(async ({ ctx, input }) => {

            // Remove users explicitly using taskUser model
            await ctx.db.taskUser.deleteMany({
                where: {
                    taskId: input.taskId,
                    userId: input.userId
                }
            });
        }),

  deleteAllForUser: publicProcedure.input(z.number()).mutation(async ({ctx, input}) => {

      // Remove users explicitly using taskUser model
      await ctx.db.taskUser.deleteMany({
          where: {
              userId: input
          }
      });
  }),
    // Add Comment
    addComment: publicProcedure
        .input(
            z.object({
                taskId: z.number(),
                userId: z.number(),
                text: z.string().min(1),
            })
        )
        .mutation(async ({ ctx, input }) => {
            return ctx.db.comment.create({
                data: {
                    text: input.text,
                    createdAt: new Date(Date.now()),
                    updatedAt: new Date(Date.now()),
                    task: { connect: { id: input.taskId } },
                    user: { connect: { id: input.userId } },
                },
            });
        }),
    updateComment: publicProcedure
        .input(
            z.object({
                id: z.number(),
                text: z.string().min(1),
            })
        )
        .mutation(async ({ ctx, input }) => {
            return ctx.db.comment.update({
                where: {
                    id: input.id
                },
                data: {
                    text: input.text,
                    updatedAt: new Date(Date.now()),
                },
            });
        }),
    deleteComment: publicProcedure
        .input(
            z.object({
                id: z.number(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            return ctx.db.comment.delete({
                where: {
                    id: input.id
                }
            });
        }),
    migrateComments: publicProcedure.input(z.number())
        .mutation(async ({ctx, input}) => {
        // not empty comments

        const comments = await ctx.db.task.findMany({
            where: {
                comments: {
                    not: ""
                }
            },
            include: {
                Comment: {
                    where: {
                        userId: {
                            not: input
                        }
                    }
                }
            }
        })

        await ctx.db.comment.createMany({
            data: comments.map(x => ({
                text: x.comments,
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
                taskId: x.id ,
                userId: input
            }))
        })

    })
});
