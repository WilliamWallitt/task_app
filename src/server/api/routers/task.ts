import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import {StatusEnum} from "~/server/api/routers/websocket";

export const taskRouter = createTRPCRouter({
  get: publicProcedure
    .query(({ ctx }) => {
      return ctx.db.task.findMany()
    }),

  getLatest: publicProcedure.query(async ({ ctx }) => {
    const post = await ctx.db.task.findMany({
      orderBy: { createdAt: "desc" },
    });

    return post ?? null;
  }),
  add: publicProcedure
      .input(z.string().min(10))
      .mutation(async ({ctx, input}) => {
        const task = await ctx.db.task.create({
          data: {
            task: input,
            answer: "",
            attempts: 0,
            comments: "",
            difficulty: 0
          }
        })
        return task
      }),
  update: publicProcedure
      .input(
          z.object({
            id: z.number(),
            task: z.string().min(10),
            answer: z.string(),
            attempts: z.number(),
            comments: z.string(),
            completed: z.boolean(),
            status: StatusEnum,
            difficulty: z.number().max(10)
          }),
      )
      .mutation(async ({ctx, input}) => {
        let task = await ctx.db.task.findFirstOrThrow({
          where: {
            id: input.id
          }
        })

        task = {
          ...task,
          ...input,
          status: input.completed
              ? "COMPLETED"
              : input.status === "FAILED" ? "FAILED" : input.answer.length === 0
                  ? "DRAFT"
                  : "IN_PROGRESS",
          attempts: task.answer !== input.answer
              ? input.attempts + 1
              : input.attempts,
          updatedAt: new Date(Date.now()),
          difficulty: input.difficulty
        }

        const updatedTask = await ctx.db.task.update({
          where: {
            id: task.id
          },
          data: task
        })
        return updatedTask
      }),
  delete: publicProcedure.input(z.number())
      .mutation(async ({ ctx, input }) => {
        const task = await ctx.db.task.delete({
          where: {
            id: input
          }
        })
        return task
      }),
});
