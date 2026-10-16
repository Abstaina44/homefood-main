import { Router } from "express";
import rateLimit from "express-rate-limit";
import nodemailer from "nodemailer";

const router = Router();

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, code: "RATE_LIMIT", message: "Too many contact requests from this IP" }
});

router.post("/", contactLimiter, async (req, res, next) => {
  try {
    const { name, email, phone, message } = req.body ?? {};

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and message are required."
      });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    await transporter.sendMail({
      from: `"HomeFood Contact Form" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO,
      replyTo: email,
      subject: `New contact message from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || "Not provided"}`,
        "",
        "Message:",
        message
      ].join("\n")
    });

    return res.json({
      success: true,
      message: "Message sent successfully."
    });
  } catch (error) {
    next(error);
  }
});

export default router;
