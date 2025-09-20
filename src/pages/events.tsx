import { useEffect, useState } from "react";
import Link from "next/link";
import EventList from "../components/EventList";
import NewEventForm from "../components/NewEventForm";
import { Event } from "../types";

const EventsPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch("/api/events");
      const data = await response.json();
      setEvents(data);
      setLoading(false);
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Link href="/">Back to Home</Link>
      <h1>Events</h1>
      <NewEventForm onAdd={(newEvent) => setEvents([...events, newEvent])} />
      <EventList events={events} />
    </div>
  );
};

export default EventsPage;
