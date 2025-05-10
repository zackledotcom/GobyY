import React, { useState } from 'react';

const NetworkTool: React.FC = () => {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<string>('');

  const runScan = () => {
    setScanning(true);
    setResult(''); // clear previous result
    // Simulate a network scan with a timeout
    setTimeout(() => {
      setResult('Scan complete. No issues found.');
      setScanning(false);
    }, 2000);
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
    </div>
  );
};

export default NetworkTool;
