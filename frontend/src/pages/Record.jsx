import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../src/services/api";
import Navbar from "../components/Navbar";

function Records() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const [recordList, setRecordList] = useState([]);

 
  const [filters, setFilters] = useState({
    type: "",
    category: "",
    startDate: "",
    endDate: "",
  });

 
  const loadRecords = async () => {
    try {
      const query = new URLSearchParams(filters).toString();
      const res = await API.get(`/records?${query}`);
      setRecordList(res.data);
    } catch (error) {
      alert("Unable to load records");
    }
  };

  useEffect(() => {
    loadRecords();
  }, []);


  if (!currentUser || currentUser.role === "viewer") {
    return <h2 style={{ textAlign: "center" }}>Access Denied</h2>;
  }

 
  const deleteRecord = async (id) => {
    try {
      await API.delete(`/records/${id}`);
      setRecordList((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      alert("Failed to delete record");
    }
  };

  return (
    <>
      <Navbar />

      <div style={containerStyle}>
        <h2 style={{ marginBottom: "20px" }}>📋 Records</h2>

       
        {currentUser.role === "admin" && (
          <button style={addBtnStyle} onClick={() => navigate("/add-record")}>
            ➕ Add Record
          </button>
        )}

      
        <div style={filterBox}>
          <select
            value={filters.type}
            onChange={(e) =>
              setFilters({ ...filters, type: e.target.value })
            }
            style={inputStyle}
          >
            <option value="">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <input
            type="text"
            placeholder="Category"
            value={filters.category}
            onChange={(e) =>
              setFilters({ ...filters, category: e.target.value })
            }
            style={inputStyle}
          />

          <input
            type="date"
            onChange={(e) =>
              setFilters({ ...filters, startDate: e.target.value })
            }
            style={inputStyle}
          />

          <input
            type="date"
            onChange={(e) =>
              setFilters({ ...filters, endDate: e.target.value })
            }
            style={inputStyle}
          />

          <button style={filterBtn} onClick={loadRecords}>
            Apply
          </button>
        </div>

        
        <div style={listStyle}>
          {recordList.length === 0 && (
            <p style={{ textAlign: "center" }}>No records found</p>
          )}

          {recordList.map((item) => (
            <div key={item._id} style={cardStyle}>
              <div>
                <strong>
                  {item.category.charAt(0).toUpperCase() +
                    item.category.slice(1)}
                </strong>
                <p style={{ margin: "5px 0" }}>
                  ₹{item.amount} ({item.type})
                </p>
              </div>

             
              {currentUser.role === "admin" && (
                <div>
                  <button
                    style={editBtn}
                    onClick={() =>
                      navigate(`/add-record?id=${item._id}`)
                    }
                  >
                    Edit
                  </button>

                  <button
                    style={deleteBtn}
                    onClick={() => deleteRecord(item._id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Records;


const containerStyle = {
  maxWidth: "800px",
  margin: "40px auto",
  padding: "20px",
};

const addBtnStyle = {
  padding: "10px 15px",
  marginBottom: "15px",
  border: "none",
  borderRadius: "6px",
  background: "#28a745",
  color: "white",
  cursor: "pointer",
};

const filterBox = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
  marginBottom: "20px",
};

const inputStyle = {
  padding: "8px",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

const filterBtn = {
  padding: "8px 12px",
  border: "none",
  borderRadius: "5px",
  background: "#2563eb",
  color: "white",
  cursor: "pointer",
};

const listStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
};

const cardStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "15px",
  borderRadius: "10px",
  background: "#f9f9f9",
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
};

const editBtn = {
  marginRight: "10px",
  padding: "6px 10px",
  border: "none",
  borderRadius: "5px",
  background: "#007bff",
  color: "white",
  cursor: "pointer",
};

const deleteBtn = {
  padding: "6px 10px",
  border: "none",
  borderRadius: "5px",
  background: "#dc3545",
  color: "white",
  cursor: "pointer",
};