import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";
import { ModeToggle } from "@/mode-toggle";
import { ChatStream } from "@/chat-stream";
import { ScanPanel } from "@/scan-panel";
import { MemoryPanel } from "@/memory-panel";
import { HealthPanel } from "@/health-panel";
import { ApexMode } from "@/apex-mode";
import { SentinelDaemon } from "@/sentinel-daemon";
import { DiagnosticsPanel } from "@/diagnostics";
import { UploadLogs } from "@/upload-logs";
import { ObjectivePlanner } from "@/objective-planner";
import { ChainOfThought } from "@/chain-of-thought";
import { SelfCheck } from "@/self-check";
import { KernelPanel } from "@/kernel";
import { Watcher } from "@/watcher";
import { AuthGate } from "@/auth";

export default function App() {
  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <div className="flex items-center justify-between p-4 border-b">
        <h1 className="text-2xl font-bold tracking-tight">Goby</h1>
        <ModeToggle />
      </div>
      <Tabs defaultValue="chat" className="p-4">
        <TabsList className="grid grid-cols-6 gap-2">
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="network">Network</TabsTrigger>
          <TabsTrigger value="memory">Memory</TabsTrigger>
          <TabsTrigger value="health">Health</TabsTrigger>
          <TabsTrigger value="modes">Modes</TabsTrigger>
          <TabsTrigger value="tools">Tools</TabsTrigger>
        </TabsList>
        <TabsContent value="chat"><ChatStream /></TabsContent>
        <TabsContent value="network"><ScanPanel /></TabsContent>
        <TabsContent value="memory"><MemoryPanel /></TabsContent>
        <TabsContent value="health"><HealthPanel /></TabsContent>
        <TabsContent value="modes">
          <div className="space-y-4">
            <ApexMode />
            <SentinelDaemon />
            <Watcher />
          </div>
        </TabsContent>
        <TabsContent value="tools">
          <div className="space-y-4">
            <DiagnosticsPanel />
            <UploadLogs />
            <ObjectivePlanner />
            <ChainOfThought />
            <SelfCheck />
            <KernelPanel />
            <AuthGate />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}