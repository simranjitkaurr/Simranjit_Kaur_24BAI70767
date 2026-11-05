import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Calendar from "./Calendar";
import { initialEvents } from "../data/events";

describe("Calendar", () => {
  it("renders scheduled interactions", () => {
    render(
      <Calendar
        events={initialEvents}
        selectedDate="2026-08-17"
        onSelectDate={vi.fn()}
        onMoveEvent={vi.fn()}
      />
    );

    expect(screen.getByText("Team Stand-up")).toBeInTheDocument();
    expect(screen.getByText("UI Performance Review")).toBeInTheDocument();
  });

  it("selects a calendar day", () => {
    const onSelectDate = vi.fn();

    render(
      <Calendar
        events={initialEvents}
        selectedDate="2026-08-17"
        onSelectDate={onSelectDate}
        onMoveEvent={vi.fn()}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Select WED 19" }));
    expect(onSelectDate).toHaveBeenCalledWith("2026-08-19");
  });

  it("moves an interaction after drag and drop", () => {
    const onMoveEvent = vi.fn();

    render(
      <Calendar
        events={initialEvents}
        selectedDate="2026-08-17"
        onSelectDate={vi.fn()}
        onMoveEvent={onMoveEvent}
      />
    );

    fireEvent.dragStart(screen.getByTestId("event-event-1"));
    fireEvent.dragOver(screen.getByTestId("slot-2026-08-18-13"));
    fireEvent.drop(screen.getByTestId("slot-2026-08-18-13"));

    expect(onMoveEvent).toHaveBeenCalledWith("event-1", "2026-08-18", 13);
  });
});