import React, { useState } from "react";

export function MemoryPanel() {
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");

  const load = async () => {
    const res = await fetch("/api/memory/" + key);
    const data = await res.json();
    setResult(data.value || "Not found");
  };

  const save = async () => {
    await fetch("/api/memory", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key, value })
    });
    setResult("Stored");
  };

  return (
    <div className="space-y-2">
      <input value={key} onChange={e => setKey(e.target.value)} placeholder="Key" className="border p-2 w-full rounded" />
      <input value={value} onChange={e => setValue(e.target.value)} placeholder="Value" className="border p-2 w-full rounded" />
      <div className="flex gap-2">
        <button onClick={load} className="bg-gray-800 text-white px-4 py-2 rounded">Get</button>
        <button onClick={save} className="bg-green-700 text-white px-4 py-2 rounded">Set</button>
      </div>
      <pre className="text-sm text-green-500 font-mono">{result}</pre>
    </div>
  );
}

