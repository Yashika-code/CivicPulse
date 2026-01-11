import express from "express";
import {
  createOfficer,
  assignOfficer,
  getAllComplaints,
  getAllOfficers,
} from "../controllers/admin.controller.js";
import { protect, allowRole } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create-officer", protect, allowRole("admin"), createOfficer);
router.post("/assign-officer", protect, allowRole("admin"), assignOfficer);
router.get("/complaints", protect, allowRole("admin"), getAllComplaints);
router.get("/officers", protect, allowRole("admin"), getAllOfficers);

export default router;
