import { prisma } from "@inf/db";
import type { IGetCommentQueryArgs } from "../interfaces/internal";
import { randomUUID } from "node:crypto";
import { Service } from "typedi";

@Service()
export class PostCommentsRepository {
    /**
     * Retrieves comments based on query parameters.
     * 
     * @param queryArgs - The query arguments for filtering comments
     * @returns A list of comments matching the criteria
     */
    async getAllComments(queryArgs: IGetCommentQueryArgs) {
        return prisma.comment.findMany(queryArgs);
    }

    /**
     * Creates a new comment or reply.
     * 
     * @param postId - The ID of the post associated with the comment
     * @param content - The content of the comment
     * @param parentId - The ID of the parent comment (null if it's a top-level comment)
     * @returns The created comment object
     */
    async createComment(postId: string, content: string, parentId: string | null) {
        return prisma.comment.create({
            data: {
                id: randomUUID(), // Generate a unique ID for the comment
                postId,
                content,
                parentId,
            }
        });
    }
}
