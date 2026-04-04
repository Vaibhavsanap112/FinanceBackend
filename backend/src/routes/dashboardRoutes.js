import express from "express";

import { getSummary, getTrends } from "../controllers/dashboardController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get(
  "/summary",
  authMiddleware,
  allowRoles("admin","analyst","viewer"),
  getSummary
)

router.get(
  "/trends",
  authMiddleware,
  allowRoles("admin","analyst","viewer"),
  getTrends
);


export default router;