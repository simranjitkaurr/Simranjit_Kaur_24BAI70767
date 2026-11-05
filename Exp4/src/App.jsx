import React, { Profiler, useCallback, useMemo, useState } from "react";
import Calendar from "./components/Calendar";
import { initialEvents } from "./data/events";

function App() {
  const [events, setEvents] = useState(initialEvents);
  const [selectedDate, setSelectedDate] = useState("2026-08-17");
  const [renderCount, setRenderCount] = useState(0);

  const moveEvent = useCallback((eventId, targetDate, targetHour) => {
    setEvents((current) =>
      current.map((event) =>
        event.id === eventId
          ? { ...event, date: targetDate, hour: targetHour }
          : event
      )
    );
  }, []);

  const addEvent = useCallback(() => {
    const newEvent = {
      id: `event-${Date.now()}`,
      title: "New Interaction",
      date: selectedDate,
      hour: 10,
      duration: 1,
      type: "meeting"
    };
    setEvents((current) => [...current, newEvent]);
  }, [selectedDate]);

  const performanceInfo = useMemo(
    () => ({
      totalEvents: events.length,
      uniqueDays: new Set(events.map((event) => event.date)).size
    }),
    [events]
  );

  const onRender = useCallback((id, phase, actualDuration) => {
    if (phase === "update") {
      setRenderCount((count) => count + 1);
      console.debug(`${id} ${phase}: ${actualDuration.toFixed(2)}ms`);
    }
  }, []);

  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">FRONTEND PERFORMANCE LAB</p>
          <h1>Interactive Calendar</h1>
          <p className="subtitle">
            Experiment 4 — Optimization, drag-and-drop interaction and testing
          </p>
        </div>

        <div className="toolbar">
          <button className="primary-btn" onClick={addEvent}>
            + Add interaction
          </button>
          <div className="metrics">
            <span>{performanceInfo.totalEvents} interactions</span>
            <span>{renderCount} updates</span>
          </div>
        </div>
      </header>

      <section className="info-grid">
        <article>
          <strong>Memoization</strong>
          <span>React.memo + useMemo + useCallback</span>
        </article>
        <article>
          <strong>Interaction</strong>
          <span>Drag an event to another day/hour</span>
        </article>
        <article>
          <strong>Profiling</strong>
          <span>React Profiler measures update duration</span>
        </article>
        <article>
          <strong>Testing</strong>
          <span>Vitest + Testing Library</span>
        </article>
      </section>

      <Profiler id="Calendar" onRender={onRender}>
        <Calendar
          events={events}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
          onMoveEvent={moveEvent}
        />
      </Profiler>
    </main>
  );
}

export default App;