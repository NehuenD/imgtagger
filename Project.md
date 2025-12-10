# Project: Intelligent Image Tagger & Organizer

## Overview
A desktop application built with Tauri (Rust) and React to intelligently manage large local image libraries. The app aims to solve the problem of organizing thousands of uncategorized images by using AI to tag and sort them automatically.

## Core Goals
1.  **Smart Analysis**: Use LLMs/Vision models to analyze image content and generate descriptive tags.
2.  **Automated Organization**: Automatically move or sort images into folder structures based on generated tags.
3.  **Scalable Cataloging**: Provide a performant and easy-to-use interface for browsing, filtering, and managing libraries containing hundreds or thousands of images.
4.  **Local-First Privacy**: Run processing locally (where possible) or securely to ensure personal photos remain private.

## Current Status: Scaffolding (Active)
The foundational architecture is successfully established.

### Completed Scaffolding
-   **Tech Stack**:
    -   **Frontend**: React + TypeScript + Vite.
    -   **Backend**: Tauri (Rust) for system interaction.
    -   **Styling**: Vanilla CSS for flexibility.
-   **Features Implemented**:
    -   **File System Integration**: Rust commands (`scan_directory`, `move_file`) allow the app to read directory contents and manipulate files.
    -   **UI Structure**:
        -   `Sidebar`: For folder selection and navigation.
        -   `ImageGrid`: Basic responsive grid layout to display scanned images.
        -   `App.tsx`: State management for selected folders and image data.
    -   **Mock Analysis**: A placeholder function testing the "Analyze" flow logic.

## Next Steps
-   **Integrate AI Model**: Connect to an actual Vision LLM (e.g., Ollama/Llava locally or OpenAI Vision API) to replace the mock analysis.
-   **Implement Tagging Data Structure**: Create a robust way to store and persist tags (e.g., local database or sidecar JSON files).
-   **Develop Catalog Views**: Enhance the UI to support filtering, searching, and bulk actions for large datasets.
