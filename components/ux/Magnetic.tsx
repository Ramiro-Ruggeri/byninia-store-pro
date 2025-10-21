"use client";
import { useRef } from "react";

export default function Magnetic({
  children,
  strength = 0.25,
}: {
  children: React.ReactNode;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  function onMove(e: React.MouseEvent) {
    const el = ref.current!;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    el.style.transform = `translate(${x}px, ${y}px)`;
  }
  function onLeave() {
    const el = ref.current!;
    el.style.transform = "translate(0px,0px)";
  }
  return (
    <div onMouseMove={onMove} onMouseLeave={onLeave} className="inline-block">
      <div ref={ref} className="will-change-transform">
        {children}
      </div>
    </div>
  );
}
