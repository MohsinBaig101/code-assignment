import React, { Suspense } from "react";
import Link from "next/link";

import Comments from "../../_components/posts/comments/listing";

type PostWithCommentsProps = {
  postId: string;
  title: string;
  content: string;
};

const PostWithComments: React.FC<PostWithCommentsProps> = async ({
  title,
  content,
  postId,
}) => {
  

  return (
    <div className="mx-auto w-full max-w-2xl rounded-lg bg-white p-6 shadow-md">
      <div className="mb-4">
        <Link href={"/posts"}>
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z"
              fill="currentColor"
              fill-rule="evenodd"
              clip-rule="evenodd"
            ></path>
          </svg>
        </Link>
      </div>
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <p className="mt-2 text-gray-700">{content}</p>
      </div>

      {/* Suspense for the comments section */}
      <Suspense fallback={<div>Loading comments...</div>}>
        <Comments postId={postId} />
      </Suspense>
    </div>
  );
};

export default PostWithComments;
