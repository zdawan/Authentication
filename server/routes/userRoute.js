import express from "express";
import userAuth from "../middleware/userAuth.js"; //Confirm .js While importing
import { getUser } from "../controllers/userController.js";

const userRouter = express.Router(); //backend

userRouter.get("/data", userAuth, getUser); // "path", middleware, controller

export default userRouter;
