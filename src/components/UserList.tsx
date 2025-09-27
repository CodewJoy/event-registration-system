import React from "react";
import Link from "next/link";

interface User {
  id: number;
  name: string;
  email: string;
}

interface UserListProps {
  users: User[];
  refreshUsers?: () => Promise<void>; // Optional callback to refresh the user list after deletion
}

const UserList: React.FC<UserListProps> = ({ users, refreshUsers }) => {
  const handleDeleteUser = async (id: number) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
      await refreshUsers?.();
    } catch (err: any) {
      alert(err.message);
    }
  };
  return (
    <div>
      <h2>User List</h2>
      <table border={1} cellPadding={5} cellSpacing={0}>
        <thead>
          <tr>
            <th>User Name</th>
            <th>User Email</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>
                {" "}
                <Link href={`/users/edit/${u.id}`}>
                  {" "}
                  <button>Edit User</button>
                </Link>
              </td>
              <td>
                <button onClick={() => handleDeleteUser(u.id)}>
                  Delete User
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
