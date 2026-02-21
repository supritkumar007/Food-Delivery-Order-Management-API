"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { Utensils, ClipboardList, Settings, Plus, Edit, Trash2, CheckCircle, Clock } from "lucide-react";
import Badge from "@/components/ui/Badge";

export default function RestaurantDashboard() {
    const [activeTab, setActiveTab] = useState<"orders" | "menu" | "settings">("orders");

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
                                    onClick={() => setActiveTab("orders")}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === "orders" ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'}`}
                                >
                                    <ClipboardList className="w-5 h-5" />
                                    <span>Incoming Orders</span>
                                </button>
                                <button
                                    onClick={() => setActiveTab("menu")}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === "menu" ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'}`}
                                >
                                    <Utensils className="w-5 h-5" />
                                    <span>Manage Menu</span>
                                </button>
                                <button
                                    onClick={() => setActiveTab("settings")}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === "settings" ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'}`}
                                >
                                    <Settings className="w-5 h-5" />
                                    <span>Settings</span>
                                </button>
                            </nav>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 min-w-0">
                        <AnimatePresence mode="wait">
                            {activeTab === "orders" && (
                                <motion.div
                                    key="orders"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                >
                                    <div className="flex justify-between items-center mb-8">
                                        <div>
                                            <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Active Orders</h1>
                                            <p className="text-slate-500 dark:text-slate-400">Manage real-time incoming requests</p>
                                        </div>
                                        <Badge variant="warning" className="px-4 py-2">5 Orders Pending</Badge>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="glass-card p-6 border-l-4 border-l-orange-500">
                                            <div className="flex justify-between items-start mb-6">
                                                <div>
                                                    <p className="text-xs font-black text-orange-500 uppercase tracking-widest mb-1">Order #SB-1024</p>
                                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Customer: Rahul Sharma</h3>
                                                    <p className="text-sm text-slate-500">Metro Hights, Sector 4</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-xl font-black text-slate-900 dark:text-white">₹1,240</p>
                                                    <Badge variant="info">Preparing</Badge>
                                                </div>
                                            </div>

                                            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 mb-6">
                                                <ul className="space-y-2 text-sm">
                                                    <li className="flex justify-between"><span className="text-slate-600 dark:text-slate-400">2x Pepperoni Passion Pizza</span> <span>₹998</span></li>
                                                    <li className="flex justify-between"><span className="text-slate-600 dark:text-slate-400">1x Garlic Bread</span> <span>₹242</span></li>
                                                </ul>
                                            </div>

                                            <div className="flex gap-4">
                                                <button className="flex-1 btn-primary py-3 flex items-center justify-center gap-2">
                                                    <CheckCircle className="w-5 h-5" />
                                                    Mark as Ready
                                                </button>
                                                <button className="px-6 py-3 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-white rounded-xl font-bold hover:bg-slate-300 dark:hover:bg-slate-700 transition-all">
                                                    Details
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === "menu" && (
                                <motion.div
                                    key="menu"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                >
                                    <div className="flex justify-between items-center mb-8">
                                        <div>
                                            <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Menu Management</h1>
                                            <p className="text-slate-500 dark:text-slate-400">Add or edit your delicious offerings</p>
                                        </div>
                                        <button className="btn-primary flex items-center gap-2">
                                            <Plus className="w-5 h-5" />
                                            Add New Item
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="glass-card p-4 border-slate-100 dark:border-slate-800 flex gap-4">
                                            <div className="w-24 h-24 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center text-orange-500 font-bold shrink-0">🍕</div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-bold text-slate-900 dark:text-white truncate">Margherita Pizza</h4>
                                                <p className="text-xs text-slate-500 mb-2">Classic tomato and mozzarella</p>
                                                <p className="font-black text-orange-500 mb-2">₹399</p>
                                                <div className="flex gap-2">
                                                    <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500"><Edit className="w-4 h-4" /></button>
                                                    <button className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg text-red-500"><Trash2 className="w-4 h-4" /></button>
                                                </div>
                                            </div>
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
