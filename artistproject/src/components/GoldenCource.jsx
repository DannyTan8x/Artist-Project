import { useState, useEffect } from "react";
import "../SCSS/components/GoldenCource.scss";

export default function GoldenCource() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Function to update the position of the circle based on the mouse event
  const handleMouseMove = (event) => {
    setPosition({
      x: event.pageX - 25, // Adjust to center the circle
      y: event.pageY - 25, // Adjust to center the circle
    });
  };

  // Adding the event listener on mount and removing on unmount
  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove); // Cleanup listener
    };
  }, []);

  return (
    <div
      className="circle"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    ></div>
  );
}
