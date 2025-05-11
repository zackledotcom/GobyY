import React, { useState } from "react";

interface Objective {
  task: string;
  priority: string;
}

export function ObjectivePlanner() {
  const [objectives, setObjectives] = useState<Objective[]>([]);

  const fetchObjectives = async () => {
    try {
      const res = await fetch("/api/tools/objectives");
      if (!res.ok) throw new Error("Failed to fetch objectives");
      const data = await res.json();
      setObjectives(data);
    } catch (error) {
      setObjectives([]);
    }
  };

  return (
    <div className="space-y-2">
      <button
        onClick={fetchObjectives}
        className="bg-purple-700 text-white px-4 py-2 rounded"
      >
        Get Objectives
      </button>
      <ul className="list-disc list-inside text-sm">
        {objectives.length > 0 ? (
          objectives.map((obj, i) => (
            <li key={i}>
              {obj.task} ({obj.priority})
            </li>
          ))
        ) : (
          <li>No objectives available</li>
        )}
      </ul>
    </div>
  );
}