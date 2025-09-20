import { useEffect, useState, FormEvent, ChangeEvent } from "react";
import Link from "next/link";
import { Registration } from "../types";

const RegisterPage = () => {
  const [register, setRegister] = useState<Registration[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/api/register");
      const data = await response.json();
      setRegister(data);
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <Link href="/">Back to Home</Link>
      <h1>Registration</h1>
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
    </div>
  );
};

export default RegisterPage;
