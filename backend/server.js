const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");
const express = require("express");
const db = require("./db.js"); // Database connection

const app = express();

// Middleware
const allowedOrigins = (process.env.CORS_ORIGINS || "").split(",").map((o) => o.trim()).filter(Boolean);
app.use(cors({
  origin: allowedOrigins.length ? allowedOrigins : "*",
}));

// Routes
const productsRoute = require("./routes/productsRoute");
const ordersRoute = require("./routes/ordersRoute");
const uploadRoute = require("./routes/uploadRoute");
const razorpayWebhookRoute = require("./routes/razorpayWebhookRoute");

// Must be registered before express.json so the webhook signature is checked against the raw body
app.use("/api/webhooks/razorpay", express.raw({ type: "application/json" }), razorpayWebhookRoute);

app.use(express.json()); // To parse JSON request bodies

app.use("/api/products", productsRoute);
app.use("/api/orders", ordersRoute);
app.use("/api/upload", uploadRoute);

// Port configuration should be set before using it
const port = process.env.PORT || 8000;

// Root route (optional)
app.get("/", (req, res) => {
    res.send("Server working 🔥 on port " + port);
});

// Health check route for uptime monitoring
app.get("/ping", (req, res) => {
  console.log("pong");
  res.status(200).send("pong");
});

app.use((req, res) => {
    res.status(404).send("Route not found");
});

// Start server
app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});