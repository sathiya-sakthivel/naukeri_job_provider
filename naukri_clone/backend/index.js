// server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const OpenAI = require("openai");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "mysecret";

app.use(cors());
app.use(express.json());

// --- MySQL Database Connection ---
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_NAME || "naukri_clone",
});

db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
    process.exit(1);
  }
  console.log("✅ MySQL connected...");
});

// --- OpenAI setup ---
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// --- TEST ROUTE ---
app.get("/", (req, res) => {
  res.send("🚀 Naukri Clone Backend Running ✅");
});

// --- AUTH ROUTES ---
// Register
app.post("/api/auth/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: "All fields required" });

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
    if (err) return res.status(500).json({ message: "Server error" });
    if (results.length > 0)
      return res.status(409).json({ message: "Email already registered" });

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      db.query(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        [name, email, hashedPassword],
        (err, result) => {
          if (err) return res.status(500).json({ message: "Error registering user" });

          const token = jwt.sign({ id: result.insertId, email }, JWT_SECRET, {
            expiresIn: "1h",
          });
          res.json({ message: "User registered successfully", token });
        }
      );
    } catch {
      res.status(500).json({ message: "Server error" });
    }
  });
});

// Login
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
    if (err) return res.status(500).json({ message: "Login failed" });
    if (results.length === 0)
      return res.status(401).json({ message: "Invalid credentials" });

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({
      message: "Login successful",
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  });
});

// --- JOB ROUTES ---
app.get("/api/jobs", (req, res) => {
  db.query("SELECT * FROM jobs", (err, results) => {
    if (err) return res.status(500).json({ message: "Error fetching jobs" });
    res.json(results);
  });
});

app.post("/api/jobs", (req, res) => {
  const { title, company, location, description } = req.body;
  if (!title || !company || !location || !description)
    return res.status(400).json({ message: "All fields required" });

  db.query(
    "INSERT INTO jobs (title, company, location, description) VALUES (?, ?, ?, ?)",
    [title, company, location, description],
    (err, result) => {
      if (err) return res.status(500).json({ message: "Error adding job" });
      res.json({ message: "Job posted successfully", jobId: result.insertId });
    }
  );
});

// --- EMPLOYER DASHBOARD ROUTES ---
// Get employer stats
app.get("/api/dashboard/:employerId", (req, res) => {
  const employerId = req.params.employerId;
  const stats = { totalJobs: 0, activeJobs: 0, applicants: 0, hires: 0 };

  // Total jobs
  db.query("SELECT COUNT(*) AS total FROM jobs WHERE employer_id = ?", [employerId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    stats.totalJobs = results[0].total;

    // Active jobs
    db.query(
      "SELECT COUNT(*) AS active FROM jobs WHERE employer_id = ? AND status = 'active'",
      [employerId],
      (err2, results2) => {
        if (err2) return res.status(500).json({ error: err2.message });
        stats.activeJobs = results2[0].active;

        // Applicants
        db.query(
          "SELECT COUNT(*) AS applicants FROM applications a JOIN jobs j ON a.job_id = j.id WHERE j.employer_id = ?",
          [employerId],
          (err3, results3) => {
            if (err3) return res.status(500).json({ error: err3.message });
            stats.applicants = results3[0].applicants;

            // Hires
            db.query(
              "SELECT COUNT(*) AS hires FROM applications a JOIN jobs j ON a.job_id = j.id WHERE j.employer_id = ? AND a.status = 'hired'",
              [employerId],
              (err4, results4) => {
                if (err4) return res.status(500).json({ error: err4.message });
                stats.hires = results4[0].hires;
                res.json(stats);
              }
            );
          }
        );
      }
    );
  });
});

// Jobs posted per month (for chart)
app.get("/api/dashboard/:employerId/monthly", (req, res) => {
  const employerId = req.params.employerId;
  db.query(
    `SELECT DATE_FORMAT(created_at, '%b') AS month, COUNT(*) AS count
     FROM jobs
     WHERE employer_id = ?
     GROUP BY MONTH(created_at)
     ORDER BY MIN(created_at) ASC`,
    [employerId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
});

// --- AI CHATBOT ROUTE ---
app.post("/api/chatbot", async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ message: "Message is required" });

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: message }],
      max_tokens: 200,
    });

    const reply = response.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    console.error("❌ OpenAI error:", err.response?.data || err.message);
    res.status(500).json({
      reply: "Error connecting to AI assistant",
      error: err.response?.data || err.message,
    });
  }
});

// --- CATCH-ALL ---
app.all("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// --- START SERVER ---
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
