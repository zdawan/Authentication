import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/userRoute.js";

const app = express();
const port = process.env.PORT || 4000;
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true }));


// API Endpoints
app.get("/", (req, res) => res.send("Running API"));
app.use("/api/auth", authRouter); // prefix before authRoutes.js
app.use("/api/user", userRouter); // prefix before userRoutes.js
app.listen(port, () => console.log(`PORT Successfully started at ${port}`));
