import React, { useState } from "react";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";
import axios from "./services/api";

const App = () => {
  const [view, setView] = useState("list");
  const [selectedUser, setSelectedUser] = useState(null);

  const handleAdd = () => setView("form");
  const handleEdit = (user) => {
    setSelectedUser(user);
    setView("form");
  };

  const handleDelete = (id) => {
    axios.delete(`/users/${id}`)
      .then(() => alert("User deleted!"))
      .catch(() => alert("Failed to delete user."));
  };

  const handleSave = (user) => {
    const apiCall = user.id
      ? axios.put(`/users/${user.id}`, user)
      : axios.post("/users", user);

    apiCall.then(() => {
      alert("User saved!");
      setView("list");
    }).catch(() => alert("Failed to save user."));
  };

  const handleCancel = () => setView("list");

  return (
    <div>
      {view === "list" && (
        <UserList onAdd={handleAdd} onEdit={handleEdit} onDelete={handleDelete} />
      )}
      {view === "form" && (
        <UserForm user={selectedUser} onSave={handleSave} onCancel={handleCancel} />
      )}
    </div>
  );
};

export default App;
