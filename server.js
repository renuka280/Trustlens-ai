const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const authRoutes = require("./routes/authRoutes");
const claimRoutes = require("./routes/claimRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/claims", claimRoutes);
app.get("/", (req, res) => {
  res.json({
    message: "TrustLens API is running",
    endpoints: ["/api/auth/register", "/api/auth/login", "/api/auth/me", "/api/claims"],
  });
});
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("MongoDB Error:", err);
    process.exit(1);
  }
}

connectDB();