import React from "react";
import { notFound } from "next/navigation"; 
import { api } from "~/trpc/server";
import PostWithComments from "./post";

// Async component to fetch and display a post by its slug / PostId
const PostPage = async ({ params }: { params: { slug: string } }) => {
  // Fetch the post data using the provided `slug` from the URL params
  const postData = await api.post.byId({ id: params.slug });

  // If no post data is found or the `slug` parameter is missing, trigger a 404 error
  if (!postData || !params.slug) {
    notFound(); // This will show the 404 page if the post is not found in the database or no slug is provided
  }

  // Render the `PostWithComments` component, passing the post details as props
  // `postId` is the `slug`, `title` and `content` are fetched from the API response
  return (
    <PostWithComments
      postId={params.slug} // Pass the `slug` as `postId` to the `PostWithComments` component
      title={postData.title} // Title of the post
      content={postData.content} // Content of the post
    />
  );
};

export default PostPage;
