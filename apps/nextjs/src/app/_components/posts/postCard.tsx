import { useCallback, useMemo } from "react";
import Link from "next/link";
import type { RouterOutputs } from "@inf/api";
import { TrashIcon } from "@inf/ui";
import { Button } from "@inf/ui/button";
import Spinner from "@inf/ui/spinner";
import { Text } from "@inf/ui/text";
import { toast } from "@inf/ui/toast";
import { api } from "~/trpc/react";

interface PostCardProps {
  post: RouterOutputs["post"]["all"][number];
  viewPost?: React.MouseEventHandler<HTMLDivElement>;
}

export function PostCard({ post, viewPost }: PostCardProps) {
  const utils = api.useUtils();
  const deletePost = api.post.delete.useMutation({
    onSuccess: async () => {
      await utils.post.invalidate();
    },
    onError: (err) => {
      toast.error(
        err.data?.code === "UNAUTHORIZED"
          ? "You must be logged in to delete a post"
          : "Failed to delete post",
      );
    },
  });

  const handleDelete = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation(); // Prevents triggering `viewPost`
      deletePost.mutate({ id: post.id });
    },
    [deletePost, post.id],
  );

  const deleteButtonContent = useMemo(
    () =>
      !deletePost?.isPending ? (
        <TrashIcon width="18" height="18" />
      ) : (
        <Spinner />
      ),
    [deletePost?.isPending],
  );

  return (
    <div
      className="rounded-lg bg-white p-4 shadow transition hover:shadow-lg"
      onClick={viewPost}
    >
      <div className="flex justify-between">
        <Link href={`posts/${post.id}`} className="flex-1">
          <Text className="text-lg font-bold text-gray-800">{post.title}</Text>
        </Link>
        <Button
          size="icon"
          className="hover:border-primary hover:text-primary"
          variant="outline"
          onClick={handleDelete}
          aria-label="Delete post"
        >
          {deleteButtonContent}
        </Button>
      </div>
      <Link href={`posts/${post.id}`}>
        <Text className="mt-2 text-sm text-gray-600">{post.content}</Text>
      </Link>
    </div>
  );
}
