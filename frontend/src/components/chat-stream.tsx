import React, { useState } from "react";

export function ChatStream() {
  const [input, setInput] = useState("");
  const [log, setLog] = useState<string[]>([]);

  const send = async () => {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: input })
    });
    const data = await res.json();
    setLog([...log, "> " + input, data.response]);
    setInput("");
  };

  return (
    <div className="space-y-2">
      <div className="bg-gray-900 text-green-400 p-2 h-48 overflow-y-auto font-mono text-xs rounded">
        {log.map((line, i) => <div key={i}>{line}</div>)}
      </div>
      <div className="flex gap-2">
        <input value={input} onChange={e => setInput(e.target.value)} className="flex-1 p-2 border rounded" />
        <button onClick={send} className="bg-black text-white px-4 py-2 rounded">Send</button>
      </div>
    </div>
  );
}