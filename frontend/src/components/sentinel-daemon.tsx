import React, { useState } from "react";

export function SentinelDaemon() {
  const [status, setStatus] = useState<string>("");

  const run = async () => {
    try {
      const res = await fetch("/api/mode/sentinel");
      if (!res.ok) throw new Error("Failed to fetch sentinel status");
      const data = await res.json();
      setStatus(data.status || "No status available");
    } catch (error) {
      setStatus("Error: Unable to fetch sentinel status");
    }
  };

  return (
    <div>
      <button
        onClick={run}
        className="bg-red-600 text-white px-4 py-2 rounded"
      >
        Run Sentinel
      </button>
      <div className="text-sm mt-1 font-mono">{status}</div>
    </div>
  );
}