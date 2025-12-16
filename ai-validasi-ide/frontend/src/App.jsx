import { useState } from "react";

export default function App() {
  const [idea, setIdea] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const analyzeIdea = async () => {
    setLoading(true);
    setError("");
    setResult("");

    try {
      const res = await fetch(
        "https://ai-validasi-ide-backend.onrender.com/validate-idea",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idea }),
        }
      );

      const data = await res.json();
      setResult(data.result);
    } catch (err) {
      setError("❌ Gagal menghubungi server AI");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white px-4 py-10">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            AI Validasi Ide Bisnis
          </h1>
          <p className="text-gray-400 text-lg">
            Analisis cepat kelayakan ide bisnis menggunakan AI
          </p>
        </div>

        {/* Input Card */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-4 shadow-lg">
          <label className="block text-sm font-semibold text-gray-300">
            Deskripsikan ide bisnis Anda
          </label>

          <textarea
            rows="4"
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="Contoh: Menjual skincare murah untuk Gen Z di bazaar kampus"
            className="w-full rounded-lg bg-gray-800 border border-gray-700 p-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            onClick={analyzeIdea}
            disabled={loading || !idea}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 transition font-semibold py-3 rounded-lg"
          >
            {loading ? "Menganalisis..." : "Analisis Ide"}
          </button>

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}
        </div>

        {/* Result */}
        {result && (
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-4 shadow-lg">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              📊 Hasil Analisis AI
            </h2>

            <div className="prose prose-invert max-w-none text-gray-200 whitespace-pre-line">
              {result}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} AI Validasi Ide · Powered by OpenAI
        </div>
      </div>
    </div>
  );
}
