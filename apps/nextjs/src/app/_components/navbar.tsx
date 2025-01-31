"use client";

import React from "react";
import Link from "next/link";

import { Button } from "@inf/ui/button";
import { Modal } from "@inf/ui/modal";
import { CreatePostForm } from "./posts/createPost";
import { useModalContext } from "../_context/postContext";

export function NavBar() {
  const { isModalOpen, openModal, closeModal } = useModalContext();

  return (
    <>
      <div className="bg-gray-100">
        {/* View All Posts Section */}
        <div className="mt-2 flex items-center justify-between bg-white px-6 py-4 shadow-sm">
          <div className="flex items-center gap-5">
            <Link href={"/"}>
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
            <h1 className="text-xl font-bold text-gray-800">View All Posts</h1>
          </div>
          <Button
            onClick={openModal}
            className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
          >
            Create Post
          </Button>
        </div>
      </div>
      <Modal
        open={isModalOpen}
        closeModal={closeModal}
      >
        <CreatePostForm
          closeModal={closeModal}
        />
      </Modal>
    </>
  );
}
