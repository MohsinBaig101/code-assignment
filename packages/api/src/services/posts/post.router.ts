// /packages/services/posts/post.router.ts

import { publicProcedure, protectedProcedure } from "../../trpc";
import { z } from "zod";
import { PostService } from "./post.service";
import { Container } from '../../lib/dContainer';  // Import the DI container

const postService = Container.get(PostService);

export const postRouter = {
    all: publicProcedure.query(async () => {
        return postService.getAllPosts();
    }),

    byId: publicProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ input }) => {
            return postService.getPostById(input.id);
        }),

    create: protectedProcedure
        .input(
            z.object({
                title: z.string(),
                content: z.string(),
                author_id: z.string(),
            })
        )
        .mutation(async ({ input }) => {
            return postService.createPost(input.title, input.content, input.author_id);
        }),

    update: protectedProcedure
        .input(
            z.object({
                id: z.string(),
                title: z.string(),
                content: z.string(),
            })
        )
        .mutation(async ({ input }) => {
            return postService.updatePost(input.id, input.title, input.content);
        }),

    delete: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ input }) => {
            return postService.deletePost(input.id);
        }),
};
