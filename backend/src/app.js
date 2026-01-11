import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import complaintRoutes from "./routes/complaint.routes.js";

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL || true,
    credentials:true,
    methods: ['GET','POST','PUT','DELETE','OPTIONS'],
    allowedHeaders: ['Content-type','Authorization','Accept']
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/complaints", complaintRoutes);

export default app;
