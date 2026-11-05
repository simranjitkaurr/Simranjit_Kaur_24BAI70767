import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("renders the experiment title and calendar", () => {
    render(<App />);
    expect(screen.getByText("Interactive Calendar")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "+ Add interaction" })).toBeInTheDocument();
    expect(screen.getByLabelText("Interactive calendar")).toBeInTheDocument();
  });
});