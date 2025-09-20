import React from "react";
import RegistrationForm from "../components/RegistrationForm";

interface Event {
  id: number;
  title: string;
  date: string;
  description: string;
}

interface EventListProps {
  events: Event[];
}

const EventList: React.FC<EventListProps> = ({ events }) => {
  return (
    <div>
      <h2>Event List</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <h3>{event.title}</h3>
            <p>Date: {event.date}</p>
            <p>Description: {event.description}</p>
            <RegistrationForm eventId={event.id} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
