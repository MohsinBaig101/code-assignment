"use client";

import { Suspense } from "react";

import Spinner from "@inf/ui/spinner";

import { NavBar } from "../_components/navbar";
import { PostList } from "../_components/posts";
import { ModalProvider } from "../_context/postContext";

export default function Post() {
  return (
    <ModalProvider>
      <NavBar />
      <Suspense fallback={<Spinner />}>
        <PostList />
      </Suspense>
    </ModalProvider>
  );
}
