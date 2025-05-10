import React, { useState } from "react";

export function ScanPanel() {
  const [output, setOutput] = useState("");

  const run = async () => {
    const res = await fetch("/api/scan");
    const data = await res.json();
    setOutput(data.scan || "No result");
  };

  return (
    <div>
      <button onClick={run} className="bg-blue-600 text-white px-4 py-2 rounded">Run Scan</button>
      <pre className="bg-black text-green-300 p-2 text-xs rounded h-48 mt-2 overflow-y-auto">{output}</pre>
    </div>
  );
}