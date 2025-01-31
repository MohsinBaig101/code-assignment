/* eslint-disable @typescript-eslint/no-unsafe-call */
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { NoPosts } from "../../posts/noPosts";

describe("NoPosts Component", () => {
  it("renders correctly and calls openModal on button click", () => {
    const mockOpenModal = vi.fn();  // Create a mock function for openModal

    render(<NoPosts openModal={mockOpenModal} />);  // Render the component with mock function

    // Check if elements render correctly
    expect(screen.getByText("No Posts Yet")).toBeInTheDocument();
    expect(screen.getByText("Start creating your first post to engage with your audience.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Create Post/i })).toBeInTheDocument();

    // Simulate button click to open modal
    fireEvent.click(screen.getByRole("button", { name: /Create Post/i }));

    // Check if openModal was called
    expect(mockOpenModal).toHaveBeenCalledTimes(1);
  });
});
