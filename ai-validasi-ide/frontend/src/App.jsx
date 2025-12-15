import { useState } from "react";

function App() {
  const [idea, setIdea] = useState("");
  const [result, setResult] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;fetch(`${API_URL}/validate-idea`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ idea }),
});
  const handleSubmit = async () => {
    setResult("⏳ Mengirim ide ke backend...");
    
    try {
      const res = await fetch("https://ai-validasi-ide.onrender.com/validate-idea", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idea }),
      });

      const data = await res.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (err) {
      setResult("❌ Gagal menghubungi backend");
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "600px", margin: "auto" }}>
      <h1>AI Validasi Ide Bisnis</h1>

      <textarea
        rows="5"
        style={{ width: "100%" }}
        placeholder="Tulis ide bisnis kamu di sini..."
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
      />

      <button onClick={handleSubmit} style={{ marginTop: "16px" }}>
        Validasi Ide
      </button>

      <pre style={{ marginTop: "24px", background: "#111", color: "#0f0", padding: "16px" }}>
        {result}
      </pre>
    </div>
  );
}

export default App;
