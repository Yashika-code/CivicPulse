import express from "express";
import {
  registerCitizen,
  loginUser,
  logoutUser,
  refresh,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", registerCitizen);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/refresh",refresh);

export default router;
