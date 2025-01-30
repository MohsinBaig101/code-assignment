import { postRouter } from "./routers/posts.router";
import { postCommentsRouter } from "./routers/comments.router";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  post: postRouter,
  comment: postCommentsRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
