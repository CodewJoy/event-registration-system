import Link from "next/link";

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Event Registration System</h1>
      <p>
        This application allows users to register for events and manage their
        registrations.
      </p>
      <nav>
        <ul>
          <li>
            <Link href="/events">View Events</Link>
          </li>
          <li>
            <Link href="/users">View Users</Link>
          </li>
          <li>
            <Link href="/register">View Register</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
