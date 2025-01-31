/* eslint-disable @typescript-eslint/no-unsafe-call */
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { CreatePostForm } from "../../posts/createPost"; // Adjust import path
import { api } from "~/trpc/react"; // Mock the API
import { ModalProvider } from "../../../_context/postContext"; // ModalProvider context
import { toast } from "@inf/ui/toast"; // Import toast to mock it

vi.mock("@inf/ui/toast"); // Mock the toast

// Mock API methods
vi.mock("~/trpc/react", () => ({
  api: {
    post: {
      create: {
        useMutation: vi.fn(),
      },
    },
    useUtils: vi.fn(),
  },
}));

describe("CreatePostForm Component", () => {
  let mockCloseModal: React.Dispatch<React.SetStateAction<boolean>>;

  beforeEach(() => {
    mockCloseModal = vi.fn();
  });

  it("renders the form with title and content fields", () => {
    render(
      <ModalProvider>
        <CreatePostForm closeModal={mockCloseModal} />
      </ModalProvider>
    );

    // Check if the form fields are rendered
    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Content/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Submit/i })).toBeInTheDocument();
  });

  it("submits the form successfully when valid data is provided", async () => {
    // Mock the mutation response
    api.post.create.useMutation.mockReturnValue({
      mutate: vi.fn().mockImplementation((data, { onSuccess }) => {
        onSuccess?.(); // Simulate success callback
      }),
    });
    api.useUtils.mockReturnValue({ post: { invalidate: vi.fn() } });

    render(
      <ModalProvider>
        <CreatePostForm closeModal={mockCloseModal} />
      </ModalProvider>
    );

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: "New Post" } });
    fireEvent.change(screen.getByLabelText(/Content/i), { target: { value: "This is a valid content with more than 100 characters." } });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /Submit/i }));

    // Wait for the mutation to finish
    await waitFor(() => {
      expect(api.post.create.useMutation).toHaveBeenCalled();
    });
  });

  it("shows an error message when the form submission fails", async () => {
    // Mock the mutation error response
    api.post.create.useMutation.mockReturnValue({
      mutate: vi.fn().mockImplementation((data, { onError }) => {
        onError?.({ data: { code: "UNAUTHORIZED" } }); // Simulate error callback
      }),
    });

    render(
      <ModalProvider>
        <CreatePostForm closeModal={mockCloseModal} />
      </ModalProvider>
    );
    // Mock toast.error function
    const toastErrorMock = vi.fn();
    toast.error = toastErrorMock;

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: "New Post" } });
    fireEvent.change(screen.getByLabelText(/Content/i), { target: { value: "This is a valid content with more than 100 characters." } });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /Submit/i }));

    // Wait for the error toast to appear
    await waitFor(() => {
        expect(toastErrorMock).toHaveBeenCalledWith(
            "You must be logged in to post"
          );
    });
  });
});
