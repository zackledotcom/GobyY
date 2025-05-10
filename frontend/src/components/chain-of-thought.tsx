import React, { useState } from "react";

export function ChainOfThought() {
  const [input, setInput] = useState("");
  const [chain, setChain] = useState<string[]>([]);

  const getChain = async () => {
    const res = await fetch("/api/tools/reasoning?prompt=" + encodeURIComponent(input));
    const data = await res.json();
    setChain(data.chain || []);
  };

  return (
    <div className="space-y-2">
      <input value={input} onChange={e => setInput(e.target.value)} className="border p-2 w-full rounded" placeholder="Type a question..." />
      <button onClick={getChain} className="bg-slate-900 text-white px-4 py-2 rounded">Trace Reasoning</button>
      <div className="text-sm mt-2 font-mono bg-slate-100 p-2 rounded space-y-1">
        {chain.map((step, i) => <div key={i}>{i + 1}. {step}</div>)}
      </div>
    </div>
  );
}