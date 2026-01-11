import { User } from "../models/user.model.js";
import { Complaint } from "../models/complaint.model.js";
import bcrypt from "bcryptjs";

export const createOfficer = async (req, res) => {
  const { name, email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists)
    return res.status(400).json({ message: "Officer already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);

  const officer = await User.create({
    name,
    email,
    password: hashedPassword,
    role: "officer",
  });

  res.status(201).json({ message: "Officer created", officer });
};

export const assignOfficer = async (req, res) => {
  const { complaintId, officerId } = req.body;

  // 🔹 CHECK 1: officer exists & role is officer
  const officer = await User.findById(officerId);
  if (!officer || officer.role !== "officer") {
    return res.status(400).json({ message: "Invalid officer" });
  }

  // 🔹 CHECK 2: complaint exists
  const complaint = await Complaint.findById(complaintId);
  if (!complaint) {
    return res.status(404).json({ message: "Complaint not found" });
  }

  // 🔹 ASSIGN OFFICER
  complaint.assignedOfficer = officerId;
  complaint.status = "in-progress";
  await complaint.save();

  res.json({ message: "Officer assigned", complaint });
};

export const getAllComplaints = async (req, res) => {
  const complaints = await Complaint.find()
    .populate("citizen", "name email")
    .populate("assignedOfficer", "name email");

  res.json(complaints);
};

export const getAllOfficers = async (req, res) => {
  const officers = await User.find({ role: "officer" }).select("-password");
  res.json(officers);
};
