import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

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
});
