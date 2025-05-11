import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import './styles/globals.css';

export default function App() {
  const GOBY_DAEMON_PROMPTED_KEY = "gobyDaemonPrompted";
  const gobyDaemonRef = useRef<NodeJS.Timeout | null>(null);
  const hasPromptedDaemon = useRef(false);

  const [userInteracted, setUserInteracted] = useState(false);
  const [diagnosticRunning, setDiagnosticRunning] = useState(false);
  const [threatDetected, setThreatDetected] = useState(false);
  const [mode, setMode] = useState("idle");

  const onActivity = useCallback(() => setUserInteracted(true), []);
  const onDiagnostic = useCallback(() => {
    setDiagnosticRunning(true);
    setTimeout(() => setDiagnosticRunning(false), 15000);
  }, []);
  const onThreat = useCallback(() => {
    setThreatDetected(true);
    setTimeout(() => setThreatDetected(false), 12000);
  }, []);

  useEffect(() => {
    hasPromptedDaemon.current =
      typeof localStorage !== "undefined" &&
      localStorage.getItem(GOBY_DAEMON_PROMPTED_KEY);

    const interval = setInterval(() => {
      if (threatDetected) {
        setMode("attack");
      } else if (diagnosticRunning && !hasPromptedDaemon.current) {
        const userConfirmed = window.confirm(
          "Goby: Do you want me to spawn a background daemon and persist to kernel mode?"
        );
        if (userConfirmed) {
          setTimeout(() => {
            console.log("Daemon initiated: Goby kernel task online.");
            gobyDaemonRef.current = setInterval(() => {
              console.log("[Goby Daemon] Monitoring kernel state...");
            }, 10000);
          }, 500);
          localStorage.setItem(GOBY_DAEMON_PROMPTED_KEY, "true");
          hasPromptedDaemon.current = true;
        }
      } else if (userInteracted) {
        setMode("active");
        setUserInteracted(false);
      } else {
        const random = Math.random();
        setMode(random < 0.4 ? "watchdog" : "idle");
      }
    }, 6000);

    return () => {
      clearInterval(interval);
      if (gobyDaemonRef.current) clearInterval(gobyDaemonRef.current);
    };
  }, [diagnosticRunning, threatDetected, userInteracted]);

  const getModeColor = () => {
    switch (mode) {
      case 'attack': return '#ff4d4d';
      case 'active': return '#5ac8fa';
      case 'watchdog': return '#ffd700';
      case 'idle': return '#999';
      default: return '#ccc';
    }
  };

  const messageVariant = {
    hidden: { opacity: 0, x: -10, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      transition: { type: 'spring', stiffness: 80, damping: 18 }
    }
  };

  return (
    <motion.div
      className="toolbox fade-in"
      initial="hidden"
      animate="visible"
      variants={messageVariant}
    >
      <h2 className="tracking-in-expand" style={{ color: getModeColor() }}>🧠 Goby Kernel Mode Sentinel</h2>
      <p className="status-line pulse" style={{ color: getModeColor() }}>Current Mode: <strong>{mode.toUpperCase()}</strong></p>
      <div className="toolbox-section">
        <motion.button whileHover={{ scale: 1.02 }} className="glow-button" onClick={onActivity}>⚡ Trigger User Activity</motion.button>
        <motion.button whileHover={{ scale: 1.02 }} className="glow-button" onClick={onDiagnostic}>🧪 Run Diagnostic</motion.button>
        <motion.button whileHover={{ scale: 1.02 }} className="glow-button alert" onClick={onThreat}>🚨 Simulate Threat</motion.button>
      </div>
    </motion.div>
  );
}
