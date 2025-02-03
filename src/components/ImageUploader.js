import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import PreviewPDF from "./PreviewPDF";
import "../styles/index.css"; 

const resizeImage = (file, maxWidth = 550) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();
    
    reader.onload = (e) => {
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        const scaleFactor = Math.min(maxWidth / img.width, 1);
        const width = img.width * scaleFactor;
        const height = img.height * scaleFactor;

        canvas.width = width;
        canvas.height = height;

        context.drawImage(img, 0, 0, width, height);

        canvas.toBlob((blob) => {
          resolve(URL.createObjectURL(blob));
        });
      };

      img.src = e.target.result;
    };

    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

const ImageUploader = ({ images, setImages }) => {
  const [showPreview, setShowPreview] = useState(false);
  
  const onDrop = async (acceptedFiles) => {
    const resizedImages = await Promise.all(
      acceptedFiles.map(async (file) => {
        const preview = await resizeImage(file, 550);
        return Object.assign(file, { preview });
      })
    );

    setImages((prevImages) => [...prevImages, ...resizedImages]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    onDrop,
  });

  return (
    <div className="container">
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <h2>Drag & Drop or Click to Upload Images (JPG, PNG)</h2>
      </div>

      {images.length > 0 && (
        <button onClick={() => setShowPreview(!showPreview)} className="button">
          {showPreview ? "Hide Preview" : "Show Preview"}
        </button>
      )}

      {showPreview && <PreviewPDF images={images} />}
    </div>
  );
};

export default ImageUploader;




