"use client";

import Spinner from "@inf/ui/spinner";
import { api } from "~/trpc/react";
import { useModalContext } from "../../_context/postContext";
import { NoPosts } from "./noPosts";
import { PostCard } from "./postCard";

export function PostList() {
  const { openModal } = useModalContext();
  const { data: posts = [], isFetching, isSuccess } = api.post.all.useQuery();

  if (isFetching) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <Spinner size={30} />
      </div>
    );
  }

  if (isSuccess && posts.length === 0) {
    return <NoPosts openModal={openModal} />;
  }

  return (
    <div className="grid gap-4 p-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
