require("dotenv").config();
require("express-async-errors"); //used to monkeypatch asyncMiddleware on routes
// so you don't have to put try catch blocks on all the async functions used in your routes
const winston = require("winston");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const categoryRoutes = require("./routes/category");
const oderRoutes = require("./routes/order");
const messageRoutes = require("./routes/message");
const braintreeRoutes = require("./routes/braintree");

const addCorsHeaders = require("./customMiddleware/addCorsHeaders");
const error = require("./customMiddleware/error");

const PORT = process.env.PORT || 8000;
const mongoURI = process.env.MONGO_URI;

process.on("uncaughtException", ex => {
  console.log("exception", ex);
  winston.error(ex.message, ex);
  exit(1);
});
process.on("unhandledRejection", ex => {
  console.log("Promise resulted in Unhandled Rejection", ex);
  winston.error(ex.message, ex);
  exit(1);
});

winston.add(new winston.transports.File({ filename: "logfile.log" }));

mongoose
  .connect(mongoURI, { useCreateIndex: true, useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB..."));

// Middlewares
app.use(express.json());
app.use(addCorsHeaders);

// Routes Middleware
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", productRoutes);
app.use("/api", categoryRoutes);
app.use("/api", oderRoutes);
app.use("/api", messageRoutes);
app.use("/api", braintreeRoutes);

// error handling middleware make sure to put it at bottom of middlewares
app.use(error);

if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("ecomm1-client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'ecomm1-client', 'build', 'index.html'))
  });
}

app.listen(PORT, console.log(`Listening on port ${PORT}`));
