import React, { useState } from 'react';

const NetworkTool: React.FC = () => {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const runScan = async () => {
    setScanning(true);
    setResult('');
    setError(null);

    try {
      const response = await fetch('/api/scan');
      if (!response.ok) {
        throw new Error(`Scan failed: ${response.statusText}`);
      }
      const data = await response.json();
      setResult(data.message || 'Scan complete. No issues found.');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setScanning(false);
    }
  };

  return (
    <div className="p-4">
      <button 
        onClick={runScan} 
        disabled={scanning} 
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded disabled:opacity-50"
      >
        {scanning ? 'Scanning...' : 'Run Scan'}
      </button>
      {result && (
        <div className="mt-3 p-3 bg-gray-200 dark:bg-gray-800 rounded">
          <pre>{result}</pre>
        </div>
      )}
      {error && (
        <div className="mt-3 p-3 bg-red-200 dark:bg-red-800 text-red-900 dark:text-red-100 rounded">
          <pre>Error: {error}</pre>
        </div>
      )}
    </div>
  );
};

export default NetworkTool;
