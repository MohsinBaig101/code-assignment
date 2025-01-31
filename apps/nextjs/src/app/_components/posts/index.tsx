"use client";

import { useMemo } from "react";
import Spinner from "@inf/ui/spinner";
import { api } from "~/trpc/react";
import { useModalContext } from "../../_context/postContext";
import { NoPosts } from "./noPosts";
import { PostCard } from "./postCard";

const PostList = () => {
  // Destructure modal context to get the function for opening a modal
  const { openModal } = useModalContext();

  // Use the `useQuery` hook from `trpc` to fetch the list of posts
  const { data: posts = [], isFetching, isSuccess } = api.post.all.useQuery();

  // Memoize the rendered list of posts to prevent unnecessary re-renders on post data changes
  const renderedPosts = useMemo(() => {
    return posts.map((post) => (
      // Use `post.id` as the key to help React efficiently re-render list items
      <PostCard key={post.id} post={post} />
    ));
  }, [posts]); // `renderedPosts` will only re-render when the `posts` data changes

  // Early return pattern: Display a loading spinner if posts are still being fetched
  if (isFetching) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <Spinner size={30} /> {/* Render spinner while data is being fetched */}
      </div>
    );
  }

  // Handle the case where the query is successful but no posts are found
  if (isSuccess && posts.length === 0) {
    return <NoPosts openModal={openModal} />;
  }

  // Render the list of posts once data is fetched successfully and available
  return (
    <div className="grid gap-4 p-6 md:grid-cols-2 lg:grid-cols-3">
      {renderedPosts}
    </div>
  );
};

export default PostList;
