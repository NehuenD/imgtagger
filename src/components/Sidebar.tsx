
interface SidebarProps {
    onSelectFolder: () => void;
    onAnalyze: () => void;
    folderName: string | null;
    imageCount: number;
}

export function Sidebar({ onSelectFolder, onAnalyze, folderName, imageCount }: SidebarProps) {
    return (
        <aside className="sidebar">
            <div style={{ marginBottom: "2rem", display: "flex", alignItems: "center", gap: "10px" }}>
                <img src="/imgtagger.png" alt="Logo" style={{ width: "32px", height: "32px" }} />
                <h2 style={{ margin: 0, fontSize: "1.2rem", fontWeight: 700 }}>ImgTagger</h2>
            </div>

            <div style={{ marginBottom: "2rem" }}>
                <p style={{
                    fontSize: "0.8rem",
                    textTransform: "uppercase",
                    color: "var(--text-secondary)",
                    fontWeight: "bold",
                    marginBottom: "1rem"
                }}>
                    Workspace
                </p>

                <button className="btn-secondary" style={{ width: "100%", marginBottom: "1rem", textAlign: "left" }} onClick={onSelectFolder}>
                    📁 {folderName ? folderName : "Select Folder"}
                </button>

                {folderName && (
                    <div style={{ padding: "10px", background: "var(--glass-bg)", borderRadius: "8px" }}>
                        <small style={{ color: "var(--text-secondary)" }}>Images found:</small>
                        <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{imageCount}</div>
                    </div>
                )}
            </div>

            <div style={{ flex: 1 }}>
                <p style={{
                    fontSize: "0.8rem",
                    textTransform: "uppercase",
                    color: "var(--text-secondary)",
                    fontWeight: "bold",
                    marginBottom: "1rem"
                }}>
                    Actions
                </p>
                <button
                    className="btn-primary"
                    style={{ width: "100%" }}
                    onClick={onAnalyze}
                    disabled={!folderName || imageCount === 0}
                >
                    ✨ Analyze & Tag
                </button>
            </div>

            <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "1rem" }}>
                <button className="btn-secondary" style={{ width: "100%", textAlign: "left", border: "none", background: "transparent", padding: "8px 0", color: "var(--text-secondary)" }}>
                    ⚙️ Settings
                </button>
            </div>
        </aside>
    );
}
