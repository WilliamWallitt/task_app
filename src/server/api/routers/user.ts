import {z} from "zod";
import bcrypt from "bcrypt";
import {createTRPCRouter, publicProcedure} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
    checkIfTasksUpdated: publicProcedure
        .input(z.object({
            userId: z.number()
        }))
        .query(async ({ctx, input}) => {

            const user = await ctx.db.user.findFirst({
                where: { id: input.userId },
                select: { lastSignedIn: true, id: true, role: true }
            });

            if (!user) {
                return [];
            }


            const tasks = await ctx.db.task.findMany({
                where: {
                    users: user.role !== "MASTER" ? {
                        some: {
                            userId: input.userId
                        } // User is assigned to the task
                    } : {},
                    updatedAt: {
                        gt: user.lastSignedIn // Only fetch tasks updated after last login
                    }
                },
                orderBy: {updatedAt: "desc"},
            });

            // update user sign in :)
            await ctx.db.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    lastSignedIn: new Date(Date.now())
                }
            })

            return tasks
        })
    ,
    get: publicProcedure
        .input(z.object({
            name: z.string(),
            pin: z.string()
        }))
        .query(async ({ ctx, input }) => {

            const user = await ctx.db.user.findFirst({
                where: {
                  name: input.name
                },
                include: {
                    image: true,
                    devices: true
                }
            })

            if (user === null) {
                return null
            }

            // password check
            const isMatch = await bcrypt.compare(input.pin, user.pin);

            if (!isMatch) {
                return null
            }

            await ctx.db.user.update({
                where: {
                    id: user.id
                },
                data: {
                    lastSignedIn: new Date(Date.now()),
                }
            })

            return {
                ...user,
                image: user.image
                    ? { id: user.image.id, image: user.image.image?.toString("base64") || undefined }
                    : null
            }
        }),
    getAll: publicProcedure
        .input(z.object({
            userId: z.number()
        }).optional())
        .query(async ({ctx, input}) => {

            if (input) {
                const user = await ctx.db.user.findFirst({
                    where: {
                        id: input.userId
                    }
                })
                if (user?.role === "MASTER") {
                    const users = await ctx.db.user.findMany({
                        include: {
                            image: true,
                            devices: true
                        }
                    })
                    return users.map(u => ({
                        ...u,
                        image: u.image
                            ? { id: u.image.id, image: u.image.image?.toString("base64") || undefined }
                            : null
                    }))
                }
            }

            let users = await ctx.db.user.findMany({
                include: {
                    image: true,
                    devices: true
                }
            })
            return users.map(u => ({
                ...u,
                image: u.image
                    ? { id: u.image.id, image: u.image.image?.toString("base64") || undefined }
                    : null
            }))
        }),
    add: publicProcedure
        .input(z.object({
            name: z.string(),
            pin: z.string(),
            avatar: z.string().optional(),
            email: z.string(),
            level: z.number(),
            role: z.string(),

            codingStyle: z.string(),
            learningGoals: z.string(),
            objective: z.string(),
            personalityType: z.string().nullable(),
            preferredDifficulty: z.string(),
            preferredTopics: z.string(),
            pythonVersion: z.string(),
            riskTolerance: z.string().nullable(),
            strengths: z.string(),
            taskTypePreference: z.string(),
            timePerTaskMinutes: z.number().nullable(),
            weaknesses: z.string(),
            prefersCodeQuality: z.boolean()
        })).mutation(async ({ctx, input}) => {

            const hashedPin = await bcrypt.hash(input.pin, 10); // Hash the PIN

            const user = await ctx.db.user.create({
                data: {
                    name: input.name,
                    pin: hashedPin,
                    avatar: input.avatar,
                    email: input.email,
                    level: input.level,
                    role: input.role,
                    createdAt: new Date(Date.now()),

                    codingStyle: input.codingStyle,
                    learningGoals: input.learningGoals,
                    objective: input.objective,
                    personalityType: input.personalityType,
                    preferredDifficulty: input.preferredDifficulty,
                    preferredTopics: input.preferredTopics,
                    pythonVersion: input.pythonVersion,
                    riskTolerance: input.riskTolerance,
                    strengths: input.strengths,
                    taskTypePreference: input.taskTypePreference,
                    timePerTaskMinutes: input.timePerTaskMinutes,
                    weaknesses: input.weaknesses,
                    prefersCodeQuality: input.prefersCodeQuality
                },
                include: {
                    image: true,
                    devices: true
                }
            })

            const tasks = await ctx.db.task.findMany({
                where: {
                    difficulty: input.level === 0 ? {
                        lte: 3
                    } : input.level === 1 ? {
                        lte: 5
                    } : input.level === 2 ? {
                        lte: 7
                    } : {
                        lte: 10
                    }
                },
                select: {
                    id: true
                }
            })

            const tasksIds = tasks.map(x => x.id)

            await ctx.db.taskUser.createMany({
                data: tasksIds.map(id => (
                    {
                        taskId: id,
                        userId: user.id
                    })
                ),
            })

            return {
                ...user,
                image: user.image
                    ? { id: user.image.id, image: user.image.image?.toString("base64") || undefined }
                    : null
            }
        }),

    delete: publicProcedure
        .input(z.number()).mutation(async ({ctx, input}) => {

            await ctx.db.taskUser.deleteMany({
                where: {
                    userId: input // The ID of the user being deleted
                }
            });

            await ctx.db.hintUser.deleteMany({
                where: {
                    userId: input // The ID of the user being deleted
                }
            });
            // delete all user comments (lol)
            await ctx.db.comment.deleteMany({
                where: {
                    userId: input
                }
            })

            return ctx.db.user.delete({
                where: { id: input }
            });

        }),
    update: publicProcedure.input(
        z.object({
            id: z.number(),
            name: z.string(),
            pin: z.string(),
            avatar: z.string().optional(),
            email: z.string(),
            level: z.number().min(0).max(3),
            role: z.string(),

            codingStyle: z.string(),
            learningGoals: z.string(),
            objective: z.string(),
            personalityType: z.string().nullable(),
            preferredDifficulty: z.string(),
            preferredTopics: z.string(),
            pythonVersion: z.string(),
            riskTolerance: z.string().nullable(),
            strengths: z.string(),
            taskTypePreference: z.string(),
            timePerTaskMinutes: z.number().nullable(),
            weaknesses: z.string(),
            prefersCodeQuality: z.boolean()
        }),
    ).mutation(async ({ctx, input}) => {

        // find user
        const foundUser = await ctx.db.user.findFirstOrThrow({
            where: {
                id: input.id
            }
        })

        if (input.level !== foundUser.level) {

            // delete all tasks

            await ctx.db.taskUser.deleteMany({
                where: {
                    userId: input.id
                }
            })

            // add tasks based on level
            const tasks = await ctx.db.task.findMany({
                where: {
                    difficulty: input.level === 0 ? {
                        lte: 3
                    } : input.level === 1 ? {
                        lte: 5
                    } : input.level === 2 ? {
                        lte: 7
                    } : {
                        lte: 10
                    }
                },
                select: {
                    id: true
                }
            })

            const tasksIds = tasks.map(x => x.id)

            await ctx.db.taskUser.createMany({
                data: tasksIds.map(id => (
                    {
                        taskId: id,
                        userId: foundUser.id
                    })
                ),
            })

        }

        const hashedPin = await bcrypt.hash(input.pin, 10); // Hash the PIN

        // update user
        const user = await ctx.db.user.update({
            where: {
                id: input.id
            },
            data: {
                name: input.name,
                pin: hashedPin,
                avatar: input.avatar,
                email: input.email,
                level: input.level,
                role: input.role,

                codingStyle: input.codingStyle,
                learningGoals: input.learningGoals,
                objective: input.objective,
                personalityType: input.personalityType,
                preferredDifficulty: input.preferredDifficulty,
                preferredTopics: input.preferredTopics,
                pythonVersion: input.pythonVersion,
                riskTolerance: input.riskTolerance,
                strengths: input.strengths,
                taskTypePreference: input.taskTypePreference,
                timePerTaskMinutes: input.timePerTaskMinutes,
                weaknesses: input.weaknesses,
                prefersCodeQuality: input.prefersCodeQuality,
            },
            include: {
                image: true,
                devices: true
            }
        })



        return {
            ...user, image: user.image
                ? { id: user.image.id, image: user.image.image?.toString("base64") || undefined
            } : null
        }
    }),
    logDevice: publicProcedure
        .input(
            z.object({
                userId: z.number(),
                device: z.string(),
                location: z.string().optional(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            return ctx.db.userDevice.upsert({
                where: {
                    userId_device: {
                        userId: input.userId,
                        device: input.device,
                    },
                },
                update: {
                    lastAccess: new Date(Date.now()),
                    location: input.location,
                },
                create: {
                    userId: input.userId,
                    device: input.device,
                    location: input.location,
                    lastAccess: new Date(Date.now()),
                },
            });
        }),
});
