const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.json({ status: "Backend is running 🚀" });
});

app.post("/validate-idea", (req, res) => {
  const { idea } = req.body;

  res.json({
    success: true,
    idea,
    result: "Ide ini valid untuk diuji lebih lanjut (dummy response)"
  });
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
