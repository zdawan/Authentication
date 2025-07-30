import express from "express";
import {
  isAuth,
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
authRouter.post("/verify-email", userAuth, verifyEmail);
authRouter.post("/is-auth", userAuth, isAuth); // "path", module, auth

export default authRouter;
