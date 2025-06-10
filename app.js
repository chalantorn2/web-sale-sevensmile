const express = require("express");
const path = require("path");
const compression = require("compression");
const helmet = require("helmet");

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(
  helmet({
    contentSecurityPolicy: false, // สำหรับ inline styles/scripts
    crossOriginEmbedderPolicy: false,
  })
);

// Compression middleware
app.use(compression());

// Serve static files from dist directory
app.use(
  express.static(path.join(__dirname, "dist"), {
    maxAge: "1y", // Cache static assets for 1 year
    etag: true,
  })
);

// Handle client-side routing - ส่ง index.html สำหรับทุก route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📱 Environment: ${process.env.NODE_ENV || "development"}`);
});

module.exports = app;
