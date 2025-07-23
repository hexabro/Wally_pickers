"use client"
import { useRef, useState } from 'react';
import {
  TrendingUp,
  Globe,
  Truck,
  DollarSign,
  Search
} from 'lucide-react'

import MagnifyingSection from './magnifyingSection';
import AnimatedUnderline from '../ui/animatedUnderline';
const features = [
{
    title: 'Análisis de tendencias',
    Icon: TrendingUp,
},
{
    title: 'Red global de proveedores',
    Icon: Globe,
},
{
    title: 'Logística rápida y segura',
    Icon: Truck,
},
{
    title: 'Precios competitivos',
    Icon: DollarSign,
},
]

export default function FeaturesSection() {

    const containerRef = useRef<HTMLDivElement>(null);
    const [pointer, setPointer] = useState<{ x: number; y: number }>({ x: -1000, y: -1000 });
  
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
  
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) =>
      updatePointer(e.clientX, e.clientY);
  
    const handleMouseLeave = () =>
      setPointer({ x: -1000, y: -1000 });

  return (
    <section 
    ref = {containerRef}
    onMouseMove = {handleMouseMove}
    onMouseLeave ={handleMouseLeave}
    
    className="relative bg-gray-50 py-16 mb-0 pb-20 xl:cursor-none">
      <div className="max-w-4xl mx-auto px-4 text-center s">
        <h2 className="text-2xl md:text-3xl font-semibold text-[#0e344f] mb-20   ">
          Descubre lo que nos hace  <AnimatedUnderline>únicos</AnimatedUnderline>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-0 ">
          {features.map(({ title, Icon }) => (
            <div key={title} className="flex flex-col items-center space-y-4">
              <Icon className="w-12 h-12 text-[#0e344f]" />
              <MagnifyingSection  description = {title} titleColor='black' descColor='black' magnifyColor="[#0e344f]" textCentered={true}/>
            </div>
          ))}
        </div>
      </div>

      {/* Magnifier lens */}
      <div
        className={`absolute w-40 h-40  rounded-full border-2  border-black pointer-events-none hidden xl:block`}
        style={{ left: pointer.x - 80, top: pointer.y - 80 }}
      />
      {/* PALO */}
      <div
        className={`absolute w-2 h-20 bg-black pointer-events-none hidden xl:block`}
        style={{
          left: pointer.x - 60,
          top: pointer.y + 50,
          transform: 'rotate(45deg)',
          transformOrigin: 'top left'
        }}
      />
    </section>
  )
}
