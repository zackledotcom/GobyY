import React, { useState } from "react";

export function SelfCheck() {
  const [status, setStatus] = useState<any>({});

  const runCheck = async () => {
    const res = await fetch("/api/selfcheck");
    const data = await res.json();
    setStatus(data);
  };

  return (
    <div>
      <button onClick={runCheck} className="bg-indigo-700 text-white px-4 py-2 rounded">Run Self-Check</button>
      <div className="text-sm font-mono mt-2 space-y-1">
        {Object.entries(status).map(([k, v]) => (
          <div key={k}><strong>{k}:</strong> {String(v)}</div>
        ))}
      </div>
    </div>
  );
}