import { publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";
import { PostService } from "../services/post.service";
import { Container } from '../lib/dContainer';  // Import the DI container
import { postByIdInput, postCreationInput, postUpdateInput } from '../validations/post.validation';

// Retrieve an instance of PostService from the DI container
const postService = Container.get(PostService);

export const postRouter = {
    /**
     * Fetch all posts.
     * 
     * @returns {Promise<Array>} A list of all posts.
     */
    all: publicProcedure.query(async () => {
        return postService.getAllPosts();
    }),

    /**
     * Fetch a post by its ID.
     * 
     * @param {Object} input - The input object containing the post ID.
     * @param {string} input.id - The ID of the post to fetch.
     * @returns {Promise<Object | null>} The post object if found, otherwise null.
     */
    byId: publicProcedure
        .input(postByIdInput)
        .query(async ({ input }) => {
            return postService.getPostById(input.id);
        }),

    /**
     * Create a new post.
     * 
     * @param {Object} input - The input object containing post details.
     * @param {string} input.title - The title of the post.
     * @param {string} input.content - The content of the post.
     * @param {string} input.author_id - The ID of the author creating the post.
     * @returns {Promise<Object>} The newly created post.
     */
    create: protectedProcedure
        .input(postCreationInput)
        .mutation(async ({ input }) => {
            return postService.createPost(input.title, input.content, input.author_id);
        }),

    /**
     * Update an existing post by ID.
     * 
     * @param {Object} input - The input object containing updated post details.
     * @param {string} input.id - The ID of the post to update.
     * @param {string} input.title - The updated title of the post.
     * @param {string} input.content - The updated content of the post.
     * @returns {Promise<Object>} The updated post object.
     */
    update: protectedProcedure
        .input(postUpdateInput)
        .mutation(async ({ input }) => {
            return postService.updatePost(input.id, input.title, input.content);
        }),

    /**
     * Delete a post by ID.
     * 
     * @param {Object} input - The input object containing the post ID.
     * @param {string} input.id - The ID of the post to delete.
     * @returns {Promise<Object>} The deleted post object.
     */
    delete: protectedProcedure
        .input(postByIdInput)
        .mutation(async ({ input }) => {
            return postService.deletePost(input.id);
        }),
};
