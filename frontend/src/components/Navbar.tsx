"use client";

import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import { useCartStore } from "@/store/cartStore";
import { Sun, Moon, ShoppingCart, User, Menu } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
    const { theme, toggleTheme } = useTheme();
    const cartItems = useCartStore((state) => state.items);
    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-white/70 dark:bg-slate-950/70 backdrop-blur-md transition-colors duration-300">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-2">
                    <motion.div
                        whileHover={{ rotate: 15 }}
                        className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-xl"
                    >
                        S
                    </motion.div>
                    <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">
                        Swift<span className="text-orange-500">Bite</span>
                    </span>
                </Link>

                <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600 dark:text-slate-300">
                    <Link href="/restaurants" className="hover:text-orange-500 transition-colors">Restaurants</Link>
                    <Link href="/offers" className="hover:text-orange-500 transition-colors">Offers</Link>
                    <Link href="/help" className="hover:text-orange-500 transition-colors">Help</Link>
                </div>

                <div className="flex items-center space-x-4">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        aria-label="Toggle theme"
                    >
                        {theme === "light" ? (
                            <Moon className="w-5 h-5 text-slate-600" />
                        ) : (
                            <Sun className="w-5 h-5 text-slate-300" />
                        )}
                    </button>

                    <Link href="/cart" className="p-2 relative rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                        <ShoppingCart className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    <Link
                        href="/login"
                        className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-xl font-semibold transition-all shadow-lg shadow-orange-500/20 active:scale-95 flex items-center space-x-2"
                    >
                        <User className="w-4 h-4" />
                        <span>Sign In</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
