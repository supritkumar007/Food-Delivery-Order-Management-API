"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { Mail, Lock, ArrowRight } from "lucide-react";

export default function Login() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        const { data, error: authError } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (authError) {
            setError(authError.message);
            setLoading(false);
            return;
        }

        if (!data.user) {
            setError("Login failed. Please try again.");
            setLoading(false);
            return;
        }

        // Role-based redirect - try multiple times to ensure data is loaded
        let attempts = 0;
        const maxAttempts = 3;
        let userData = null;

        while (attempts < maxAttempts && !userData) {
            const { data: userDataResult, error: userError } = await supabase
                .from("users")
                .select("role")
                .eq("id", data.user.id)
                .single();

            if (userDataResult) {
                userData = userDataResult;
                break;
            }

            if (userError) {
                console.error("Error fetching user role:", userError);
            }

            attempts++;
            if (attempts < maxAttempts) {
                await new Promise(resolve => setTimeout(resolve, 500)); // Wait 500ms before retry
            }
        }

        const role = userData?.role || "CUSTOMER";

        console.log("User role:", role); // Debug log

        switch (role) {
            case "RESTAURANT": 
                window.location.href = "/restaurant/dashboard"; 
                break;
            case "DRIVER": 
                window.location.href = "/driver/dashboard"; 
                break;
            case "ADMIN": 
                window.location.href = "/admin/dashboard"; 
                break;
            default: 
                window.location.href = "/customer/dashboard";
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md glass-card p-8 border-slate-200 dark:border-slate-800"
            >
                <div className="text-center mb-8">
                    <Link href="/" className="font-bold text-3xl mb-4 inline-block">Swift<span className="text-orange-500">Bite</span></Link>
                    <h1 className="text-2xl font-black text-slate-900 dark:text-white">Welcome back</h1>
                    <p className="text-slate-500 dark:text-slate-400">Sign in to continue your journey</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl text-sm font-medium">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
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
                        className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-2"
                    >
                        {loading ? "Signing In..." : "Sign In"}
                        {!loading && <ArrowRight className="w-5 h-5" />}
                    </button>
                </form>

                <div className="mt-8 text-center text-slate-500 dark:text-slate-400 text-sm">
                    Don&apos;t have an account? <Link href="/register" className="text-orange-500 font-bold hover:underline">Sign Up</Link>
                </div>
            </motion.div>
        </div>
    );
}
