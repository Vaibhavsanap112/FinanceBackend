import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div style={navStyle}>
     
      <div style={logoStyle} onClick={() => navigate("/dashboard")}>
        💰 FinanceTracker
      </div>

    
      <div style={linksContainer}>
        <span
          style={linkStyle(isActive("/dashboard"))}
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </span>

        {currentUser && currentUser.role !== "viewer" && (
          <span
            style={linkStyle(isActive("/records"))}
            onClick={() => navigate("/records")}
          >
            Records

          </span>
        )}

        {currentUser && currentUser.role === "admin" && (
          <span
            style={linkStyle(isActive("/add-record"))}
            onClick={() => navigate("/add-record")}
          >
            Add
          </span>
        )}

        {currentUser && currentUser.role === "admin" && (
  <span
    style={linkStyle(isActive("/users"))}
    onClick={() => navigate("/users")}
  >
    Users
  </span>
)}

        <span style={logoutStyle} onClick={handleLogout}>
          Logout
        </span>
      </div>
    </div>
  );
}

export default Navbar;



const navStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "12px 25px",
  background: "#111827",
  color: "white",
  boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
};

const logoStyle = {
  fontSize: "18px",
  fontWeight: "bold",
  cursor: "pointer",
};

const linksContainer = {
  display: "flex",
  gap: "20px",
  alignItems: "center",
};

const linkStyle = (active) => ({
  cursor: "pointer",
  padding: "6px 10px",
  borderRadius: "6px",
  background: active ? "#2563eb" : "transparent",
  transition: "0.3s",
});

const logoutStyle = {
  cursor: "pointer",
  padding: "6px 10px",
  borderRadius: "6px",
  background: "#dc3545",
  transition: "0.3s",
};