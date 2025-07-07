import nodemailer from "nodemailer";

const trans = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: process.env.SMTP_USER, // To access info or data from .env file
    pass: process.env.SMTP_PASS, // To access info or data from .env file
  },
});

export default trans;
