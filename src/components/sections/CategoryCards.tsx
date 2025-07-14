"use client";
import React from 'react';
import ProfileCard from "../ui/profileCard";

const categories = [
  {
    name: "Alimentación",
    handle: "Othon",
    avatarUrl: "/images/categorias/alimentacion.jpg",
    profileLink: "https://www.linkedin.com/in/othon-ansatu%C3%B1a-gomes-86297624b/"
  },
  {
    name: "Limpieza",
    handle: "Jhonatan",
    avatarUrl: "/images/categorias/limpieza.jpg",
    profileLink: "https://www.linkedin.com/in/othon-ansatu%C3%B1a-gomes-86297624b/"
  },
  {
    name: "Cosmética",
    handle: "Pablo",
    avatarUrl: "/images/categorias/cosmetica.jpg",
    profileLink: "https://www.linkedin.com/in/pablo-lopez-hernandez-/"
  },
  
];

export default function CategoryCards() {
  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">

      <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-2 py-4 -mx-2  md:grid md:grid-cols-3 md:gap-6 md:-mx-0">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="snap-start flex-shrink-0 w-64 md:flex-shrink md:w-auto"
          >
            <ProfileCard
              name={cat.name}
              title=""
              handle={cat.handle}
              status="Online"
              contactText="Descúbrelos todos"
              avatarUrl={cat.avatarUrl}
              showBehindGradient={false}
              showUserInfo={true}
              enableTilt={true}
              onContactClick={() => window.open(cat.profileLink, "_blank")}
              innerGradient="linear-gradient(to bottom, #0e344f, #0b2533, #081821)"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
