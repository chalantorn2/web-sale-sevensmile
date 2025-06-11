// api/routes/contact.js - Contact Routes
import express from "express";
import { insertOne } from "../middleware/database.js";

const router = express.Router();

// POST /api/contact - Submit contact form
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        error: "กรุณากรอกข้อมูลให้ครบถ้วน",
        required: ["name", "email", "subject", "message"],
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: "รูปแบบอีเมลไม่ถูกต้อง",
      });
    }

    // Insert to database
    const result = await insertOne("contacts", {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : null,
      subject: subject.trim(),
      message: message.trim(),
      status: "new",
      is_read: 0,
      created_at: new Date(),
      updated_at: new Date(),
    });

    if (result.success) {
      console.log(
        `✅ New contact form submitted: ID ${result.data.id} from ${email}`
      );

      res.json({
        success: true,
        message: "ส่งข้อความสำเร็จ เราจะติดต่อกลับโดยเร็วที่สุด",
        data: {
          id: result.data.id,
          submittedAt: new Date().toISOString(),
        },
      });
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    console.error("❌ Contact form error:", error.message);

    // Log submission attempt for manual follow-up
    console.log("📝 Contact form data (for manual processing):", {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      subject: req.body.subject,
      message: req.body.message?.substring(0, 100) + "...",
      timestamp: new Date().toISOString(),
    });

    res.status(500).json({
      success: false,
      error:
        "เกิดข้อผิดพลาดในการส่งข้อความ กรุณาลองใหม่อีกครั้ง หรือติดต่อโดยตรงที่ 095-265-5516",
      fallback: {
        phone: "095-265-5516",
        email: "sevensmiletour@gmail.com",
        line: "@sevensmile",
      },
    });
  }
});

// POST /api/group-tour - Submit group tour inquiry
router.post("/group-tour", async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      groupType,
      groupSize,
      destination,
      departureDate,
      returnDate,
      accommodation,
      transportation,
      budget,
      additionalRequests,
    } = req.body;

    // Validation
    if (!name || !email || !phone || !groupType || !groupSize || !destination) {
      return res.status(400).json({
        success: false,
        error: "กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน",
        required: [
          "name",
          "email",
          "phone",
          "groupType",
          "groupSize",
          "destination",
        ],
      });
    }

    // Insert to database
    const result = await insertOne("group_tour_requests", {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      groupType: groupType,
      groupSize: groupSize,
      destination: destination,
      departureDate: departureDate || null,
      returnDate: returnDate || null,
      accommodation: accommodation || null,
      transportation: transportation || null,
      budget: budget || null,
      additionalRequests: additionalRequests || null,
      status: "pending",
      is_read: 0,
      created_at: new Date(),
      updated_at: new Date(),
    });

    if (result.success) {
      console.log(
        `✅ New group tour inquiry: ID ${result.data.id} - ${groupSize} people to ${destination}`
      );

      res.json({
        success: true,
        message:
          "ส่งคำขอกรุ๊ปทัวร์สำเร็จ เราจะติดต่อกลับเพื่อเสนอราคาและโปรแกรมภายใน 24 ชั่วโมง",
        data: {
          id: result.data.id,
          submittedAt: new Date().toISOString(),
        },
      });
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    console.error("❌ Group tour inquiry error:", error.message);

    // Log inquiry for manual follow-up
    console.log("📝 Group tour inquiry (for manual processing):", {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      groupType: req.body.groupType,
      groupSize: req.body.groupSize,
      destination: req.body.destination,
      timestamp: new Date().toISOString(),
    });

    res.status(500).json({
      success: false,
      error: "เกิดข้อผิดพลาดในการส่งคำขอ กรุณาติดต่อโดยตรงที่ 095-265-5516",
      fallback: {
        phone: "095-265-5516",
        email: "sevensmiletour@gmail.com",
        line: "@sevensmile",
      },
    });
  }
});

export default router;
