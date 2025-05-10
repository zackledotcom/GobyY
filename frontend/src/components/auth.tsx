import React, { useState } from "react";

export function AuthGate() {
  const [token, setToken] = useState("");
  const [status, setStatus] = useState("Not verified");

  const verify = async () => {
    const res = await fetch("/api/auth/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token })
    });
    const data = await res.json();
    setStatus(data.access || "Denied");
  };

  return (
    <div className="space-y-2">
      <input value={token} onChange={e => setToken(e.target.value)} className="border p-2 rounded w-full" placeholder="Enter token..." />
      <button onClick={verify} className="bg-green-700 text-white px-4 py-2 rounded w-full">Verify Access</button>
      <p className="font-mono text-sm">{status}</p>
    </div>
  );
}