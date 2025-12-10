import { ImageFile } from "../types";
import { convertFileSrc } from "@tauri-apps/api/core";

interface ImageGridProps {
    images: ImageFile[];
    onSelect: (image: ImageFile) => void;
}

export function ImageGrid({ images, onSelect }: ImageGridProps) {
    if (images.length === 0) {
        return (
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                color: "var(--text-secondary)",
                flexDirection: "column",
                gap: "1rem"
            }}>
                <p>No images found or folder not selected.</p>
            </div>
        );
    }

    return (
        <div className="image-grid animate-fade-in">
            {images.map((img) => (
                <div
                    key={img.path}
                    className="image-card"
                    onClick={() => onSelect(img)}
                >
                    <img
                        src={convertFileSrc(img.path)}
                        alt={img.filename}
                        loading="lazy"
                    />
                </div>
            ))}
        </div>
    );
}
