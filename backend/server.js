import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js"
import recordRoutes from "./src/routes/recordRoutes.js"
import dashboardRoutes from "./src/routes/dashboardRoutes.js"

dotenv.config();

// connect database
connectDB();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/records",recordRoutes)
app.use("/api/v1/dashboard",dashboardRoutes);
app.use("/api/v1/dashboard/summary",dashboardRoutes)
app.use("/api/v1/dashboard/trends",dashboardRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});