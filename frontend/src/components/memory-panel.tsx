import React, { useState } from "react";

export function MemoryPanel() {
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    setResult("");
    try {
      const res = await fetch("/api/memory/" + key);
      if (!res.ok) throw new Error("Failed to load memory");
      const data = await res.json();
      setResult(data.value || "Not found");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const save = async () => {
    setLoading(true);
    setError(null);
    setResult("");
    try {
      const res = await fetch("/api/memory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, value })
      });
      if (!res.ok) throw new Error("Failed to save memory");
      setResult("Stored");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <input 
        value={key} 
        onChange={e => setKey(e.target.value)} 
        placeholder="Key" 
        className="border p-2 w-full rounded" 
      />
      <input 
        value={value} 
        onChange={e => setValue(e.target.value)} 
        placeholder="Value" 
        className="border p-2 w-full rounded" 
      />
      <div className="flex gap-2">
        <button 
          onClick={load} 
          disabled={loading} 
          className="bg-gray-800 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? "Loading..." : "Get"}
        </button>
        <button 
          onClick={save} 
          disabled={loading} 
          className="bg-green-700 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? "Saving..." : "Set"}
        </button>
      </div>
      {error && (
        <div className="text-sm text-red-500 font-mono">Error: {error}</div>
      )}
      <pre className="text-sm text-green-500 font-mono">{result}</pre>
    </div>
  );
}