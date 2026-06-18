import { z } from "zod/mini";

export const BlogSchema =z.object({
    title: z.string(),
    content: z.string(),
    authId: z.string(),
});

export type BlogType = z.infer<typeof BlogSchema>;