"use client";

import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/useStore";
import { Sun, Moon, ShoppingCart, User, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Navbar() {
    const { theme, toggleTheme } = useTheme();
    const cartItems = useCartStore((state) => state.items);
    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const { user, setUser } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        // Check current session
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session?.user) {
                supabase
                    .from("users")
                    .select("*")
                    .eq("id", session.user.id)
                    .single()
                    .then(({ data }) => {
                        if (data) setUser(data);
                    });
            }
        });

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user) {
                supabase
                    .from("users")
                    .select("*")
                    .eq("id", session.user.id)
                    .single()
                    .then(({ data }) => {
                        if (data) setUser(data);
                    });
            } else {
                setUser(null);
            }
        });

        return () => subscription.unsubscribe();
    }, [setUser]);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        setUser(null);
        router.push("/");
    };

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
                    <Link href="/" className="hover:text-orange-500 transition-colors">Home</Link>
                    {user && <Link href={`/${user.role.toLowerCase()}/dashboard`} className="hover:text-orange-500 transition-colors">Dashboard</Link>}
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

                    {user?.role === "CUSTOMER" && (
                        <Link href="/checkout" className="p-2 relative rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                            <ShoppingCart className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                    )}

                    {user ? (
                        <button
                            onClick={handleSignOut}
                            className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-xl font-semibold transition-all shadow-lg shadow-orange-500/20 active:scale-95 flex items-center space-x-2"
                        >
                            <LogOut className="w-4 h-4" />
                            <span>Sign Out</span>
                        </button>
                    ) : (
                        <Link
                            href="/login"
                            className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-xl font-semibold transition-all shadow-lg shadow-orange-500/20 active:scale-95 flex items-center space-x-2"
                        >
                            <User className="w-4 h-4" />
                            <span>Sign In</span>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}
