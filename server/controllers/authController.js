// To perform Login and Sign up

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import trans from "../config/nodemailer.js";

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

    //Sending Welcome Email
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email, // Logged in mail's
      subject: "Welcome Abroad",
      text: `Welcome to website. Your account has been created successfully with email id: ${email}`,
    };

    await trans.sendMail(mailOptions);

    return res.json({ success: true });
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

// Send verification otp to the email
// Controller func
export const SendOTP = async () => {
  try {
    //Verify user id
    const { userId } = req.body;
    const user = await userModel.findById(userId);

    if (user.isAccountVerified) {
      return res.json({
        success: false,
        message: "Account already verified, Continue log in",
      });
    }

    //generate OTP using random()
    const OTP = String(Math.float(100000 + Math.random() * 900000)); //value in float and cnvrt to string

    //Storing in db
    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000; // expiry time is 1 day

    //Save the data
    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email, // Logged in mail's
      subject: "Account verification OTP",
      text: `Your otp is ${otp}. Verify using the given otp to login`,
    };

    //To send the mail
    await trans.sendMail(mailOptions);

    res.json({ success: true, message: "Verification OTP sent to the mail" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// To verify the email on many scenarios if true or not
export const verifyEmail = async (req, res) => {
  const { userId, otp } = req.body;

  if (!userId) {
    return res.json({ success: false, message: "Missing details User ID" });
  }
  if (!otp) {
    return res.json({ success: false, message: "Missing details OTP" });
  }

  try {
    // If all are entered
    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    //if otp stored in db is "" or not the crt otp entered
    if (user.verifyOtp === "" || user.verifyOtp !== otp) {
      return res.json({ success: false, message: "Invalid OTP" });
    }

    if (user.verifyOtpExpireAt < Date.now()) {
      return res.json({ success: false, message: "OTP Expired" });
    }

    user.isAccountVerified = true; // making it true as verfied
    user.verifyOtp = " "; // Empty string
    user.verifyOtpExpireAt = 0;

    await user.save(); // saving the data
    return res.json({
      success: true,
      message: "Email verified successfully. Continue to dashboard",
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
