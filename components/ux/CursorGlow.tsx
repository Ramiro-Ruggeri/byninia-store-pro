"use client";
import { motion } from "framer-motion";

import React, { useState, useEffect } from "react";

// Este componente crea un pequeño punto luminoso que sigue al cursor,
// añadiendo un toque "underground" y sutilmente futurista.

export default function CursorGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Ajuste para asegurar que la posición sea relativa al viewport
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Limpieza del evento
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none transition-transform duration-75 ease-out z-0 mix-blend-multiply"
      style={{
        transform: `translate(${position.x - 16}px, ${position.y - 16}px)`, // Centrar el div en el cursor
        boxShadow: "0 0 40px 10px rgba(0, 0, 0, 0.1)", // Sombra sutil y oscura
        backgroundColor: "rgba(150, 150, 150, 0.05)", // Color gris muy transparente
      }}
    />
  );
}
