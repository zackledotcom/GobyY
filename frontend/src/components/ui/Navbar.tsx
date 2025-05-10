import React from "react";
import { ShieldCheck, Activity, Cpu } from "lucide-react";
import SentinelSpinner from "./SentinelSpinner";

export default function Navbar() {
  return (
    <header className="relative z-10 flex items-center justify-between px-6 py-3 border-b border-white/10 backdrop-blur">
      <div className="flex items-center gap-3 text-white/80">
        <ShieldCheck size={20} />
        <span className="text-sm font-semibold tracking-tight">Goby OS</span>
      </div>
      <div className="flex items-center gap-4 text-white/60">
        <Activity size={18} title="Diagnostics Active" />
        <Cpu size={18} title="LLM Engaged" />
      </div>
      <SentinelSpinner />
    </header>
  );
}