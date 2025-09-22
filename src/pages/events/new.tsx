import NewEventForm from "../../components/NewEventForm";

const NewEventPage = () => {
  return (
    <div>
      <h2>Add New Event</h2>
      <NewEventForm onAdd={(e) => console.log("Added:", e)} />
    </div>
  );
};

export default NewEventPage;
