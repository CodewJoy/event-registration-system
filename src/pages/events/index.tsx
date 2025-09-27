import { useEffect, useState } from "react";
import Link from "next/link";
import EventList from "../../components/EventList";
import { Event } from "../../types";

const EventsPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshEvents = async () => {
    const res = await fetch("/api/events");
    const data = await res.json();
    setEvents(data);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        await refreshEvents();
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
      <Link href="/events/new">
        {" "}
        <button>Add Event</button>
      </Link>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && (
        <EventList events={events} refreshEvents={refreshEvents} />
      )}
    </div>
  );
};

export default EventsPage;
