import React, { useRef, useState } from 'react';
import '../Css/Sujal/ProductDetail.css'; // Ensure to include the CSS for styling

const ZoomableImage = () => {
    const containerRef = useRef(null);
    const imageRef = useRef(null);
  
    const [isDragging, setIsDragging] = useState(false);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });
    const [currentOffset, setCurrentOffset] = useState({ x: 0, y: 0 });
  
    const handleMouseDown = (e) => {
      setIsDragging(true);
      const rect = containerRef.current.getBoundingClientRect();
      setStartPos({
        x: e.clientX - rect.left - currentOffset.x,
        y: e.clientY - rect.top - currentOffset.y,
      });
    };
  
    const handleMouseMove = (e) => {
      if (!isDragging) return;
  
      const rect = containerRef.current.getBoundingClientRect();
      const newX = e.clientX - rect.left - startPos.x;
      const newY = e.clientY - rect.top - startPos.y;
  
      setCurrentOffset({ x: newX, y: newY });
  
      if (imageRef.current) {
        imageRef.current.style.transform = `translate(${newX}px, ${newY}px) scale(1.5)`;
      }
    };
  
    const handleMouseUpOrLeave = () => {
      setIsDragging(false);
    };
  
    const handleMouseEnter = () => {
      if (imageRef.current) {
        imageRef.current.style.transform = `scale(1.5)`; // Zoom in
      }
    };
  
    const handleMouseLeave = () => {
      if (!isDragging && imageRef.current) {
        setCurrentOffset({ x: 0, y: 0 });
        imageRef.current.style.transform = `translate(0px, 0px) scale(1)`; // Reset zoom
      }
    };
  
    return (
      <div
        className="image-container"
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        onMouseEnter={handleMouseEnter}
      >
        <img
          ref={imageRef}
          src="https://via.placeholder.com/600"
          alt="Zoomable"
          className="zoom-image"
        />
      </div>
    );
  };
  
  export default ZoomableImage;

