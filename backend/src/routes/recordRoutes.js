import express from "express"

import { createRecord, getRecords, deleteRecord,updateRecord } from "../controllers/recordController.js"

import authMiddleware from "../middleware/authMiddleware.js"

import { allowRoles } from "../middleware/roleMiddleware.js"


const router = express.Router();

router.put("/:id", authMiddleware, allowRoles("admin"), updateRecord);
router.delete("/:id",authMiddleware,allowRoles("admin"), deleteRecord)
router.post("/",authMiddleware , allowRoles("admin"), createRecord);
router.get("/", authMiddleware,allowRoles("admin", "analyst"), getRecords);

export default router;