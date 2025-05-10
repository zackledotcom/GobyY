import React, { useState } from "react";

export function ObjectivePlanner() {
  const [objectives, setObjectives] = useState([]);

  const fetchObjectives = async () => {
    const res = await fetch("/api/tools/objectives");
    const data = await res.json();
    setObjectives(data);
  };

  return (
    <div className="space-y-2">
      <button onClick={fetchObjectives} className="bg-purple-700 text-white px-4 py-2 rounded">Get Objectives</button>
      <ul className="list-disc list-inside text-sm">
        {objectives.map((obj: any, i) => (
          <li key={i}>{obj.task} ({obj.priority})</li>
        ))}
      </ul>
    </div>
  );
}