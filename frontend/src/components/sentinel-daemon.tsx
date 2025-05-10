import React, { useState } from "react";

export function SentinelDaemon() {
  const [status, setStatus] = useState("");

  const run = async () => {
    const res = await fetch("/api/mode/sentinel");
    const data = await res.json();
    setStatus(data.status || "None");
  };

  return (
    <div>
      <button onClick={run} className="bg-red-600 text-white px-4 py-2 rounded">Run Sentinel</button>
      <div className="text-sm mt-1 font-mono">{status}</div>
    </div>
  );
}