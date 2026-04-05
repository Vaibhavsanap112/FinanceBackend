import { useEffect, useState } from "react";
import API from "../Services/api";
import Navbar from "../Component/Navbar";

function Dashboard() {
  const [data, setData] = useState(null);
  const [trends, setTrends] = useState(null);

   const cardStyle = (bg) => ({
    padding: "20px",
    background: bg,
    borderRadius: "12px",
    minWidth: "150px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  });

  const sectionStyle = {
    marginBottom: "25px",
    padding: "15px",
    background: "#f9f9f9",
    borderRadius: "10px",
  };

  // fetch summary
  const fetchDashboard = async () => {
    try {
      const res = await API.get("/dashboard/summary");
      setData(res.data);
    } catch (error) {
      alert("Error loading dashboard");
    }
  };

  // fetch trends
  const fetchTrends = async () => {
    try {
      const res = await API.get("/dashboard/trends");
      setTrends(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDashboard();
    fetchTrends();
  }, []);

  if (!data) return <h2>Loading...</h2>;

return (
 
  <div style={{ padding: "30px", fontFamily: "Arial" }}>
     <Navbar />
    <h2 style={{ marginBottom: "20px" }}>📊 Dashboard</h2>

    {/* Cards */}
    <div
      style={{
        display: "flex",
    gap: "20px",
    marginBottom: "30px",
    flexWrap: "wrap",
    justifyContent: "center",
      }}
    >
      <div style={cardStyle("#d4edda")}>
        <h4>Total Income</h4>
        <p style={{ fontSize: "20px", fontWeight: "bold" }}>
          ₹{data.totalIncome}
        </p>
      </div>

      <div style={cardStyle("#f8d7da")}>
        <h4>Total Expense</h4>
        <p style={{ fontSize: "20px", fontWeight: "bold" }}>
          ₹{data.totalExpense}
        </p>
      </div>

      <div style={cardStyle("#d1ecf1")}>
        <h4>Balance</h4>
        <p style={{ fontSize: "20px", fontWeight: "bold" }}>
          ₹{data.balance}
        </p>
        <small>
          {data.balance >= 0 ? "💰 Saving" : "⚠️ Overspending"}
        </small>
      </div>
    </div>

    {/* Category Totals */}
    <section style={sectionStyle}>
      <h3>📂 Category Totals</h3>
      <ul>
        {Object.entries(data.categoryTotals).map(([cat, val]) => (
          <li key={cat}>
            {cat}: <strong>₹{val}</strong>
          </li>
        ))}
      </ul>
    </section>

    {/* Recent Activity */}
    <section style={sectionStyle}>
      <h3>🕒 Recent Activity</h3>
      <ul>
        {data.recent.map((rec) => (
          <li key={rec._id}>
            {rec.category} - ₹{rec.amount} ({rec.type})
          </li>
        ))}
      </ul>
    </section>

    {/* Monthly Trends */}
    <section style={sectionStyle}>
      <h3>📈 Monthly Trends</h3>
      <ul>
        {trends &&
          Object.entries(trends.monthly).map(([month, val]) => (
            <li key={month}>
              {month}: ₹{val}
            </li>
          ))}
      </ul>
    </section>
  </div>
);
}

export default Dashboard;