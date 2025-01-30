import { protectedProcedure, publicProcedure } from "../trpc";
import { PostCommentsService } from "../services/comment.service";
import { z } from "zod";
import { getCommentsValidation, saveComment, saveReply } from '../validations/comment.validation';
import Container from "typedi";

// Retrieve an instance of PostCommentsService from the DI container
const postCommentsService = Container.get(PostCommentsService);

export const postCommentsRouter = {
    /**
     * Fetch all comments for a specific post.
     * 
     * @param input - The input validation schema for retrieving comments.
     * @returns A list of comments for the specified post.
     */
    all: publicProcedure
        .input(getCommentsValidation)
        .query(async ({ input }) => {
            return postCommentsService.getComments(input);
        }),

    /**
     * Save a new comment on a post.
     * 
     * @param input - The input containing the post ID and comment content.
     * @returns The created comment object.
     */
    save: protectedProcedure
        .input(saveComment)
        .mutation(async ({ input }) => {
            return postCommentsService.createComment(input.postId, input.content);
        }),

    /**
     * Save a reply to an existing comment.
     * 
     * @param input - The input containing the post ID, parent comment ID, and reply content.
     * @returns The created reply object.
     */
    saveReply: protectedProcedure
        .input(saveReply)
        .mutation(async ({ input }) => {
            return postCommentsService.storeReply(input.postId, input.parentId, input.content);
        }),
};
