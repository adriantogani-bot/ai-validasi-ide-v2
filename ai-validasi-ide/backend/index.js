const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "Backend AI Validasi Ide is running 🚀"
  });
});

// ✅ ROUTE ROOT (WAJIB)
app.get("/", (req, res) => {
  res.json({ status: "Backend is running 🚀" });
});

// ✅ ROUTE API
app.post("/validate-idea", (req, res) => {
  const { idea } = req.body;

  if (!idea) {
    return res.status(400).json({ error: "Idea is required" });
  }

  res.json({
    idea,
    score: 75,
    verdict: "Potensial",
    notes: "Ini masih mock response"
  });
});

// ✅ PORT WAJIB UNTUK RENDER
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
