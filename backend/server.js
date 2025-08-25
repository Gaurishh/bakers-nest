const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");
const express = require("express");
const Product = require("./models/productModel");
const db = require("./db.js"); // Database connection

const app = express();

// Middleware
app.use(cors({
  origin: "*",
}));

app.use(express.json()); // To parse JSON request bodies

// Routes
const productsRoute = require("./routes/productsRoute");
const ordersRoute = require("./routes/ordersRoute");

app.use("/api/products", productsRoute);
app.use("/api/orders", ordersRoute);

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