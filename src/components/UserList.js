import React, { useEffect, useState } from "react";
import axios from "../services/api";

const UserList = ({ onEdit, onAdd, onDelete }) => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get("/users")
      .then(response => setUsers(response.data))
      .catch(() => setError("Failed to fetch users."));
  }, []);

  return (
    <div>
      <h1>User Management</h1>
      {error && <p className="error">{error}</p>}
      <button onClick={onAdd}>Add User</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.department}</td>
              <td>
                <button onClick={() => onEdit(user)}>Edit</button>
                <button onClick={() => onDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
