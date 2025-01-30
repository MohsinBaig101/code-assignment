import { z } from "zod";

// Base schema for common post fields
const basePostSchema = z.object({
    title: z.string(),
    content: z.string(),
    author_id: z.string(),
});

// Schema for post by ID
export const postByIdInput = z.object({ id: z.string() });

// Schema for post creation (uses base schema)
export const postCreationInput = basePostSchema;

// Schema for post update (extends base schema and adds id)
export const postUpdateInput = basePostSchema.extend({
    id: z.string(),
});

// Type inference for post creation input
export type PostCreationInput = z.infer<typeof postCreationInput>;

// Type inference for post update input
export type PostUpdateInput = z.infer<typeof postUpdateInput>;

// Type inference for post by ID input
export type PostByIdInput = z.infer<typeof postByIdInput>;
