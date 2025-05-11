import React, { useEffect, useRef, useState, useCallback } from "react";

export default function App() {
  const GOBY_DAEMON_PROMPTED_KEY = "gobyDaemonPrompted";
  const gobyDaemonRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasPromptedDaemon = useRef(false);

  const [userInteracted, setUserInteracted] = useState(false);
  const [diagnosticRunning, setDiagnosticRunning] = useState(false);
  const [threatDetected, setThreatDetected] = useState(false);

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

  return null;
}

function setMode(arg0: string) {
  throw new Error("Function not implemented.");
}
