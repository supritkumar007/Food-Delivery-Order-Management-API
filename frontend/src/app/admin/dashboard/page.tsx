"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { Users, LayoutDashboard, Utensils, TrendingUp, DollarSign, Activity, MoreHorizontal, ShieldAlert } from "lucide-react";
import Badge from "@/components/ui/Badge";

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState<"overview" | "users" | "restaurants">("overview");

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
                                    onClick={() => setActiveTab("overview")}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === "overview" ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'}`}
                                >
                                    <LayoutDashboard className="w-5 h-5" />
                                    <span>Overview</span>
                                </button>
                                <button
                                    onClick={() => setActiveTab("users")}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === "users" ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'}`}
                                >
                                    <Users className="w-5 h-5" />
                                    <span>Users</span>
                                </button>
                                <button
                                    onClick={() => setActiveTab("restaurants")}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === "restaurants" ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'}`}
                                >
                                    <Utensils className="w-5 h-5" />
                                    <span>Restaurants</span>
                                </button>
                            </nav>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 min-w-0">
                        <AnimatePresence mode="wait">
                            {activeTab === "overview" && (
                                <motion.div
                                    key="overview"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                >
                                    <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-8">System Overview</h1>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                                        <div className="glass-card p-6 border-l-4 border-l-green-500">
                                            <div className="flex items-center justify-between mb-4">
                                                <DollarSign className="w-8 h-8 text-green-500" />
                                                <TrendingUp className="w-4 h-4 text-green-500" />
                                            </div>
                                            <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">Total Revenue</p>
                                            <h2 className="text-3xl font-black text-slate-900 dark:text-white">₹4,25,000</h2>
                                        </div>
                                        <div className="glass-card p-6 border-l-4 border-l-orange-500">
                                            <div className="flex items-center justify-between mb-4">
                                                <Activity className="w-8 h-8 text-orange-500" />
                                                <Badge variant="warning">+12%</Badge>
                                            </div>
                                            <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">Active Orders</p>
                                            <h2 className="text-3xl font-black text-slate-900 dark:text-white">142</h2>
                                        </div>
                                        <div className="glass-card p-6 border-l-4 border-l-blue-500">
                                            <div className="flex items-center justify-between mb-4">
                                                <Users className="w-8 h-8 text-blue-500" />
                                            </div>
                                            <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">New Users</p>
                                            <h2 className="text-3xl font-black text-slate-900 dark:text-white">852</h2>
                                        </div>
                                    </div>

                                    <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6">Recent Activities</h2>
                                    <div className="glass-card overflow-hidden border-slate-100 dark:border-slate-800">
                                        <table className="w-full text-left">
                                            <thead>
                                                <tr className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 uppercase text-[10px] font-black tracking-[0.2em]">
                                                    <th className="px-6 py-4">Event</th>
                                                    <th className="px-6 py-4">Status</th>
                                                    <th className="px-6 py-4">Time</th>
                                                    <th className="px-6 py-4">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                                <tr className="text-sm">
                                                    <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">New Restaurant Signup: Burger Hub</td>
                                                    <td className="px-6 py-4"><Badge variant="info">Pending Review</Badge></td>
                                                    <td className="px-6 py-4 text-slate-500">10 mins ago</td>
                                                    <td className="px-6 py-4"><button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"><MoreHorizontal className="w-4 h-4" /></button></td>
                                                </tr>
                                                <tr className="text-sm">
                                                    <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">Security Alert: Multiple Failed Logins</td>
                                                    <td className="px-6 py-4"><Badge variant="danger">Critical</Badge></td>
                                                    <td className="px-6 py-4 text-slate-500">42 mins ago</td>
                                                    <td className="px-6 py-4"><button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"><ShieldAlert className="w-4 h-4 text-red-500" /></button></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === "users" && (
                                <motion.div
                                    key="users"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                >
                                    <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-8">User Directory</h1>
                                    {/* User List Implementation */}
                                    <div className="glass-card p-12 text-center text-slate-500">
                                        User management grid coming soon...
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
