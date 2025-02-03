import React, { useState } from "react";
import ImageUploader from "./components/ImageUploader";
import ImageReorder from "./components/ImageReorder";
import GeneratePDF from "./components/GeneratePDF";

function App() {
  const [images, setImages] = useState([]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Image to PDF Converter</h1>
      
      {/* Image Upload */}
      <ImageUploader images={images} setImages={setImages} />

      {/* Reorder Images */}
      <ImageReorder images={images} setImages={setImages} />



      {/* Generate and Download PDF */}
      {images.length > 0 && <GeneratePDF images={images} />}
    </div>
  );
}

export default App;

