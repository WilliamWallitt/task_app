import {z} from "zod";
import { IncomingForm } from "formidable";
import fs from "fs";
import path from "path";

import {createTRPCRouter, publicProcedure} from "~/server/api/trpc";

export const imageRouter = createTRPCRouter({
    getAll: publicProcedure
        .query(async ({ctx}) => {
            let images = await ctx.db.image.findMany({})
            return images.map(x => ({
                id: x.id,
                image: x.image ? x.image.toString("base64") : ""
            }))
        }),
    deleteImage: publicProcedure
        .input(z.object({
            id: z.number()
        }))
        .mutation(async ({ctx, input}) => {

            const foundImage = await ctx.db.image.findFirstOrThrow({
                where: {
                    id: input.id
                }
            })

            // delete user images as well
            await ctx.db.user.updateMany({
                where: {
                    imageId: input.id
                },
                data: {
                    imageId: null
                }
            })

            const deletedImage = await ctx.db.image.delete({
                where: {
                    id: input.id
                }
            })


            return deletedImage.id
        }),
    upload: publicProcedure.input(z.object({
        image: z.string()
    })).mutation(async ({ctx, input}) => {
        const imageBuffer = Buffer.from(input.image, "base64"); // Convert Base64 to Binary
        let image = await ctx.db.image.create({
            data: {
                image: imageBuffer
            }
        });

        if (image.image === null) return null

        return {
            id: image.id,
            image: image.image.toString("base64")
        }


    }),
    uploadAvatar: publicProcedure
        .input(z.object({ userId: z.number(), imageId: z.number().optional(), image: z.string().optional() })) // Base64 string
        .mutation(async ({ ctx, input }) => {

            let imageId: number

            if (input.imageId) {
                const image = await ctx.db.image.findFirstOrThrow({
                    where: {
                        id: input.imageId
                    }
                })
                imageId = image.id
            } else if (input.image) {
                const imageBuffer = Buffer.from(input.image, "base64"); // Convert Base64 to Binary
                const image = await ctx.db.image.create({
                    data: {
                        image: imageBuffer
                    },
                })
                imageId = image.id
            } else {

                return null
            }

            const user = await ctx.db.user.update({
                where: {
                    id: input.userId
                },
                data: {
                    imageId: imageId
                },
                include: {
                    image: true,
                    devices: true
                },
            });

            return {
                ...user,
                image: user.image
                    ? { id: user.image.id, image: user.image.image?.toString("base64") || undefined }
                    : null
            }
        }),
    // TODO - are we gonna use this??
    getAvatar: publicProcedure
        .input(z.object({ userId: z.number() }))
        .query(async ({ ctx, input }) => {
            const user = await ctx.db.user.findUnique({
                where: { id: input.userId },
                select: { image: true },
            });

            if (!user || !user.image || !user.image.image) return null;

            return user.image.image.toString("base64"); // Convert Binary to Base64
        }),
})