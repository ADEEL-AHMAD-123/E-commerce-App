const express = require("express");
const ErrorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const cloudinary = require('cloudinary').v2;
const Multer = require('multer');
const catchAsyncErrors = require("./middleware/catchAsyncErrors"); // Import your catchAsyncErrors middleware
const Product = require("./models/productModel"); // Import your Product model

const app = express();
require("dotenv").config();

// Body parsing middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// Cookie parsing middleware
app.use(cookieParser());

// CORS middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

// Serve static files from 'uploads' directory
app.use("/", express.static("uploads"));

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Database connection
const connectDB = require("./db/db-connection");
connectDB();

// Routes
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

// Error handling middleware
app.use(ErrorHandler);

// Export the app
module.exports = app;
