import express from "express";
import {upload} from "../middlewares/upload.middleware.js"
import {
  createComplaint,
  getMyComplaints,
  getAssignedComplaints,
  updateComplaintStatus,
} from "../controllers/complaint.controller.js";
import { protect, allowRole } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", protect, allowRole("citizen"),upload.array("images",5), createComplaint);
router.get("/my", protect, allowRole("citizen"), getMyComplaints);
router.get("/assigned", protect, allowRole("officer"), getAssignedComplaints);
router.put("/:id/status", protect, allowRole("officer"), updateComplaintStatus);
export default router;
