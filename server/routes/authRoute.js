import express from "express";
import { login, logout, register } from "../controllers/authController.js";

//Created neW router
const authRouter = express.Router();

//suffix after server.js authRouter.js
authRouter.post("/register", register); // use post in Postman
authRouter.post("/login", login);
authRouter.post("/logout", logout);

export default authRouter;
