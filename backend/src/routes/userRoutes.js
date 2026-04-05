import express from "express"
import { getAllUsers,updateUser } from "../controllers/userController.js"

import { allowRoles } from "../middleware/roleMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router  = express.Router();



router.get("/",authMiddleware,allowRoles("admin"), getAllUsers);
router.put("/:id", authMiddleware,allowRoles("admin"), updateUser);


export default router;