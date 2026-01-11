import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { User } from "./models/user.model.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

const hashed = await bcrypt.hash("Admin@123", 10);
const exists = await User.findOne({ email: "admin@civicpulse.com" });
if (exists) {
  console.log("Admin already exists");
  process.exit();
}

await User.create({
  name: "Super Admin",
  email: "admin@civicpulse.com",
  password: hashed,
  role: "admin",
});

console.log("Admin seeded");
process.exit();
