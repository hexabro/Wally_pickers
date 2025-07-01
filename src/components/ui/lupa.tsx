'use client'
import { useEffect, useState } from 'react'

export default function MagnifyingGlass() {
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const top = Math.random() * (vh - 120);
      const left = Math.random() * (vw - 120);
      setPosition({ top, left });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="absolute w-24 h-24 rounded-full border-4 border-black bg-white/10 backdrop-blur-sm transition-all duration-1000 pointer-events-none z-50"
      style={{ top: position.top, left: position.left }}
    >
      <div className="absolute bottom-[-20px] left-3 -translate-x-1/2 w-2 h-10 bg-black rounded-full rotate-45 origin-top" />
    </div>
  );
}
