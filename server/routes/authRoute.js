import express from "express";
import {
  isAuth,
  login,
  logout,
  register,
  resetOTP,
  resetPass,
  SendOTP,
  verifyEmail,
} from "../controllers/authController.js";
import userAuth from "../middleware/userAuth.js";

//Created neW router
const authRouter = express.Router();

//suffix after server.js authRouter.js
authRouter.post("/register", register); // use post in Postman
authRouter.post("/login", login); // "path", module, 
authRouter.post("/logout", logout); // "path", module, 
authRouter.post("/send-verify-otp", userAuth, SendOTP); // "path", middle, module, 
authRouter.post("/verify-email", userAuth, verifyEmail); // "path", middle, module, 
authRouter.post("/is-auth", userAuth, isAuth); // "path", middle, module, 
authRouter.post("/send-reset-otp", resetOTP); // "path", module, 
authRouter.post("/reset-password", resetPass); // "path", module, 

export default authRouter;
