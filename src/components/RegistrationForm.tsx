import React, { useEffect, useState, FormEvent, ChangeEvent } from "react";
import { User } from "../types";

interface RegistrationFormProps {
  eventId: number;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ eventId }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [userId, setUserId] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    // 拉所有使用者資料
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch(() => setError("Failed to load users"));
  }, []);

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

  return (
    <form onSubmit={handleSubmit}>
      <h3>Register for Event</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>Registration successful!</p>}
      <div>
        <label htmlFor="userId">Select User:</label>
        <select
          id="userId"
          value={userId}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setUserId(e.target.value)
          }
          required
        >
          <option value="">-- Choose a user --</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name} ({u.email})
            </option>
          ))}
        </select>
      </div>

      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
