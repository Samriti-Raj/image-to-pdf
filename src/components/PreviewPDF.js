import React from "react";
import "../styles/index.css";

const PreviewPDF = ({ images }) => {
  return (
    <div className="pdf-preview">
      <h2 className="header">PDF Preview</h2>
      <div className="image-preview-container">
        {images.map((image, index) => (
          <div key={index} className="relative">
            <img src={image.preview} alt={`Preview ${index + 1}`} className="pdf-image" />
            <span className="pdf-page-label">Page {index + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreviewPDF;



