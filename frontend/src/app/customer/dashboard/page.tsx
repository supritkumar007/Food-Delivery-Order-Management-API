"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, MapPin, Package, Clock, Star, ChevronRight } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import FoodItemCard from "@/components/home/FoodItemCard";
import RestaurantCard from "@/components/home/RestaurantCard";
import Link from "next/link";

const MOCK_RESTAURANTS = [
    {
        id: "1",
        name: "Pizza Palace",
        address: "Downtown, Metro City",
        rating: 4.5,
        deliveryTime: "25-30 mins",
        image: "",
        categories: ["Pizza", "Italian"]
    },
    {
        id: "2",
        name: "Royal Biryani",
        address: "Old Town, Metro City",
        rating: 4.8,
        deliveryTime: "30-40 mins",
        image: "",
        categories: ["Biryani", "North Indian"]
    }
];

export default function CustomerDashboard() {
    const { items, clearCart } = useCartStore();
    const [activeTab, setActiveTab] = useState<"browse" | "orders" | "addresses">("browse");
    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

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
                                    onClick={() => setActiveTab("browse")}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === "browse" ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'}`}
                                >
                                    <ShoppingCart className="w-5 h-5" />
                                    <span>Browse</span>
                                </button>
                                <button
                                    onClick={() => setActiveTab("orders")}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === "orders" ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'}`}
                                >
                                    <Package className="w-5 h-5" />
                                    <span>Your Orders</span>
                                </button>
                                <button
                                    onClick={() => setActiveTab("addresses")}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === "addresses" ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'}`}
                                >
                                    <MapPin className="w-5 h-5" />
                                    <span>Addresses</span>
                                </button>
                            </nav>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 min-w-0">
                        <AnimatePresence mode="wait">
                            {activeTab === "browse" && (
                                <motion.div
                                    key="browse"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                >
                                    <div className="mb-8">
                                        <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Welcome back!</h1>
                                        <p className="text-slate-500 dark:text-slate-400">Ready for your next meal?</p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                                        {MOCK_RESTAURANTS.map(r => (
                                            <RestaurantCard key={r.id} restaurant={r} />
                                        ))}
                                    </div>

                                    <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6">Popular Items</h2>
                                    <div className="grid grid-cols-1 gap-4">
                                        {/* Reuse FoodItemCard */}
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === "orders" && (
                                <motion.div
                                    key="orders"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                >
                                    <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-8">Order History</h1>
                                    <div className="space-y-4">
                                        <div className="glass-card p-6 border-slate-100 dark:border-slate-800">
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center text-orange-500 font-bold">#O1</div>
                                                    <div>
                                                        <p className="font-bold text-slate-900 dark:text-white">Pizza Palace</p>
                                                        <p className="text-xs text-slate-500 italic">2 hours ago</p>
                                                    </div>
                                                </div>
                                                <span className="px-3 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full text-xs font-bold uppercase tracking-wider">
                                                    Delivered
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-slate-500 dark:text-slate-400">2 Items • ₹948 total</span>
                                                <Link href="/orders/tracking/123" className="text-orange-500 font-bold hover:underline">Track Order →</Link>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </main>

                    {/* Cart Summary Panel */}
                    {items.length > 0 && (
                        <aside className="w-full lg:w-80 shrink-0">
                            <div className="glass-card p-6 sticky top-24 border-orange-500/20 shadow-2xl shadow-orange-500/5">
                                <div className="flex items-center gap-2 mb-6">
                                    <ShoppingCart className="w-6 h-6 text-orange-500" />
                                    <h3 className="font-black text-xl text-slate-900 dark:text-white">Your Cart</h3>
                                </div>

                                <div className="space-y-4 mb-8 max-h-[40vh] overflow-y-auto no-scrollbar">
                                    {items.map(item => (
                                        <div key={item.id} className="flex justify-between items-center">
                                            <div>
                                                <p className="font-bold text-slate-900 dark:text-white text-sm">{item.name}</p>
                                                <p className="text-xs text-slate-500 italic">{item.quantity} x ₹{item.price}</p>
                                            </div>
                                            <span className="font-bold text-slate-900 dark:text-white">₹{item.price * item.quantity}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t border-slate-100 dark:border-slate-800 pt-4 mb-6">
                                    <div className="flex justify-between mb-2">
                                        <span className="text-slate-500 dark:text-slate-400 text-sm">Subtotal</span>
                                        <span className="font-bold text-slate-900 dark:text-white">₹{total}</span>
                                    </div>
                                    <div className="flex justify-between mb-4">
                                        <span className="text-slate-500 dark:text-slate-400 text-sm">Delivery Fee</span>
                                        <span className="text-green-500 font-bold text-sm uppercase">Free</span>
                                    </div>
                                    <div className="flex justify-between text-xl font-black text-slate-900 dark:text-white">
                                        <span>Total</span>
                                        <span>₹{total}</span>
                                    </div>
                                </div>

                                <Link
                                    href="/checkout"
                                    className="w-full btn-primary py-4 block text-center"
                                >
                                    Checkout Now
                                </Link>
                            </div>
                        </aside>
                    )}
                </div>
            </div>
        </div>
    );
}
