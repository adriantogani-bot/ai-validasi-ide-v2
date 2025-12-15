import { useState } from "react";

export default function App() {
  const [idea, setIdea] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submitIdea = async () => {
    if (!idea.trim()) return;

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
      setError("Gagal menghubungi AI. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100 flex justify-center px-4 py-12">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-4xl font-bold mb-2">
            AI Validasi Ide Bisnis
          </h1>
          <p className="text-zinc-400">
            Analisis cepat kelayakan ide bisnis Anda dengan AI
          </p>
        </header>

        {/* Input */}
        <div className="bg-zinc-800 rounded-xl p-6 shadow-lg mb-6">
          <label className="block text-sm mb-2 text-zinc-400">
            Deskripsikan ide bisnis Anda
          </label>
          <textarea
            rows={4}
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="Contoh: Menjual pakaian bekas premium di mall besar"
            className="w-full rounded-lg bg-zinc-900 border border-zinc-700 p-4 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />

          <button
            onClick={submitIdea}
            disabled={loading}
            className="mt-4 w-full bg-emerald-500 hover:bg-emerald-600 text-black font-semibold py-3 rounded-lg transition disabled:opacity-50"
          >
            {loading ? "Menganalisis..." : "Analisis Ide"}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-400 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="bg-zinc-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              📊 Hasil Analisis AI
            </h2>

            <div className="whitespace-pre-wrap text-zinc-200 leading-relaxed">
              {result}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
