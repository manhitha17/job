const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// Job Schema
const JobSchema = new mongoose.Schema({
  title: String,
  company: String,
  description: String,
  location: String
});
const Job = mongoose.model("Job", JobSchema);

// Routes
app.get("/jobs", async (req, res) => {
  const jobs = await Job.find();
  res.json(jobs);
});

app.post("/jobs", async (req, res) => {
  const newJob = new Job(req.body);
  await newJob.save();
  res.json(newJob);
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
