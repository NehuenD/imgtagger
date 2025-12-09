import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";

function App() {
  const [imageInfo, setImageInfo] = useState("");
  const [imagePath, setImagePath] = useState("");

  async function getImageInfo() {
    try {
      const info = await invoke("get_image_info", { path: imagePath });
      setImageInfo(info as string);
    } catch (error) {
      setImageInfo(`Error: ${error}`);
    }
  }

  return (
    <main className="container">
      <h1>Welcome ImgTagger</h1>
      <img src="/imgtagger.png" className="logo imgtagger" alt="ImgTagger" />

      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          getImageInfo();
        }}
      >
        <input
          id="image-input"
          onChange={(e) => setImagePath(e.currentTarget.value)}
          placeholder="Enter an image path..."
        />
        <button type="submit">Get Image Info</button>
      </form>
      <p>{imageInfo}</p>
    </main>
  );
}

export default App;
