import React, { useEffect, useState } from "react";

export function HealthPanel() {
  const [info, setInfo] = useState<any>({});

  useEffect(() => {
    fetch("/api/diagnostics")
      .then(res => res.json())
      .then(setInfo);
  }, []);

  return (
    <div className="text-sm font-mono space-y-1">
      {Object.entries(info).map(([k, v], i) => (
        <div key={i}><strong>{k}</strong>: {String(v)}</div>
      ))}
    </div>
  );
}