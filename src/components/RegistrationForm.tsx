import React, { useState, FormEvent, ChangeEvent } from "react";

interface RegistrationFormProps {
  eventId: number;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ eventId }) => {
  const [userId, setUserId] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: Number(userId), eventId }),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      setSuccess(true);
      setUserId("");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleUserIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register for Event</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>Registration successful!</p>}
      <div>
        <label htmlFor="userId">User ID:</label>
        <input
          type="text"
          id="userId"
          value={userId}
          onChange={handleUserIdChange}
          required
        />
        <button type="submit">Register</button>
      </div>
    </form>
  );
};

export default RegistrationForm;
