"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { Truck, Map, List, History, Navigation, CheckCircle, Package, ArrowRight } from "lucide-react";
import Badge from "@/components/ui/Badge";

export default function DriverDashboard() {
    const [activeTab, setActiveTab] = useState<"available" | "active" | "history">("available");

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <Navbar />

            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <aside className="w-full lg:w-64 shrink-0">
                        <div className="glass-card p-4 sticky top-24">
                            <nav className="flex flex-col space-y-2">
                                <button
                                    onClick={() => setActiveTab("available")}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === "available" ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'}`}
                                >
                                    <List className="w-5 h-5" />
                                    <span>Available Orders</span>
                                </button>
                                <button
                                    onClick={() => setActiveTab("active")}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === "active" ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'}`}
                                >
                                    <Navigation className="w-5 h-5" />
                                    <span>Active Delivery</span>
                                </button>
                                <button
                                    onClick={() => setActiveTab("history")}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === "history" ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'}`}
                                >
                                    <History className="w-5 h-5" />
                                    <span>Work History</span>
                                </button>
                            </nav>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 min-w-0">
                        <AnimatePresence mode="wait">
                            {activeTab === "available" && (
                                <motion.div
                                    key="available"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                >
                                    <div className="flex justify-between items-center mb-8">
                                        <div>
                                            <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Available for Pickup</h1>
                                            <p className="text-slate-500 dark:text-slate-400">New delivery opportunities near you</p>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="glass-card p-6 relative overflow-hidden">
                                            <div className="absolute top-0 right-0 bg-orange-500 text-white text-[10px] font-black px-4 py-1 uppercase tracking-widest rounded-bl-xl shadow-lg">
                                                High Priority
                                            </div>

                                            <div className="flex gap-6 mb-6">
                                                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-900 rounded-2xl flex items-center justify-center text-2xl shadow-inner italic font-black text-orange-500">SB</div>
                                                <div>
                                                    <h3 className="text-xl font-black text-slate-900 dark:text-white">Pizza Palace</h3>
                                                    <p className="text-sm text-slate-500 flex items-center gap-1"><Map className="w-3 h-3" /> Pickup: 2.4 km away</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-4 mb-8">
                                                <div className="flex-1 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Estimated Earnings</p>
                                                    <p className="text-2xl font-black text-green-500">₹85.00</p>
                                                </div>
                                                <div className="flex items-center text-slate-300 dark:text-slate-700">
                                                    <ArrowRight className="w-8 h-8" />
                                                </div>
                                                <div className="flex-1 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 text-right">
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Customer Distance</p>
                                                    <p className="text-2xl font-black text-slate-900 dark:text-white">4.2 km</p>
                                                </div>
                                            </div>

                                            <button className="w-full btn-primary py-4 flex items-center justify-center gap-2 text-lg shadow-orange-500/30">
                                                <Truck className="w-6 h-6" />
                                                Accept Delivery Order
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === "active" && (
                                <motion.div
                                    key="active"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                >
                                    <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-8">Current Task</h1>
                                    <div className="glass-card p-6 border-orange-500">
                                        <div className="flex items-center gap-4 mb-8">
                                            <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-green-500/20">
                                                <Package className="w-6 h-6" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-bold text-slate-900 dark:text-white">Heading to Restaurant</h3>
                                                <p className="text-sm text-slate-500">Pickup and verify items</p>
                                            </div>
                                            <Badge variant="info">In Progress</Badge>
                                        </div>

                                        {/* Map Simulation Placeholder */}
                                        <div className="w-full h-48 bg-slate-200 dark:bg-slate-800 rounded-2xl mb-8 flex items-center justify-center relative overflow-hidden">
                                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#f97316_0%,_transparent_50%)] opacity-10 animate-pulse" />
                                            <span className="font-bold text-slate-400">Interactive Map View</span>
                                        </div>

                                        <div className="space-y-3">
                                            <button className="w-full py-4 bg-green-500 hover:bg-green-600 text-white font-black rounded-2xl shadow-lg shadow-green-500/20 transition-all flex items-center justify-center gap-2">
                                                <CheckCircle className="w-6 h-6" />
                                                Order Picked Up
                                            </button>
                                            <button className="w-full py-4 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-white font-bold rounded-2xl transition-all">
                                                Navigate to Delivery
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </main>
                </div>
            </div>
        </div>
    );
}
