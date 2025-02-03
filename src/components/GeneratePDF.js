import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "../styles/index.css"; // Import the common CSS file

const GeneratePDF = ({ images }) => {
  const generatePDF = async () => {
    const pdf = new jsPDF("p", "mm", "a4");

    for (let i = 0; i < images.length; i++) {
      const img = images[i].preview;

      const imageElement = document.createElement("img");
      imageElement.src = img;
      imageElement.crossOrigin = "anonymous"; 

      const wrapper = document.createElement("div");
      wrapper.appendChild(imageElement);

      const loadImage = new Promise((resolve, reject) => {
        imageElement.onload = () => resolve(wrapper);
        imageElement.onerror = (err) => {
          console.error("Image load error:", err);
          reject(new Error("Error loading image"));
        };
      });

      try {
        const imageWrapper = await loadImage;
        document.body.appendChild(wrapper); 

        const canvas = await html2canvas(imageWrapper, {
          imageTimeout: 3000,
          useCORS: true,
        });

        const imgData = canvas.toDataURL("image/png");
        pdf.addImage(imgData, "PNG", 60, 60, 250, 0); 

        if (i !== images.length - 1) pdf.addPage(); 

        if (i === images.length - 1) {
          pdf.save("converted.pdf");
        }

        document.body.removeChild(wrapper);
      } catch (error) {
        console.error("Error generating canvas:", error);
      }
    }
  };

  return (
    <button onClick={generatePDF} className="button">
      Download PDF
    </button>
  );
};

export default GeneratePDF;


