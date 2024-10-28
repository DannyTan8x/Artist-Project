import "../SCSS/components/StarFollower.scss";

import { useState, useEffect, useRef } from "react";

export default function StarFollower() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [stars, setStars] = useState(
    Array.from({ length: 5 }, () => ({
      x: 0,
      y: 0,
      angle: Math.random() * 360, // Random start angle for orbiting
    }))
  );
  const starRefs = useRef(stars); // To avoid re-rendering on each mouse move

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Start animation loop
    let animationFrameId;
    const animateStars = () => {
      starRefs.current = starRefs.current.map((star, index) => {
        const dx = mousePosition.x - star.x;
        const dy = mousePosition.y - star.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const approachSpeed = 0.03; // Speed at which stars approach the pointer
        const orbitRadius = 50 + index * 10; // Radius of orbit
        const orbitSpeed = 1.5; // Speed of orbit
        const minDistanceToOrbit = 100; // Minimum distance to start orbiting

        if (distance > minDistanceToOrbit) {
          // Move towards the pointer smoothly
          return {
            ...star,
            x: star.x + dx * approachSpeed,
            y: star.y + dy * approachSpeed,
          };
        } else {
          // When close, orbit around the pointer
          const angle = star.angle + orbitSpeed; // Adjust this for orbit speed
          const xOffset = orbitRadius * Math.cos((angle * Math.PI) / 180);
          const yOffset = orbitRadius * Math.sin((angle * Math.PI) / 180);
          return {
            ...star,
            x: mousePosition.x + xOffset,
            y: mousePosition.y + yOffset,
            angle, // Update angle for continuous circular motion
          };
        }
      });

      setStars([...starRefs.current]);
      animationFrameId = requestAnimationFrame(animateStars);
    };

    animateStars();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePosition]);

  return (
    <>
      {stars.map((star, index) => (
        <div
          key={index}
          className="star"
          style={{
            left: `${star.x}px`,
            top: `${star.y}px`,
            transition: "transform 0.1s ease-out",
          }}
        />
      ))}
    </>
  );
}
