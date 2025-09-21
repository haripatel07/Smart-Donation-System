const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");

// Import Routes
const authRoutes = require("./routes/auth");
const categoryRoutes = require("./routes/categories");
const donationRoutes = require("./routes/donations");

const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/donations", donationRoutes);


// Connect Database
connectDB();

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
