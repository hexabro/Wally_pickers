"use client"

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import {CategoryColumn} from  "@/components/sections/categories"
import { FlipCard } from "@/components/sections/categories";
interface AnimatedColumnsProps {
    CategoryColumns: CategoryColumn[];
}


const AnimatedColumns: React.FC<AnimatedColumnsProps> = ({ CategoryColumns }) => {
    return (
        <div className = "space-y-1.5">
            {CategoryColumns.map((col) => {
                const [open, setOpen] = useState(false);

                return (
                    <div
                        key={col.label}
                        className="bg-gradient-to-r from-gray-700 to-blue-700 rounded-lg shadow-md p-4"
                    >
                        <button
                            onClick={() => setOpen(!open)}
                            className="w-full flex items-center justify-center text-lg font-bold text-white cursor-pointer"
                        >
                            {col.label}
                            <ChevronRight
                                className={`ml-2 transition-transform mt-0.5 ${open ? "rotate-90" : ""}`}
                            />
                        </button>

                        <AnimatePresence initial={false}>
                            {open && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="overflow-hidden mt-4"
                                >
                                    <div className="space-y-4">
                                        {col.items.map((item) => (
                                            <FlipCard key={item.href} {...item} />
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                );
            })}
        </div>
    );
}

export default AnimatedColumns;