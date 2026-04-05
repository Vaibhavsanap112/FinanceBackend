import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../Component/Navbar";

function Users() {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [users, setUsers] = useState([]);

  // 🚫 only admin
  if (!currentUser || currentUser.role !== "admin") {
    return <h2 style={{ textAlign: "center" }}>Access Denied</h2>;
  }

  // fetch users
  const loadUsers = async () => {
    try {
      const res = await API.get("/users");
       console.log("USERS:", res.data);
      setUsers(res.data);
    } catch (error) {
      alert("Error loading users");
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // update role
  const handleRoleChange = async (id, newRole) => {
    try {
      await API.put(`/users/${id}`, { role: newRole });
      loadUsers();
    } catch (error) {
      alert("Failed to update role");
    }
  };

  // toggle active/inactive
  const toggleStatus = async (id, currentStatus) => {
    try {
      await API.put(`/users/${id}`, { isActive: !currentStatus });
      loadUsers();
    } catch (error) {
      alert("Failed to update status");
    }
  };

  return (
    <>
      <Navbar />

      <div style={containerStyle}>
        <h2 style={{ marginBottom: "20px" }}>👥 Manage Users</h2>

        <div style={tableStyle}>
          <div style={headerRow}>
            <span>Name</span>
            <span>Email</span>
            <span>Role</span>
            <span>Status</span>
            <span>Actions</span>
          </div>

          {users.map((user) => (
            <div key={user._id} style={rowStyle}>
              <span>{user.name}</span>
              <span>{user.email}</span>

              {/* Role dropdown */}
              <select
                value={user.role}
                onChange={(e) =>
                  handleRoleChange(user._id, e.target.value)
                }
                style={selectStyle}
              >
                <option value="viewer">Viewer</option>
                <option value="analyst">Analyst</option>
                <option value="admin">Admin</option>
              </select>

              {/* Status */}
              <span style={{ color: user.isActive ? "green" : "red" }}>
                {user.isActive ? "Active" : "Inactive"}
              </span>

              {/* Toggle button */}
              <button
                style={toggleBtn}
                onClick={() =>
                  toggleStatus(user._id, user.isActive)
                }
              >
                {user.isActive ? "Deactivate" : "Activate"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Users;

/* 🎨 Styles */

const containerStyle = {
  maxWidth: "900px",
  margin: "40px auto",
  padding: "20px",
};

const tableStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const headerRow = {
  display: "grid",
  gridTemplateColumns: "1fr 2fr 1fr 1fr 1fr",
  fontWeight: "bold",
  padding: "10px",
  background: "#e5e7eb",
  borderRadius: "6px",
};

const rowStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 2fr 1fr 1fr 1fr",
  alignItems: "center",
  padding: "10px",
  background: "#f9f9f9",
  borderRadius: "6px",
};

const selectStyle = {
  padding: "5px",
  borderRadius: "5px",
};

const toggleBtn = {
  padding: "6px",
  border: "none",
  borderRadius: "5px",
  background: "#2563eb",
  color: "white",
  cursor: "pointer",
};