import React, { useState } from "react";

export function UploadLogs() {
  const [log, setLog] = useState("");

  const fetchLogs = async () => {
    const res = await fetch("/api/tools/logs");
    const data = await res.text();
    setLog(data);
  };

  return (
    <div className="space-y-2">
      <button onClick={fetchLogs} className="bg-orange-600 text-white px-4 py-2 rounded">Fetch Logs</button>
      <pre className="bg-gray-900 text-green-300 p-2 rounded h-48 overflow-y-auto text-sm">{log}</pre>
    </div>
  );
}