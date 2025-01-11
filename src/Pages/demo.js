import React, { useRef } from "react";
import "../Css/Sujal/ProductDetail.css"; // Add necessary styling here

const useZoomHandlers = () => {
  const containerRef = useRef(null);
  const imgRef = useRef(null);

  const handleMouseMove = (e) => {
    const container = containerRef.current;
    const img = imgRef.current;

    if (container && img) {
      const x = e.clientX - container.offsetLeft;
      const y = e.clientY - container.offsetTop;

      img.style.transformOrigin = `${x}px ${y}px`;
      img.style.transform = "scale(3)";
    }
  };

  const handleMouseLeave = () => {
    const img = imgRef.current;

    if (img) {
      img.style.transformOrigin = "center";
      img.style.transform = "scale(1)";
    }
  };

  return { containerRef, imgRef, handleMouseMove, handleMouseLeave };
};

const ImageZoom = () => {
  const firstZoomHandlers = useZoomHandlers();
  const secondZoomHandlers = useZoomHandlers();

  return (
    <>
      <div
        ref={firstZoomHandlers.containerRef}
        onMouseMove={firstZoomHandlers.handleMouseMove}
        onMouseLeave={firstZoomHandlers.handleMouseLeave}
        style={{
          overflow: "hidden",
          position: "relative",
          width: "400px",
          height: "300px",
        }}
      >
        <img
          ref={firstZoomHandlers.imgRef}
          src={require("../Img/Sujal/Ring1.png")} // Replace with your image URL
          alt="Zoomable 1"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.2s ease",
          }}
        />
      </div>

      <div
        ref={secondZoomHandlers.containerRef}
        onMouseMove={secondZoomHandlers.handleMouseMove}
        onMouseLeave={secondZoomHandlers.handleMouseLeave}
        style={{
          overflow: "hidden",
          position: "relative",
          width: "400px",
          height: "300px",
          marginTop: "20px", // Optional: Add spacing between images
        }}
      >
        <img
          ref={secondZoomHandlers.imgRef}
          src={require("../Img/Sujal/Ring1.png")} // Replace with your image URL
          alt="Zoomable 2"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.2s ease",
          }}
        />
      </div>
    </>
  );
};


export default ImageZoom;
