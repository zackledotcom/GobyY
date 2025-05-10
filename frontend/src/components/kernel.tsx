import React, { useState } from "react";

export function KernelPanel() {
  const [log, setLog] = useState("");

  const fetchLogs = async () => {
    const res = await fetch("/api/tools/kernel");
    const text = await res.text();
    setLog(text);
  };

  return (
    <div className="space-y-2">
      <button onClick={fetchLogs} className="bg-zinc-800 text-white px-4 py-2 rounded">Kernel Log Dump</button>
      <pre className="text-green-400 text-xs bg-black p-2 rounded h-64 overflow-y-auto">{log}</pre>
    </div>
  );
}