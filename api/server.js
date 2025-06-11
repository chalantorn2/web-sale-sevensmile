// api/server.js - Main API Server (ES Module)
import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";

const app = express();
const PORT = process.env.API_PORT || 3001;

// Rate limiting configuration
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per windowMs
  message: {
    success: false,
    error: "Too many requests, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per windowMs for contact forms
  message: {
    success: false,
    error: "Too many contact submissions, please try again later.",
  },
});

// Middleware
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

app.use(compression());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:4173",
      "http://localhost:3000",
      "https://sevensmiletourandticket.com", // ✅ เพิ่ม https://
      "https://www.sevensmiletourandticket.com", // ✅ เพิ่ม https://
      "http://sevensmiletourandticket.com", // ✅ เพิ่ม http:// (สำหรับ redirect)
      "http://www.sevensmiletourandticket.com", // ✅ เพิ่ม http:// (สำหรับ redirect)
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Apply rate limiting
app.use("/api/", generalLimiter);

// Import routes
import toursRoutes from "./routes/tours.js";
import contactRoutes from "./routes/contact.js";
import galleryRoutes from "./routes/gallery.js";

// Routes
app.use("/api/tours", toursRoutes);
app.use("/api/contact", contactLimiter, contactRoutes);
app.use("/api/gallery", galleryRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Seven Smile API Server is running",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

// Test database connection endpoint
app.get("/api/test-db", async (req, res) => {
  try {
    const { testConnection } = await import("./middleware/database.js");
    const result = await testConnection();

    if (result.success) {
      res.json({
        success: true,
        message: "Database connection successful",
        data: result.data,
      });
    } else {
      res.status(500).json({
        success: false,
        error: "Database connection failed",
        details: result.error,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Database test failed",
      details: error.message,
    });
  }
});

// 404 handler for API routes
app.use("/api/*", (req, res) => {
  res.status(404).json({
    success: false,
    error: "API endpoint not found",
    path: req.originalUrl,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("API Error:", err);
  res.status(500).json({
    success: false,
    error: "Internal server error",
    ...(process.env.NODE_ENV === "development" && { details: err.message }),
  });
});

// Start server
const startServer = async () => {
  try {
    // Test database connection on startup
    const { testConnection } = await import("./middleware/database.js");
    const dbTest = await testConnection();

    if (dbTest.success) {
      console.log("✅ Database connection successful");
    } else {
      console.warn(
        "⚠️ Database connection failed, but server will start anyway"
      );
      console.warn("Error:", dbTest.error);
    }

    app.listen(PORT, () => {
      console.log(`🚀 Seven Smile API Server running on port ${PORT}`);
      console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
      console.log(`🔗 Test DB: http://localhost:${PORT}/api/test-db`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
      console.log(`📊 Rate limits: General 100/15min, Contact 5/15min`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("🛑 SIGTERM received, shutting down gracefully");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("🛑 SIGINT received, shutting down gracefully");
  process.exit(0);
});

startServer();

export default app;
