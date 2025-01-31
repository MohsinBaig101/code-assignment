/* eslint-disable @typescript-eslint/no-unsafe-call */
import "@testing-library/jest-dom";
import { createTRPCReact } from "@trpc/react-query";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import sinon from "sinon";
import { NavBar } from "../Navbar";
import { useModalContext } from "../../_context/PostContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

global.IntersectionObserver = class {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
};

export const trpc = createTRPCReact<any>();
// Mock the useModalContext hook
vi.mock("../../_context/postContext", () => ({
  useModalContext: vi.fn(),
}));

const queryClient = new QueryClient();

const renderWithTRPC = (ui: React.ReactNode) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <trpc.Provider client={{} as any} queryClient={queryClient}>
        {ui}
      </trpc.Provider>
    </QueryClientProvider>
  );
};

describe("NavBar Component", () => {
  it("renders correctly", () => {
    (useModalContext as vi.Mock).mockReturnValue({
      isModalOpen: false,
      openModal: vi.fn(),
      closeModal: vi.fn(),
    });

    renderWithTRPC(<NavBar />);

    expect(screen.getByText("View All Posts")).toBeInTheDocument();
    expect(screen.getByText("Create Post")).toBeInTheDocument();
  });

  it("calls openModal when 'Create Post' button is clicked", () => {
    const openModalSpy = sinon.spy();

    (useModalContext as vi.Mock).mockReturnValue({
      isModalOpen: false,
      openModal: openModalSpy,
      closeModal: vi.fn(),
    });

    renderWithTRPC(<NavBar />);
    const button = screen.getByText("Create Post");

    fireEvent.click(button);

    expect(openModalSpy.calledOnce).toBeTruthy();
  });

  it("renders modal when isModalOpen is true", () => {
    (useModalContext as vi.Mock).mockReturnValue({
      isModalOpen: true,
      openModal: vi.fn(),
      closeModal: vi.fn(),
    });

    renderWithTRPC(<NavBar />);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});
