require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

const authRoutes = require("./routes/auth");

const PORT = process.env.PORT || 8000;
const mongoURI = process.env.MONGO_URI;

mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(console.log("connected to MongoDB..."))
  .catch(err => console.log(err));

// Middlewares
app.use(express.json());

// Routes Middleware
app.use("/api", authRoutes);

app.listen(PORT, console.log(`Listening on port ${PORT}`));
