import { z } from "zod";

// Base schema for postId and content
const baseCommentSchema = z.object({
  postId: z.string(),
  content: z.string(),
});

// Validation for getting comments
export const getCommentsValidation = z.object({
  id: z.string(),
  limit: z.number().min(1).max(50).default(10),
  cursor: z.number().optional(),
  parentId: z.string().optional(),
});

// Save comment schema, extends baseCommentSchema
export const saveComment = baseCommentSchema;

// Save reply schema, extends baseCommentSchema and adds parentId
export const saveReply = baseCommentSchema.extend({
  parentId: z.string(),
});

// Type inference for getCommentsValidation
export type GetCommentsValidationInput = z.infer<typeof getCommentsValidation>;

// Type inference for saveComment
export type SaveCommentInput = z.infer<typeof saveComment>;

// Type inference for saveReply
export type SaveReplyInput = z.infer<typeof saveReply>;
