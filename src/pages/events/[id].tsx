import { useRouter } from "next/router";
import RegistrationForm from "../../components/RegistrationForm";

const EventDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log("Event ID from URL:", id);
  return (
    <div>
      <h2>Event Detail</h2>
      <h3>{event.title}</h3>
      <p>{event.date}</p>
      <p>{event.description}</p>

      <h4>Registrations</h4>
      {/* 報名表單在這裡，而不是清單頁 */}
      <RegistrationForm eventId={id} />

      {/* 未來可加：報名紀錄清單 */}
    </div>
  );
};

export default EventDetailPage;
