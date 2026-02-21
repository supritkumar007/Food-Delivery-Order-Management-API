"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const categories = [
    { id: "all", name: "All", icon: "🍽️" },
    { id: "pizza", name: "Pizza", icon: "🍕" },
    { id: "biryani", name: "Biryani", icon: "🍛" },
    { id: "burger", name: "Burgers", icon: "🍔" },
    { id: "dessert", name: "Desserts", icon: "🍰" },
    { id: "chinese", name: "Chinese", icon: "🥢" },
    { id: "drinks", name: "Drinks", icon: "🥤" },
];

interface CategoryFilterProps {
    selected: string;
    onSelect: (id: string) => void;
}

export default function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
    return (
        <div className="flex items-center gap-4 overflow-x-auto pb-4 no-scrollbar">
            {categories.map((cat) => (
                <motion.button
                    key={cat.id}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onSelect(cat.id)}
                    className={cn(
                        "flex items-center gap-2 px-6 py-3 rounded-2xl whitespace-nowrap transition-all duration-300 font-bold border",
                        selected === cat.id
                            ? "bg-orange-500 text-white border-orange-500 shadow-lg shadow-orange-500/30"
                            : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-orange-500"
                    )}
                >
                    <span className="text-xl">{cat.icon}</span>
                    <span>{cat.name}</span>
                </motion.button>
            ))}
        </div>
    );
}
