import React from "react";

const EventCard = React.memo(function EventCard({ event, onDragStart, onDragEnd }) {
  return (
    <div
      className={`event event-${event.type}`}
      draggable
      onDragStart={() => onDragStart(event.id)}
      onDragEnd={onDragEnd}
      title="Drag this interaction to another calendar slot"
      data-testid={`event-${event.id}`}
    >
      <strong>{event.title}</strong>
      <small>{event.duration} hr · drag to move</small>
    </div>
  );
});

export default EventCard;