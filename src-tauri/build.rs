fn main() {
    println!("cargo:warning=Starting tauri_build::build()");
    tauri_build::build();
    println!("cargo:warning=Finished tauri_build::build()");
}
