"use client";

import { useCartStore } from "@/store/cartStore";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, Tag } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function CartPage() {
    const { items, updateQuantity, removeItem, clearCart } = useCartStore();
    const [promoCode, setPromoCode] = useState("");
    const [discount, setDiscount] = useState(0);

    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const deliveryFee = subtotal > 500 ? 0 : 40;
    const taxes = Math.round(subtotal * 0.05);
    const total = subtotal + deliveryFee + taxes - discount;

    const applyPromo = () => {
        if (promoCode.toUpperCase() === "SWIFT50") {
            setDiscount(50);
        } else if (promoCode.toUpperCase() === "FIRST100") {
            setDiscount(100);
        }
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
                <Navbar />
                <div className="flex flex-col items-center justify-center py-20">
                    <ShoppingCart className="w-24 h-24 text-slate-300 dark:text-slate-700 mb-6" />
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">Your cart is empty</h2>
                    <p className="text-slate-500 dark:text-slate-400 mb-8">Add some delicious items to get started!</p>
                    <Link href="/" className="btn-primary px-8 py-3">Browse Menu</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <Navbar />

            <div className="container mx-auto px-4 py-12">
                <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-12">Shopping Cart</h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Cart Items */}
                    <div className="flex-1 space-y-4">
                        {items.map((item) => (
                            <motion.div
                                key={item.id}
                                layout
                                className="glass-card p-6 flex items-center gap-6"
                            >
                                <div className="w-24 h-24 bg-orange-100 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center text-orange-500 font-bold text-2xl shrink-0">
                                    {item.name[0]}
                                </div>

                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{item.name}</h3>
                                    <p className="text-xl font-black text-orange-500">₹{item.price}</p>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="flex items-center bg-slate-100 dark:bg-slate-900 rounded-xl p-1">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors"
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="w-12 text-center font-bold">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="p-3 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-xl text-red-500 transition-colors"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}

                        <button
                            onClick={clearCart}
                            className="text-red-500 font-bold hover:underline"
                        >
                            Clear Cart
                        </button>
                    </div>

                    {/* Order Summary */}
                    <aside className="w-full lg:w-96 shrink-0">
                        <div className="glass-card p-8 sticky top-24">
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-8">Order Summary</h3>

                            {/* Promo Code */}
                            <div className="mb-8">
                                <label className="text-sm font-bold text-slate-600 dark:text-slate-400 mb-2 block">Have a promo code?</label>
                                <div className="flex gap-2">
                                    <div className="flex-1 relative">
                                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <input
                                            type="text"
                                            value={promoCode}
                                            onChange={(e) => setPromoCode(e.target.value)}
                                            placeholder="Enter code"
                                            className="w-full pl-10 pr-4 py-3 bg-slate-100 dark:bg-slate-900 rounded-xl border-none focus:ring-2 focus:ring-orange-500 text-slate-900 dark:text-white"
                                        />
                                    </div>
                                    <button
                                        onClick={applyPromo}
                                        className="px-6 py-3 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-white rounded-xl font-bold hover:bg-slate-300 dark:hover:bg-slate-700 transition-all"
                                    >
                                        Apply
                                    </button>
                                </div>
                                {discount > 0 && (
                                    <p className="text-green-500 text-sm font-bold mt-2">✓ Promo applied! ₹{discount} off</p>
                                )}
                            </div>

                            <div className="space-y-3 mb-8 text-sm">
                                <div className="flex justify-between text-slate-500">
                                    <span>Subtotal ({items.length} items)</span>
                                    <span className="font-bold">₹{subtotal}</span>
                                </div>
                                <div className="flex justify-between text-slate-500">
                                    <span>Delivery Fee</span>
                                    <span className={`font-bold ${deliveryFee === 0 ? 'text-green-500' : ''}`}>
                                        {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                                    </span>
                                </div>
                                <div className="flex justify-between text-slate-500">
                                    <span>Taxes & Charges</span>
                                    <span className="font-bold">₹{taxes}</span>
                                </div>
                                {discount > 0 && (
                                    <div className="flex justify-between text-green-500">
                                        <span>Discount</span>
                                        <span className="font-bold">-₹{discount}</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-2xl font-black text-slate-900 dark:text-white pt-4 border-t border-slate-200 dark:border-slate-800">
                                    <span>Total</span>
                                    <span>₹{total}</span>
                                </div>
                            </div>

                            {subtotal < 500 && (
                                <div className="mb-6 p-4 bg-orange-50 dark:bg-orange-950/20 rounded-xl text-orange-600 dark:text-orange-400 text-sm">
                                    Add ₹{500 - subtotal} more for free delivery!
                                </div>
                            )}

                            <Link
                                href="/checkout"
                                className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-2 group"
                            >
                                Proceed to Checkout
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
