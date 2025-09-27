import { useEffect, useState, FormEvent, ChangeEvent } from "react";
import Link from "next/link";
import { User } from "../../types";
import UserList from "../../components/UserList";

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshUsers = async () => {
    const res = await fetch("/api/users");
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        await refreshUsers();
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

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Link href="/">Back to Home</Link>
      <h1>Users Management</h1>
      <Link href="/users/new">
        {" "}
        <button>Add User</button>
      </Link>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && (
        <UserList users={users} refreshUsers={refreshUsers} />
      )}
    </div>
  );
};

export default UsersPage;
