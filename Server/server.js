import express from "express";

import dotenv from "dotenv";

import cors from "cors";

import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";

import authRoutes from "./routes/User/authRoutes.js";

import userRoutes from "./routes/User/userRoutes.js";

import adminRoute from "./routes/adminRoute.js";


dotenv.config();


connectDB();


const app = express();




app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);



app.use("/api/auth", authRoutes);

app.use("/api/user", userRoutes);

app.use("/api/admin", adminRoute);





app.get("/", (req, res) => {
  res.send("Backend Running Successfully");
});



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});