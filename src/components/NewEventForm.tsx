import { useState, FormEvent, ChangeEvent } from "react";

interface NewEventFormProps {
  onAdd: (newEvent: any) => void;
}

const NewEventForm: React.FC<NewEventFormProps> = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, date, description }),
    });

    if (response.ok) {
      const newEvent = await response.json();
      onAdd(newEvent); // 將新活動加入 EventList
      setTitle("");
      setDate("");
      setDescription("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add New Event</h3>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Event Name"
        required
      />
      <input
        value={date}
        onChange={(e) => setDate(e.target.value)}
        placeholder="Date"
        type="datetime-local"
        required
      />
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
      />
      <button type="submit">Add Event</button>
    </form>
  );
};

export default NewEventForm;
