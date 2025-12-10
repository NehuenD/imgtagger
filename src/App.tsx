import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { open } from "@tauri-apps/plugin-dialog";
import "./App.css";
import { Sidebar } from "./components/Sidebar";
import { ImageGrid } from "./components/ImageGrid";
import { StatusBadge } from "./components/StatusBadge";
import { ImageFile, ProcessingStatus } from "./types";

function App() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [currentFolder, setCurrentFolder] = useState<string | null>(null);
  const [status, setStatus] = useState<ProcessingStatus>("idle");
  const [_selectedImage, setSelectedImage] = useState<ImageFile | null>(null);

  async function handleSelectFolder() {
    try {
      const selected = await open({
        directory: true,
        multiple: false,
      });

      if (selected && typeof selected === "string") {
        setCurrentFolder(selected);
        scanFolder(selected);
      }
    } catch (error) {
      console.error("Failed to select folder", error);
    }
  }

  async function scanFolder(path: string) {
    setStatus("analyzing");
    try {
      const result = await invoke("scan_directory", { path });
      setImages(result as ImageFile[]);
      setStatus("idle");
    } catch (error) {
      console.error("Scan failed", error);
      setStatus("error");
    }
  }

  async function handleAnalyze() {
    if (!currentFolder) return;
    setStatus("analyzing");

    // Mocking the analysis process for scaffolding
    setTimeout(() => {
      setStatus("done");
      alert("Mock Analysis Complete! Images would be tagged now.");
    }, 2000);
  }

  return (
    <div className="app-container">
      <Sidebar
        onSelectFolder={handleSelectFolder}
        folderName={currentFolder ? currentFolder.split(/[\\/]/).pop() || currentFolder : null}
        imageCount={images.length}
        onAnalyze={handleAnalyze}
      />

      <main className="main-content">
        <header className="top-bar">
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: "1.2rem", margin: 0 }}>Library</h1>
          </div>
          <StatusBadge status={status} />
        </header>

        <div className="content-area">
          <ImageGrid images={images} onSelect={setSelectedImage} />
        </div>
      </main>
    </div>
  );
}

export default App;
