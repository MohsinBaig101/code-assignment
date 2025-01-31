import "@testing-library/jest-dom";

import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { api } from "~/trpc/react";
import { PostCard } from "../../posts/postCard";

global.IntersectionObserver = class {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
};
// Mock the API and toast
vi.mock("~/trpc/react", () => ({
  api: {
    post: {
      delete: {
        useMutation: vi.fn(),
      },
    },
    useUtils: vi.fn().mockReturnValue({
      post: { invalidate: vi.fn() },
    }),
  },
}));

vi.mock("@inf/ui/toast", () => ({
  toast: { error: vi.fn() },
}));

describe("PostCard Component", () => {
  const mockPost = {
    id: "1",
    title: "Post Title",
    content: "Post Content",
    published: false,
    created_at: new Date(),
    updated_at: new Date(),
    author_id: "author-id",
  };

  it("renders the post title and content correctly", () => {
    render(<PostCard post={mockPost} />);

    // Check if the title and content are rendered
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    expect(screen.getByText("Post Title")).toBeInTheDocument();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    expect(screen.getByText("Post Content")).toBeInTheDocument();
  });

  it("calls deletePost mutation on delete button click", async () => {
    const deletePostMock = vi.fn();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    api.post.delete.useMutation.mockReturnValue({
      mutate: deletePostMock,
      isPending: false,
    });

    render(<PostCard post={mockPost} />);

    // Click on delete button
    fireEvent.click(screen.getByRole("button", { name: /Delete post/i }));

    // Ensure deletePost is called
    expect(deletePostMock).toHaveBeenCalledWith({ id: mockPost.id });
  });

  it("shows spinner while delete post is in progress", () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    api.post.delete.useMutation.mockReturnValue({
      mutate: vi.fn(),
      isPending: true,
    });

    render(<PostCard post={mockPost} />);

    // Check if the spinner is rendered instead of the icon
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    expect(screen.getByRole("status")).toBeInTheDocument();
  });
});
