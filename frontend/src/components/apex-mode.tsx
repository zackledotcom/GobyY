import React, { useState } from "react";

export function ApexMode() {
  const [msg, setMsg] = useState("");

  const trigger = async () => {
    const res = await fetch("/api/mode/apex");
    const data = await res.json();
    setMsg(data.status || "No response");
  };

  return (
    <div>
      <button onClick={trigger} className="bg-yellow-500 px-4 py-2 text-white rounded">Activate Apex</button>
      <div className="text-sm mt-2 font-mono">{msg}</div>
    </div>
  );
}