import React, { useState } from "react";

export function DiagnosticsPanel() {
  const [result, setResult] = useState("");

  const runCheck = async () => {
    const res = await fetch("/api/diagnostics");
    const data = await res.json();
    setResult(JSON.stringify(data, null, 2));
  };

  return (
    <div className="space-y-2">
      <button onClick={runCheck} className="bg-blue-600 text-white px-4 py-2 rounded">Run Diagnostics</button>
      <pre className="bg-black text-green-400 p-2 rounded h-64 overflow-y-auto text-xs">{result}</pre>
    </div>
  );
}