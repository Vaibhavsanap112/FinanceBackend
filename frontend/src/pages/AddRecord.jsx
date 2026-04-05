import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../services/api";
import Navbar from "../Component/Navbar";

function AddRecord() {
  const navigate = useNavigate();
  const location = useLocation();

  const currentUser = JSON.parse(localStorage.getItem("user"));

  // get id from URL
  const queryParams = new URLSearchParams(location.search);
  const recordId = queryParams.get("id");

  const [formData, setFormData] = useState({
    amount: "",
    type: "expense",
    category: "",
    notes: "",
  });

  // 🚫 Only admin allowed
  if (!currentUser || currentUser.role !== "admin") {
    return <h2 style={{ textAlign: "center" }}>Access Denied</h2>;
  }

  // load data if editing
  useEffect(() => {
    if (recordId) {
      const fetchRecord = async () => {
        try {
          const res = await API.get("/records");
          const record = res.data.find((r) => r._id === recordId);

          if (record) {
            setFormData({
              amount: record.amount,
              type: record.type,
              category: record.category,
              notes: record.notes || "",
            });
          }
        } catch (error) {
          console.log("Error loading record");
        }
      };

      fetchRecord();
    }
  }, [recordId]);

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (recordId) {
        // ✏️ update record
        await API.put(`/records/${recordId}`, formData);
        alert("Record updated successfully!");
      } else {
        // ➕ create record
        await API.post("/records", {
          ...formData,
          date: new Date(),
        });
        alert("Record added successfully!");
      }

      navigate("/records");
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <Navbar />

      <div style={containerStyle}>
        <h2 style={{ marginBottom: "20px", color: "#333" }}>
          {recordId ? "✏️ Edit Record" : "➕ Add New Record"}
        </h2>

        <form onSubmit={handleSubmit} style={formStyle}>
          <input
            type="number"
            name="amount"
            placeholder="Enter amount"
            value={formData.amount}
            onChange={handleChange}
            style={inputStyle}
            required
          />

          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>

          <input
            type="text"
            name="category"
            placeholder="Enter category"
            value={formData.category}
            onChange={handleChange}
            style={inputStyle}
            required
          />

          <input
            type="text"
            name="notes"
            placeholder="Add notes (optional)"
            value={formData.notes}
            onChange={handleChange}
            style={inputStyle}
          />

          <button type="submit" style={buttonStyle}>
            {recordId ? "Update Record" : "Add Record"}
          </button>
        </form>
      </div>
    </>
  );
}

export default AddRecord;

/* 🎨 Styles */

const containerStyle = {
  maxWidth: "420px",
  margin: "40px auto",
  padding: "25px",
  borderRadius: "12px",
  background: "#f9f9f9",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  textAlign: "center",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
};

const inputStyle = {
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  outline: "none",
};

const buttonStyle = {
  padding: "10px",
  borderRadius: "6px",
  border: "none",
  background: "#007bff",
  color: "white",
  cursor: "pointer",
  fontWeight: "bold",
};