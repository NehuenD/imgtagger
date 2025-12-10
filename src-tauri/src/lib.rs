// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use serde::Serialize;
use std::fs;
use std::path::Path;
use walkdir::WalkDir;

#[derive(Serialize)]
struct ImageFile {
    path: String,
    filename: String,
}

#[tauri::command]
fn get_image_info(path: &str) -> Result<String, String> {
    let image = image::open(path).map_err(|e| format!("Failed to open image: {}", e))?;
    let width = image.width();
    let height = image.height();
    Ok(format!("{}x{}", width, height))
}

#[tauri::command]
fn scan_directory(path: &str) -> Result<Vec<ImageFile>, String> {
    let mut images = Vec::new();
    for entry in WalkDir::new(path).into_iter().filter_map(|e| e.ok()) {
        let path = entry.path();
        if path.is_file() {
            if let Some(extension) = path.extension() {
                let ext = extension.to_string_lossy().to_lowercase();
                if ["jpg", "jpeg", "png", "webp", "gif"].contains(&ext.as_str()) {
                    images.push(ImageFile {
                        path: path.to_string_lossy().to_string(),
                        filename: path
                            .file_name()
                            .unwrap_or_default()
                            .to_string_lossy()
                            .to_string(),
                    });
                }
            }
        }
    }
    Ok(images)
}

#[tauri::command]
fn move_file(source: &str, destination: &str) -> Result<(), String> {
    let dest_path = Path::new(destination);
    if let Some(parent) = dest_path.parent() {
        fs::create_dir_all(parent).map_err(|e| format!("Failed to create directory: {}", e))?;
    }
    fs::rename(source, destination).map_err(|e| format!("Failed to move file: {}", e))?;
    Ok(())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_dialog::init())
        .invoke_handler(tauri::generate_handler![
            get_image_info,
            scan_directory,
            move_file
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
