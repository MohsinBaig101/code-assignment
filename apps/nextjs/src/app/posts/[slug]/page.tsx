import React from "react";
import { notFound } from "next/navigation";
import { api } from "~/trpc/server";
import PostWithComments from "./post";

const PostPage = async ({ params }: { params: { slug: string } }) => {
    const postData = await api.post.byId({ id: params.slug });

    if (!postData || !params.slug) {
      notFound(); // This will show the 404 page if the post is not found
    }
  return (
    <PostWithComments
      postId={params.slug}
      title={postData.title}
      content={postData.content}
    />
  );
};

export default PostPage;
