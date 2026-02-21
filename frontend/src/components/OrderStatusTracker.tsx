'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Clock, Package, Truck, Utensils } from 'lucide-react';

const statuses = [
    { id: 'PENDING', label: 'Order Placed', icon: Clock },
    { id: 'CONFIRMED', label: 'Confirmed', icon: CheckCircle2 },
    { id: 'PREPARING', label: 'Preparing', icon: Utensils },
    { id: 'READY', label: 'Ready for Pickup', icon: Package },
    { id: 'PICKED_UP', label: 'Out for Delivery', icon: Truck },
    { id: 'DELIVERED', label: 'Delivered', icon: CheckCircle2 },
];

export default function OrderStatusTracker({ currentStatus }: { currentStatus: string }) {
    const currentIndex = statuses.findIndex(s => s.id === currentStatus);

    return (
        <div className="w-full max-w-4xl mx-auto p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl">
            <div className="relative flex justify-between">
                {/* Progress Bar Background */}
                <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-800 -translate-y-1/2"></div>

                {/* Animated Progress Bar */}
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(currentIndex / (statuses.length - 1)) * 100}%` }}
                    className="absolute top-1/2 left-0 h-1 bg-indigo-500 -translate-y-1/2 z-10"
                    transition={{ duration: 1, ease: "easeInOut" }}
                />

                {/* Status Points */}
                {statuses.map((status, index) => {
                    const Icon = status.icon;
                    const isActive = index <= currentIndex;
                    const isCurrent = index === currentIndex;

                    return (
                        <div key={status.id} className="relative z-20 flex flex-col items-center">
                            <motion.div
                                animate={{
                                    scale: isCurrent ? 1.2 : 1,
                                    backgroundColor: isActive ? '#6366f1' : '#1e293b'
                                }}
                                className={`w-12 h-12 rounded-full flex items-center justify-center border-4 ${isActive ? 'border-indigo-500/50' : 'border-slate-800'}`}
                            >
                                <Icon size={20} className={isActive ? 'text-white' : 'text-slate-500'} />
                            </motion.div>
                            <span className={`mt-4 text-xs font-bold uppercase tracking-wider ${isActive ? 'text-white' : 'text-slate-500'}`}>
                                {status.label}
                            </span>
                            {isCurrent && (
                                <motion.div
                                    layoutId="glow"
                                    className="absolute -inset-2 bg-indigo-500/20 blur-xl rounded-full"
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
