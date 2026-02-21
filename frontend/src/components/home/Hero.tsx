"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Search, MapPin } from "lucide-react";
import Image from "next/image";

export default function Hero() {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);

    return (
        <section className="relative min-h-[85vh] flex items-center overflow-hidden pt-20">
            {/* Background Shapes */}
            <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-orange-50/50 dark:bg-orange-500/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/4" />

            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                    {/* Left Content */}
                    <div className="flex-1 text-center lg:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-wider text-orange-600 uppercase bg-orange-100 rounded-full dark:bg-orange-900/30 dark:text-orange-400">
                                🚀 Faster than your hunger
                            </span>
                            <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight text-slate-900 dark:text-white mb-6">
                                Deliciousness <br />
                                <span className="text-orange-500 italic">Delivered</span> to Your Door
                            </h1>
                            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-xl mx-auto lg:mx-0">
                                SwiftBite orchestrates your cravings with real-time precision. Browse the best restaurants
                                near you and get your food in record time.
                            </p>

                            {/* Search Bar */}
                            <div className="max-w-2xl bg-white dark:bg-slate-900 p-2 rounded-2xl shadow-2xl flex flex-col md:flex-row items-center gap-2 border border-slate-200 dark:border-slate-800">
                                <div className="flex-1 flex items-center px-4 gap-2 w-full">
                                    <MapPin className="text-orange-500 w-5 h-5 shrink-0" />
                                    <input
                                        type="text"
                                        placeholder="Enter your delivery address"
                                        className="w-full py-3 bg-transparent border-none focus:outline-none text-slate-900 dark:text-white"
                                    />
                                </div>
                                <button className="w-full md:w-auto btn-primary flex items-center justify-center gap-2">
                                    <Search className="w-5 h-5" />
                                    Find Food
                                </button>
                            </div>

                            <div className="mt-8 flex items-center justify-center lg:justify-start space-x-8 text-sm text-slate-500 dark:text-slate-400 font-medium">
                                <div className="flex items-center space-x-2">
                                    <span className="text-orange-500 text-lg">15+</span>
                                    <span>Restaurants</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-orange-500 text-lg">1k+</span>
                                    <span>Daily Orders</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-orange-500 text-lg">4.9/5</span>
                                    <span>User Rating</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Parallax Image */}
                    <div className="flex-1 relative w-full max-w-lg">
                        <motion.div
                            style={{ y: y1 }}
                            className="relative z-10"
                        >
                            <div className="relative w-full aspect-square bg-orange-100 dark:bg-orange-900/20 rounded-full p-8 border-8 border-white dark:border-slate-800 shadow-2xl">
                                <div className="w-full h-full relative overflow-hidden rounded-full">
                                    {/* Placeholder for hero image */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-orange-400 to-orange-600 flex items-center justify-center">
                                        <h2 className="text-white text-4xl font-black rotate-[-15deg]">YUMMY!</h2>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Floating Elements */}
                        <motion.div
                            style={{ y: y2 }}
                            className="absolute -top-10 -right-10 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700 animate-float"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">⭐</div>
                                <div>
                                    <p className="text-xs text-slate-500">Perfect Delivery</p>
                                    <p className="font-bold text-slate-900 dark:text-white">5-Star Quality</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            style={{ y: y1 }}
                            transition={{ delay: 0.2 }}
                            className="absolute -bottom-10 -left-10 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700 animate-float"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">🕒</div>
                                <div>
                                    <p className="text-xs text-slate-500">Fast Arrival</p>
                                    <p className="font-bold text-slate-900 dark:text-white">20-30 Mins</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
