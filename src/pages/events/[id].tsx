import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import RegistrationForm from "../../components/RegistrationForm";
import type { Event } from "../../types";

const EventDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [event, setEvent] = useState<Event | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchEvent = async () => {
      try {
        const res = await fetch(`/api/events/${id}`);
        if (res.ok) {
          const data = await res.json();
          setEvent(data);
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Something went wrong");
        }
      }
    };

    fetchEvent();
  }, [id]);

  if (!event) return <p>Loading...</p>;
  return (
    <div>
      <Link href="/">Back to Home</Link>
      <h2>Event Detail</h2>
      <h3>Event Name: {event.title}</h3>
      <p>Date: {new Date(event.date).toLocaleDateString()}</p>
      <p>Description: {event.description}</p>

      <RegistrationForm eventId={event.id} />
      {/* 未來可加：報名紀錄清單 */}
    </div>
  );
};

export default EventDetailPage;
