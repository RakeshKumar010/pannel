const express = require("express");
const dbConnect = require("./db/db");
const app = express();
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const productRoutes = require("./routes/product.routes");
const orderRoutes = require("./routes/order.routes");

// Load environment variables
require("dotenv").config();

// Connect to MongoDB
dbConnect();

// Middleware to parse cookies
app.use(cookieParser());

// CORS configuration (allow frontend & send cookies)
app.use(
  cors({
    origin: ["https://dmartindia.vercel.app", "http://localhost:5173"],
    credentials: true,
  })
);

// Middleware to parse incoming JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes mounting
app.use("/api/test", (req, res) => {
  res.send("Test route is working");
});
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/orders", orderRoutes);

// Global error handler (should be last)
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 4003;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;