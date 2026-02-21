"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { Mail, Lock, User, Phone, Utensils, Truck, UserCircle } from "lucide-react";

export default function Register() {
    const [role, setRole] = useState<"CUSTOMER" | "RESTAURANT" | "DRIVER">("CUSTOMER");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const fullName = formData.get("fullName") as string;
        const phone = formData.get("phone") as string;

        const { data, error: authError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                    role,
                    phone,
                }
            }
        });

        if (authError) {
            setError(authError.message);
            setLoading(false);
            return;
        }

        // Success - redirect based on role or show message
        window.location.href = "/login?registered=true";
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-lg glass-card p-8 border-slate-200 dark:border-slate-800"
            >
                <div className="text-center mb-8">
                    <Link href="/" className="font-bold text-3xl mb-4 inline-block">Swift<span className="text-orange-500">Bite</span></Link>
                    <h1 className="text-2xl font-black text-slate-900 dark:text-white">Create your account</h1>
                    <p className="text-slate-500 dark:text-slate-400">Join the orchestration platform</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl text-sm font-medium">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-3 gap-3 mb-6">
                        <button
                            type="button"
                            onClick={() => setRole("CUSTOMER")}
                            className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${role === "CUSTOMER" ? 'border-orange-500 bg-orange-50 dark:bg-orange-950/30 text-orange-600' : 'border-slate-100 dark:border-slate-800 text-slate-500'}`}
                        >
                            <UserCircle className="w-6 h-6" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Customer</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setRole("RESTAURANT")}
                            className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${role === "RESTAURANT" ? 'border-orange-500 bg-orange-50 dark:bg-orange-950/30 text-orange-600' : 'border-slate-100 dark:border-slate-800 text-slate-500'}`}
                        >
                            <Utensils className="w-6 h-6" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Restaurant</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setRole("DRIVER")}
                            className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${role === "DRIVER" ? 'border-orange-500 bg-orange-50 dark:bg-orange-950/30 text-orange-600' : 'border-slate-100 dark:border-slate-800 text-slate-500'}`}
                        >
                            <Truck className="w-6 h-6" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Driver</span>
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                name="fullName"
                                type="text"
                                placeholder="Full Name"
                                required
                                className="w-full pl-12 pr-4 py-4 bg-slate-100 dark:bg-slate-900 rounded-2xl border-none focus:ring-2 focus:ring-orange-500 text-slate-900 dark:text-white"
                            />
                        </div>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                name="email"
                                type="email"
                                placeholder="Email Address"
                                required
                                className="w-full pl-12 pr-4 py-4 bg-slate-100 dark:bg-slate-900 rounded-2xl border-none focus:ring-2 focus:ring-orange-500 text-slate-900 dark:text-white"
                            />
                        </div>
                        <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                name="phone"
                                type="tel"
                                placeholder="Phone Number"
                                required
                                className="w-full pl-12 pr-4 py-4 bg-slate-100 dark:bg-slate-900 rounded-2xl border-none focus:ring-2 focus:ring-orange-500 text-slate-900 dark:text-white"
                            />
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                name="password"
                                type="password"
                                placeholder="Password"
                                required
                                className="w-full pl-12 pr-4 py-4 bg-slate-100 dark:bg-slate-900 rounded-2xl border-none focus:ring-2 focus:ring-orange-500 text-slate-900 dark:text-white"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full btn-primary py-4 text-lg"
                    >
                        {loading ? "Creating Account..." : "Join SwiftBite"}
                    </button>
                </form>

                <div className="mt-8 text-center text-slate-500 dark:text-slate-400 text-sm">
                    Already have an account? <Link href="/login" className="text-orange-500 font-bold hover:underline">Sign In</Link>
                </div>
            </motion.div>
        </div>
    );
}
