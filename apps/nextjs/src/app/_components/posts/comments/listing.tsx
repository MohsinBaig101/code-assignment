/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import React, { useCallback, useMemo } from "react";
import { z } from "zod";

import { Button } from "@inf/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  useForm,
} from "@inf/ui/form";
import Spinner from "@inf/ui/spinner";
import { TextArea } from "@inf/ui/textarea";
import { toast } from "@inf/ui/toast";

import { api } from "~/trpc/react";
import Comment from "./commentItem";

type PostWithCommentsProps = {
  postId: string;
};

export default function CommentsListing({ postId }: PostWithCommentsProps) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = api.comment.all.useInfiniteQuery(
    { id: postId, limit: 3 },
    { getNextPageParam: (lastPage) => lastPage?.nextCursor },
  );

  const utils = api.useUtils();

  const form = useForm({
    schema: z.object({
      content: z.string().min(1, "Comment is required"),
    }),
    defaultValues: { content: "" },
  });

  const createComment = api.comment.save.useMutation({
    onSuccess: async () => {
      form.reset();
      await utils.comment.invalidate();
    },
    onError: () => toast.error("Failed to create comment. Please try again."),
  });

  const handleAddComment = useCallback(
    (data: { content: string }) =>
      createComment.mutate({ content: data.content, postId }),
    [createComment, postId],
  );

  const renderComments = useMemo(
    () =>
      data?.pages.flatMap((page) =>
        page?.items.map((comment) => (
          <Comment
            key={comment.id}
            id={comment.id}
            postId={comment.postId}
            content={comment.content}
            repliesCount={comment._count.replies}
          />
        )),
      ),
    [data],
  );

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold">Comments</h3>

      <div className="mt-4 space-y-4">
        {isLoading ? (
          <Spinner size={22} />
        ) : isError ? (
          <p className="text-red-500">Failed to load comments.</p>
        ) : (
          renderComments
        )}
        {isFetchingNextPage && <Spinner size={22} />}
      </div>

      {hasNextPage && (
        <div className="mt-5 flex justify-center">
          <Button type="button" onClick={() => fetchNextPage()}>
            Load More
          </Button>
        </div>
      )}

      <div className="mt-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleAddComment)}>
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <TextArea
                      {...field}
                      rows={4}
                      placeholder="Write a comment..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <button
              type="submit"
              className="mt-2 flex items-center rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              disabled={createComment.isPending}
            >
              Add Comment
              {createComment.isPending && <Spinner className="ml-2" />}
            </button>
          </form>
        </Form>
      </div>
    </div>
  );
}
