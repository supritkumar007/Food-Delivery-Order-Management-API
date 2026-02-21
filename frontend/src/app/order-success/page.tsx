"use client";

import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, Home, Package } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { useCartStore } from "@/store/cartStore";

export default function OrderSuccess() {
    const { clearCart } = useCartStore();

    useEffect(() => {
        clearCart();
    }, [clearCart]);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-lg glass-card p-12 text-center"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.2 }}
                    className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center text-white mx-auto mb-8 shadow-2xl shadow-green-500/20"
                >
                    <CheckCircle className="w-12 h-12" />
                </motion.div>

                <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-4">Payment Successful!</h1>
                <p className="text-slate-500 dark:text-slate-400 mb-12">
                    Your order has been placed and is being orchestrated by our chefs.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Link
                        href="/orders/tracking/1024"
                        className="btn-primary py-4 flex items-center justify-center gap-2"
                    >
                        <Package className="w-5 h-5" />
                        Track Order
                    </Link>
                    <Link
                        href="/"
                        className="bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-300 dark:hover:bg-slate-700 transition-all"
                    >
                        <Home className="w-5 h-5" />
                        Back Home
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
