import { randomUUID } from "node:crypto";
import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";
import { prisma } from "@inf/db";
import { protectedProcedure, publicProcedure } from "../trpc";

export const postRouter = {
  all: publicProcedure.query(async ({ ctx }) => {
    const posts = await prisma.post.findMany();
    return posts;
  }),

  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const post = await prisma.post.findFirst({
        where: {
          id: input.id
        }
      });
      return post;
    }),

  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
        author_id: z.string(),
    })
    )
    .mutation(async ({ ctx, input }) => {
      const post = await prisma.post.create({
        data: {
          id: randomUUID(),
          ...input,
        }
      })
      return post;
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        content: z.string(),
        author_id: z.string(),
    })
    )
    .mutation(async ({ ctx, input }) => {

      const post = await prisma.post.update({
        where: {
          id: input.id
        },
        data: {
          title: input.title,
          content: input.content,
          author_id: input.author_id,
        }
      });

      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (!post) {
        throw new Error('Post not found'); // Throw an error if no post is updated
      }

      return post;
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const post = await prisma.post.findUnique({
        where: {
          id: input.id, // Find the post by id
        },
      });

      if (!post) {
        throw new Error("Post not found"); // Throw an error if no post is found
      }

      await prisma.post.delete({
        where: {
          id: input.id, // Delete the post by id
        },
      });
      return post;
    }),
} satisfies TRPCRouterRecord;
