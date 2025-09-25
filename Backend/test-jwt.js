// JWT Test Script - Run this to verify JWT consistency
const { JWT_SECRET } = require("./config/jwt");
console.log("JWT_SECRET loaded:", JWT_SECRET);

// Test JWT creation and verification
const jwt = require("jsonwebtoken");

const testPayload = { userId: "test123", role: "user" };
const token = jwt.sign(testPayload, JWT_SECRET, { expiresIn: "1h" });
console.log("Test token created:", token);

try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("Test token verified successfully:", decoded);
    console.log("✅ JWT system is working correctly!");
} catch (err) {
    console.log("❌ JWT verification failed:", err.message);
}