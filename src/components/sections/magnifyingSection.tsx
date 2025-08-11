"use client";
import React, { useState, useRef } from 'react';
import styles from './magnifyingSection.module.css';

interface MagnifyingSectionProps {
  title?: string;
  description?: string;
  titleColor: string;
  descColor: string;
  magnifyColor?: string;
  stickColor?: string;
  textCentered?: boolean;
  bgColor?: string;
}

export default function MagnifyingSection({title, description, titleColor, descColor, magnifyColor, stickColor, textCentered, bgColor}: MagnifyingSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pointer, setPointer] = useState<{ x: number; y: number }>({ x: -1000, y: -1000 });
  const [isMouseInSection, setIsMouseInSection] = useState(false);

  // Update pointer position logic
  const updatePointer = (clientX: number, clientY: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setPointer({
        x: clientX - rect.left,
        y: clientY - rect.top
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsMouseInSection(true);
    updatePointer(e.clientX, e.clientY);
  };

  const handleMouseLeave = () => {
    setIsMouseInSection(false);
    setPointer({ x: -1000, y: -1000 });
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsMouseInSection(true);
    const t = e.touches[0];
    updatePointer(t.clientX, t.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const t = e.touches[0];
    updatePointer(t.clientX, t.clientY);
  };

  const handleTouchEnd = () => {
    setIsMouseInSection(false);
    setPointer({ x: -1000, y: -1000 });
  };

  const clip = `circle(80px at ${pointer.x}px ${pointer.y}px)`;
  
  // Create a white background mask for the magnified area
  const maskClip = `circle(79px at ${pointer.x}px ${pointer.y}px)`;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      // Prevent default touch scrolling
      style={{ touchAction: 'none' }}
      className={`
        touchAction-responsive
        p-5 mx-auto
        md:px-20 md:flex md:flex-row flex-col items-center gap-10
        text-center md:text-left
        relative overflow-visible
        cursor-auto xl:cursor-none
        h-40
      `}
    >
      {/* Solid white background mask */}
      <div
        className="absolute inset-0 hidden xl:block z-5 bg-white"
        style={{ clipPath: maskClip, WebkitClipPath: maskClip }}
      />

      {/* Blurred background text */}
      <div className={`absolute inset-0 md:filter xl:blur-sm z-0 }`}>
        <div className="flex flex-col items-center md:items-start p-4 space-y-4">
          <h2 className={`text-3xl md:text-4xl font-bold text-${titleColor} underline underline-offset-13 decoration-dashed ${textCentered ? 'text-center' : ''}`}>
          {title}
          </h2>
          <p className={`text-${descColor} leading-relaxed ${textCentered ? 'text-center' : ''}`}>
            {description}
          </p>
        </div>
      </div>

      {/* Spotlight clear layer */}
      <div
        className={`absolute inset-0 hidden xl:block z-10 ${bgColor ? bgColor : ''}`}
        style={{ clipPath: clip, WebkitClipPath: clip }}
      >
        <div className="flex flex-col items-center md:items-start p-4 space-y-4">
          <h2 className={`text-3xl md:text-4xl font-bold text-${titleColor} underline underline-offset-13 decoration-dashed ${textCentered ? 'text-center' : ''}`}>
           {title}
          </h2>
          <p className={`text-${descColor} leading-relaxed  ${textCentered ? 'text-center' : ''}`}>
            {description}
          </p>
        </div>
      </div>

      {/* Magnifier lens */}
      <div
        className={`hidden xl:block absolute w-40 h-40 rounded-full border-2 ${magnifyColor ? magnifyColor : "border-white"} pointer-events-none ${isMouseInSection ? 'xl:block' : 'hidden'} z-20`}
        style={{ left: pointer.x - 80, top: pointer.y - 80 }}
      />
      {/* PALO */}
      <div
        className={`hidden xl:block absolute w-2 h-20 rounded-b-3xl ${stickColor ? stickColor : "bg-white"} pointer-events-none ${isMouseInSection ? 'xl:block' : 'hidden'} z-20`}
        style={{
          left: pointer.x - 60,
          top: pointer.y + 50,
          transform: 'rotate(45deg)',
          transformOrigin: 'top left'
        }}
      />
    </div>
  );
}
