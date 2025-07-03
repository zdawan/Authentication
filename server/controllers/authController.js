// To perform Login and Sign up

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

//New User Controller
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({ success: false, message: "Missing Details" });
  }

  try {
    const existingUSer = await userModel.findOne({ email });
    if (existingUSer) {
      return res.json({ success: false, message: "Already Exists" });
    }

    // If All details available
    const hashedPassword = await bcrypt.hash(password, 10); // 10 ill take less time to encrypt passord

    //iF NEW user
    const user = new userModel({ name, email, password: hashedPassword });
    await user.save();

    //Generate token using JWT, setting expire date
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // development === production : FALSE
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // ms of 7 days
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Existing User Controller
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      success: false,
      message: "Email and Password are required",
    });
  }

  try {
    //Check user available
    const user = await userModel.findOne({ email });

    //IF not any user
    if (!user) {
      return res.json({ success: false, message: "Invalid E-Mail" });
    }

    const isMatch = await bcrypt.compare(password, user.password); // comparing current pass and stored pass

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid Password" });
    }

    //Generate token using JWT, setting expire date
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    //Sending response
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // development === production : FALSE
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // ms of 7 days
    });

    // User login Successfully
    return res.json({ success: true });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// Logout Controller

export const logout = async (req, res) => {
  try {
    // Clear cookie from res (response)
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // development === production : FALSE
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    return res.json({ success: true, message: "Logged Out" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
