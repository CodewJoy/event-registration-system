import { useEffect, useState, FormEvent, ChangeEvent } from "react";
import Link from "next/link";
import { Registration } from "../../types";

const RegisterPage = () => {
  const [register, setRegister] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRegistration = async () => {
      try {
        const response = await fetch("/api/register");
        const data = await response.json();
        setRegister(data);
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

    fetchRegistration();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Link href="/">Back to Home</Link>
      <h1>Registration</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && (
        <table border={1} cellPadding={5} cellSpacing={0}>
          <thead>
            <tr>
              <th>User Name</th>
              <th>Event Name</th>
              <th>Event Date</th>
            </tr>
          </thead>
          <tbody>
            {register.map((r) => (
              <tr key={r.id}>
                <td>{r.user.name}</td>
                <td>{r.event.title}</td>
                <td>{new Date(r.event.date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RegisterPage;
