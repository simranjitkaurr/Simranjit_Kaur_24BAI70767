import React, { useCallback, useMemo, useState } from "react";
import { hours, weekDays } from "../data/events";
import EventCard from "./EventCard";

const Calendar = React.memo(function Calendar({
  events,
  selectedDate,
  onSelectDate,
  onMoveEvent
}) {
  const [draggedId, setDraggedId] = useState(null);
  const [dropTarget, setDropTarget] = useState("");

  const eventsBySlot = useMemo(() => {
    const map = new Map();
    for (const event of events) {
      const key = `${event.date}-${event.hour}`;
      const existing = map.get(key) || [];
      map.set(key, [...existing, event]);
    }
    return map;
  }, [events]);

  const handleDragStart = useCallback((eventId) => {
    setDraggedId(eventId);
  }, []);

  const handleDragEnd = useCallback(() => {
    setDraggedId(null);
    setDropTarget("");
  }, []);

  const handleDragOver = useCallback((e, key) => {
    e.preventDefault();
    setDropTarget(key);
  }, []);

  const handleDrop = useCallback((e, date, hour) => {
    e.preventDefault();
    if (draggedId) {
      onMoveEvent(draggedId, date, hour);
    }
    setDraggedId(null);
    setDropTarget("");
  }, [draggedId, onMoveEvent]);

  const getEvents = useCallback(
    (date, hour) => eventsBySlot.get(`${date}-${hour}`) || [],
    [eventsBySlot]
  );

  return (
    <section className="calendar-card" aria-label="Interactive calendar">
      <div className="calendar-head">
        <div className="time-label">TIME</div>
        {weekDays.map((day) => (
          <button
            className={`day-head ${selectedDate === day.date ? "selected" : ""}`}
            key={day.date}
            onClick={() => onSelectDate(day.date)}
            aria-label={`Select ${day.label} ${day.number}`}
          >
            <span>{day.label}</span>
            <b>{day.number}</b>
          </button>
        ))}
      </div>

      <div className="calendar-body">
        {hours.map((hour) => (
          <React.Fragment key={hour}>
            <div className="time-cell">{String(hour).padStart(2, "0")}:00</div>

            {weekDays.map((day) => {
              const key = `${day.date}-${hour}`;
              const slotEvents = getEvents(day.date, hour);

              return (
                <div
                  key={key}
                  className={`slot ${dropTarget === key ? "drop-active" : ""}`}
                  onDragOver={(e) => handleDragOver(e, key)}
                  onDrop={(e) => handleDrop(e, day.date, hour)}
                  data-testid={`slot-${key}`}
                >
                  {slotEvents.map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      onDragStart={handleDragStart}
                      onDragEnd={handleDragEnd}
                    />
                  ))}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
});

export default Calendar;