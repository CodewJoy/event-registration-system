import { useEffect, useState, FormEvent, ChangeEvent } from "react";
import Link from "next/link";
import { User } from "../../types";
import UserList from "../../components/UserList";

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/api/users");
      const data = await response.json();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      if (!response.ok) {
        throw new Error("Failed to create user");
      }

      const newUser: User = await response.json();
      setUsers([...users, newUser]);
      setName("");
      setEmail("");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div>
      <Link href="/">Back to Home</Link>
      <h1>Users</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          required
        />
        <button type="submit">Add User</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      <UserList users={users} />
    </div>
  );
};

export default UsersPage;
