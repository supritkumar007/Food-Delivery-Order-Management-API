"use client";

import { useCartStore } from "@/store/cartStore";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { MapPin, CreditCard, ChevronRight, ShieldCheck, Truck } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Checkout() {
    const { items } = useCartStore();
    const [loading, setLoading] = useState(false);
    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handlePlaceOrder = () => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            window.location.href = "/orders/tracking/123";
        }, 2000);
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen">
                <Navbar />
                <div className="flex flex-col items-center justify-center py-20">
                    <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
                    <Link href="/" className="btn-primary">Go back to home</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <Navbar />

            <div className="container mx-auto px-4 py-12">
                <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-12">Checkout</h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-1 space-y-6">
                        {/* Delivery Address */}
                        <section className="glass-card p-6 border-slate-100 dark:border-slate-800">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-orange-100 dark:bg-orange-950 rounded-xl flex items-center justify-center text-orange-500">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">Delivery Address</h2>
                                </div>
                                <button className="text-orange-500 font-bold text-sm">Change</button>
                            </div>
                            <div className="p-4 bg-slate-100 dark:bg-slate-900/50 rounded-xl border-2 border-orange-500/50">
                                <p className="font-bold text-slate-900 dark:text-white mb-1">Home</p>
                                <p className="text-sm text-slate-500">Metro Hights, Apartment 402, Building B, Sector 4, Metro City, 110022</p>
                            </div>
                        </section>

                        {/* Payment Method */}
                        <section className="glass-card p-6 border-slate-100 dark:border-slate-800">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-950 rounded-xl flex items-center justify-center text-blue-500">
                                    <CreditCard className="w-6 h-6" />
                                </div>
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Payment Method</h2>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-slate-100 dark:bg-slate-900/50 rounded-xl">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-8 bg-slate-800 rounded flex items-center justify-center text-[8px] font-bold text-white uppercase italic">Card</div>
                                    <span className="text-slate-900 dark:text-white font-bold">●●●● 8245</span>
                                </div>
                                <div className="w-5 h-5 rounded-full border-4 border-orange-500" />
                            </div>
                        </section>
                    </div>

                    <aside className="w-full lg:w-96 shrink-0">
                        <div className="glass-card p-8 sticky top-24 border-orange-500/30">
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-8 text-center uppercase tracking-tighter italic underline decoration-orange-500 decoration-4">Order Summary</h3>

                            <div className="space-y-4 mb-8">
                                {items.map(item => (
                                    <div key={item.id} className="flex justify-between items-center group">
                                        <div>
                                            <p className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-orange-500 transition-colors">{item.name}</p>
                                            <p className="text-[10px] text-slate-500 italic uppercase">Qty: {item.quantity}</p>
                                        </div>
                                        <span className="font-bold text-slate-900 dark:text-white">₹{item.price * item.quantity}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-3 border-t border-slate-100 dark:border-slate-800 pt-6 mb-8 text-sm">
                                <div className="flex justify-between text-slate-500">
                                    <span>Subtotal</span>
                                    <span className="font-bold">₹{total}</span>
                                </div>
                                <div className="flex justify-between text-slate-500">
                                    <span>Taxes & Charges</span>
                                    <span className="font-bold">₹42</span>
                                </div>
                                <div className="flex justify-between text-slate-500">
                                    <span>Delivery Fee</span>
                                    <span className="text-green-500 font-black uppercase">FREE</span>
                                </div>
                                <div className="flex justify-between text-2xl font-black text-slate-900 dark:text-white pt-2 border-t border-dotted border-slate-200 dark:border-slate-800">
                                    <span>Grand Total</span>
                                    <span>₹{total + 42}</span>
                                </div>
                            </div>

                            <div className="bg-orange-50 dark:bg-orange-950/20 p-4 rounded-xl mb-8 flex items-center gap-3 text-orange-600 dark:text-orange-400">
                                <ShieldCheck className="w-5 h-5 shrink-0" />
                                <p className="text-[10px] leading-tight font-medium uppercase tracking-widest">Secure encrypted checkout. Your data is protected.</p>
                            </div>

                            <button
                                onClick={handlePlaceOrder}
                                disabled={loading}
                                className="w-full btn-primary py-5 text-xl flex items-center justify-center gap-3 group"
                            >
                                {loading ? "Orchestrating..." : (
                                    <>
                                        Place Order <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
