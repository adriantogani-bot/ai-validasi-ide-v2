import { useState } from "react";

export default function App() {
  const [idea, setIdea] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const analyzeIdea = async () => {
    if (!idea.trim()) return;
    setLoading(true);
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
      setResult("❌ Gagal menghubungi backend");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white px-4 py-10">
      <div className="max-w-3xl mx-auto space-y-10">

        {/* Header */}
        <header className="space-y-3">
          <h1 className="text-3xl md:text-5xl font-bold">
            AI Validasi Ide Bisnis
          </h1>
          <p className="text-zinc-400 text-sm md:text-base">
            Analisis cepat kelayakan ide bisnis Anda menggunakan AI
          </p>
        </header>

        {/* Input Card */}
        <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-4">
          <label className="text-sm text-zinc-400">
            Deskripsikan ide bisnis Anda
          </label>

          <textarea
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            rows={4}
            placeholder="Contoh: Menjual skin care murah di bazaar Gen Z"
            className="w-full bg-black border border-zinc-700 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            onClick={analyzeIdea}
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 px-5 py-2 rounded-lg text-sm font-semibold"
          >
            {loading ? "Menganalisis..." : "Analisis Ide"}
          </button>
        </section>

        {/* Result */}
        {result && (
          <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-3">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              📊 Hasil Analisis AI
            </h2>

            <div className="text-sm text-zinc-200 whitespace-pre-line leading-relaxed max-h-[400px] overflow-y-auto">
              {result}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
