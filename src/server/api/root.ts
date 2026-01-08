import { taskRouter } from "~/server/api/routers/task";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import {hintRouter} from "~/server/api/routers/hint";
import {hintBulletRouter} from "~/server/api/routers/hint_bullet";
import {userRouter} from "~/server/api/routers/user";
import {noteRouter} from "~/server/api/routers/note";
import {imageRouter} from "~/server/api/routers/image";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */

export const appRouter = createTRPCRouter({
  task: taskRouter,
  hint: hintRouter,
  hintBullet: hintBulletRouter,
  user: userRouter,
  note: noteRouter,
  image: imageRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
