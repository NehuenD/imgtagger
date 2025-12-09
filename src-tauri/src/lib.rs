// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn get_image_info(path: &str) -> Result<String, String> {
    let image = image::open(path).map_err(|e| format!("Failed to open image: {}", e))?;
    let width = image.width();
    let height = image.height();
    Ok(format!("Image info: {}x{}", width, height))
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![get_image_info])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
