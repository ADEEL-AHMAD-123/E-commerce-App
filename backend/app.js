const express = require("express");
const ErrorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// Config
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({
    path: path.join('./config/.env', "config", ".env")
  });
}

// Connect Database
const connectDB = require("./db/db-connection");
connectDB();

// Import routes
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
// Error handling middleware
app.use(ErrorHandler);

module.exports = app;
