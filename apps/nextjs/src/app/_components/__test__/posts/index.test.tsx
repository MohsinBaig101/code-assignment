/* eslint-disable @typescript-eslint/no-unsafe-call */
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { api } from "~/trpc/react";
import { ModalProvider } from "../../../_context/postContext";
import PostList from "../../posts/index";

// Mock the necessary hooks and components
vi.mock("~/trpc/react", () => ({
  api: {
    post: {
      all: {
        useQuery: vi.fn(),
      },
      delete: {
        useMutation: vi.fn(), // Mock useMutation
      },
    },
    useUtils: vi.fn(),
  },
}));

describe("PostList Component", () => {
  beforeEach(() => {
    // Reset mock calls before each test to avoid conflicts
    vi.resetAllMocks();
  });

  it("shows a spinner while data is fetching", () => {
    // Mock API to simulate fetching state
    api.post.all.useQuery.mockReturnValue({
      isFetching: true,
      isSuccess: false,
      data: [],
    });

    render(
      <ModalProvider>
        <PostList />
      </ModalProvider>,
    );

    // Check if the spinner is rendered
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("shows NoPosts component when there are no posts", () => {
    // Mock API to simulate no posts found
    api.post.all.useQuery.mockReturnValue({
      isFetching: false,
      isSuccess: true,
      data: [],
    });

    const mockOpenModal = vi.fn();

    render(
      <ModalProvider>
        <PostList />
      </ModalProvider>,
    );

    // Check if NoPosts component is rendered
    expect(screen.getByText("No Posts Yet")).toBeInTheDocument();

    // Check if the "Create Post" button is present
    expect(
      screen.getByRole("button", { name: /Create Post/i }),
    ).toBeInTheDocument();
  });

  it("renders posts when they are available", async () => {
    // Mock API to simulate successful data fetch with posts
    const mockPosts = [
      { id: "1", title: "Post 1", content: "Content of post 1" },
      { id: "2", title: "Post 2", content: "Content of post 2" },
    ];

    api.post.all.useQuery.mockReturnValue({
      isFetching: false,
      isSuccess: true,
      data: mockPosts,
    });

    render(
      <ModalProvider>
        <PostList />
      </ModalProvider>,
    );

    // Check if posts are rendered
    await waitFor(() => {
      expect(screen.getByText("Post 1")).toBeInTheDocument();
      expect(screen.getByText("Post 2")).toBeInTheDocument();
    });
  });
});
