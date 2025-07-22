import express from "express";
import {
  login,
  logout,
  register,
  SendOTP,
  verifyEmail,
} from "../controllers/authController.js";
import userAuth from "../middleware/userAuth.js";

//Created neW router
const authRouter = express.Router();

//suffix after server.js authRouter.js
authRouter.post("/register", register); // use post in Postman
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/send-verify-otp", userAuth, SendOTP);
authRouter.post("/verify-account", userAuth, verifyEmail);

export default authRouter;
