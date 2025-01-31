"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";

import Spinner from "@inf/ui/spinner";

import { NavBar } from "../_components/Navbar";
import { ModalProvider } from "../_context/PostContext";

// Dynamically import PostList with Suspense
const PostList = dynamic(() => import("../_components/posts/PostsListing"), {
  suspense: true,
});

export default function Post() {
  return (
    <ModalProvider>
      <NavBar />

      {/* Suspense fallback for the dynamically loaded PostList */}
      <Suspense fallback={<Spinner />}>
        <PostList />
      </Suspense>
    </ModalProvider>
  );
}
