import React from "react";
import Link from "next/link";
import { Event } from "../types";

interface EventListProps {
  events: Event[];
  refreshEvents?: () => Promise<void>;
}

const EventList: React.FC<EventListProps> = ({ events, refreshEvents }) => {
  const handleDeleteEvent = async (id: number) => {
    if (!confirm("Are you sure you want to delete this event?")) return;

    try {
      const response = await fetch(`/api/events/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete event");
      }
      await refreshEvents?.();
    } catch (err: any) {
      alert(err.message);
    }
  };
  return (
    <div>
      <h2>Event List</h2>
      <table border={1} cellPadding={5} cellSpacing={0}>
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Event Time</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td>{event.title}</td>
              <td> {new Date(event.date).toLocaleDateString()}</td>
              <td>
                <Link href={`/events/${event.id}`}>
                  <button>View Details</button>
                </Link>
              </td>
              <td>
                {" "}
                <Link href={`/events/edit/${event.id}`}>
                  {" "}
                  <button>Edit Event</button>
                </Link>
              </td>
              <td>
                <button onClick={() => handleDeleteEvent(event.id)}>
                  Delete Event
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventList;
