import { useEffect, useState } from "react";
import Link from "next/link";
import EventList from "../../components/EventList";
import NewEventForm from "../../components/NewEventForm";
import { Event } from "../../types";

const EventsPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events");
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Link href="/">Back to Home</Link>
      <h1>Events Management</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && <EventList events={events} />}
    </div>
  );
};

export default EventsPage;
