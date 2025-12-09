export interface ImageFile {
    path: string;
    filename: string;
}

export type ProcessingStatus = 'idle' | 'analyzing' | 'done' | 'error';

export interface TaggingResult {
    path: string;
    tags: string[];
    newPath?: string; // If moved
}

export interface AppState {
    currentPath: string;
    images: ImageFile[];
    status: ProcessingStatus;
    selectedImage: string | null;
}
