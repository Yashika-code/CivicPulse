import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { User } from "./models/user.model.js";

dotenv.config();

async function seedAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Seed Super Admin
    const adminHashed = await bcrypt.hash("Admin@123", 10);
    const adminExists = await User.findOne({ email: "admin@civicpulse.com" });
    
    if (!adminExists) {
      await User.create({
        name: "Super Admin",
        email: "admin@civicpulse.com",
        password: adminHashed,
        role: "admin",
      });
      console.log("Super Admin seeded successfully");
    } else {
      console.log("Super Admin already exists");
    }

    // Seed Officer
    const officerHashed = await bcrypt.hash("Officer@123", 10);
    const officerExists = await User.findOne({ email: "officer@civicpulse.com" });
    
    if (!officerExists) {
      await User.create({
        name: "Test Officer",
        email: "officer@civicpulse.com",
        password: officerHashed,
        role: "officer",
      });
      console.log("Officer seeded successfully");
    } else {
      console.log("Officer already exists");
    }

    console.log("Seeding completed successfully");
    process.exit();
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
}

seedAdmin();
