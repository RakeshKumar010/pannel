const express = require("express");
const dbConnect = require("./db/db");
const app = express();
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const productRoutes = require("./routes/product.routes");
// 1️ Connect to MongoDB
dbConnect();

// 2️ Middleware to parse cookies
app.use(cookieParser());

// 3️ CORS configuration (allow frontend & send cookies)
app.use(
  cors({
    origin: ["https://dmartindia.vercel.app", "http://localhost:5173"],
    credentials: true,
  })
);

// 4️ Middleware to parse incoming JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 5️  routes mounting
app.use("/api/test", (req, res) => {
  res.send("test route is working");
});
app.use("/api/v1/product", productRoutes);
// 6️ Global error handler (should be last)
app.use(errorHandler);

//Ready to export
module.exports = app;
