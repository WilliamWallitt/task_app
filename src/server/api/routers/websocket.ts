import { EventEmitter } from 'events';
import { initTRPC } from '@trpc/server';
import { observable } from '@trpc/server/observable';
import { z } from 'zod';
import {Task} from "@prisma/client";
import {createTRPCRouter, publicProcedure} from "~/server/api/trpc";
import {appRouter} from "~/server/api/root";
import superjson from "superjson";

// create a global event emitter (could be replaced by redis)
const ee = new EventEmitter();

const t = initTRPC.create({
    transformer: superjson
});

const StatusEnum = z.enum(['DRAFT', 'IN_PROGRESS', 'COMPLETED', 'FAILED']);


export const websocketRouter = t.router({
    onAdd: publicProcedure.subscription(() => {
        // return an `observable` with a callback which is triggered immediately
        return observable<Task>((emit) => {
            const onAdd = (data: Task) => {
                // emit data to client
                emit.next(data);
            };

            // trigger `onAdd()` when `add` is triggered in our event emitter
            ee.on('add', onAdd);

            // unsubscribe function when client disconnects or stops subscribing
            return () => {
                ee.off('add', onAdd);
            };
        });
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
                },
            })
            ee.emit('add', task);
            return task
        }),
    onUpdate: publicProcedure.subscription(() => {
        // return an `observable` with a callback which is triggered immediately
        return observable<Task>((emit) => {
            const onAdd = (data: Task) => {
                // emit data to client
                emit.next(data);
            };

            // trigger `onAdd()` when `add` is triggered in our event emitter
            ee.on('update', onAdd);

            // unsubscribe function when client disconnects or stops subscribing
            return () => {
                ee.off('update', onAdd);
            };
        });
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
            ee.emit('update', updatedTask);
            return updatedTask
        }),
    onDelete: publicProcedure.subscription(() => {
        // return an `observable` with a callback which is triggered immediately
        return observable<Task>((emit) => {
            const onDelete = (data: Task) => {
                // emit data to client
                emit.next(data);
            };

            // trigger `onAdd()` when `add` is triggered in our event emitter
            ee.on('delete', onDelete);

            // unsubscribe function when client disconnects or stops subscribing
            return () => {
                ee.off('delete', onDelete);
            };
        });
    }),
    delete: publicProcedure.input(z.number())
        .mutation(async ({ ctx, input }) => {
            const task = await ctx.db.task.delete({
                where: {
                    id: input
                }
            })
            ee.emit('delete', task)
            return task
        }),
});

export type WSRouter = typeof websocketRouter;
