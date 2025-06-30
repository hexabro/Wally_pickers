"use client";
import {useEffect, useRef, useState } from "react";
import {ChevronDown, } from "lucide-react";
import Image from "next/image";



type Lang = "ES" | "EN" | "FR" | "DE";

const languages: Lang[] = ["ES", "EN", "FR", "DE"];


const flagSrc: Record<Lang, string> = {
    ES: "/images/flags/es.svg",
    EN: "/images/flags/en.svg", 
    FR: "/images/flags/fr.svg",
    DE: "/images/flags/de.svg",
};

export default function LanguageSelector() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLang, setSelectedLang] = useState<Lang>("ES");
    const dropDownRef = useRef<HTMLDivElement>(null);

    useEffect(() =>{
        const handleClickOutside = (event:MouseEvent) =>{
            if(dropDownRef.current && !dropDownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    const handleSelect = (lang: Lang) => {
        setSelectedLang(lang);
        setIsOpen(false);
        //i18n.changeLanguage(lang.toLowerCase())
    };
    return (
        <div ref = {dropDownRef} className="relative inline-block text-left">
            {/* BOTÓN PRINCIPAL */}
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="flex items-center gap-2 rounded-md bg-green-600 px-4 py-2 text-white font-medium hover:bg-green-500 transition"
            >
            <Image
                src= {flagSrc[selectedLang]}
                alt = {`Bandera ${selectedLang}`}
                width={20}
                height={20}
                className = "rounded-sm"
            />
            
            {selectedLang}
            <ChevronDown size={18} className="shrink-0" />
            </button>

            {/* LISTA DESPLEGABLE */}
            {isOpen && (
            <div className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                <ul className="py-1 text-sm text-gray-700">
                {languages.map((lang) => (
                    <li key={lang}>
                        
                        <button
                            onClick={() => handleSelect(lang)}
                            className="flex w-full px-4 py-2 text-left hover:bg-gray-100"
                        >
                            <Image
                                src = {`/images/flags/${lang.toLowerCase()}.svg`}
                                alt = {`Bandera ${lang}`}
                                width= {40}
                                height= {40}
                                className = "px-2 rounded-sm"
                            />
                            {lang}
                        </button>
                    </li>
                ))}
                </ul>
            </div>
            )}
        </div>
);

}



