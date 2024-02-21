
import { z } from "zod"
import { TaskType } from "./definitions";


export const TaskSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    createdAt: z.string().transform((dateStr) => new Date(dateStr)),
    status: z.nativeEnum(TaskType),
})

export const PaginationTaskSchema = z.object({
    tasks: z.array(TaskSchema),
    pageNumber: z.number(),
    totalPages: z.number(),
})
