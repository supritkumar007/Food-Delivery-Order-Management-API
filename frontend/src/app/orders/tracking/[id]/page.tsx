"use client";

import { useSocket } from "@/context/SocketContext";
import Navbar from "@/components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CheckCircle2, Clock, MapPin, Truck, Utensils, Star, Phone } from "lucide-react";
import Badge from "@/components/ui/Badge";

const TRACKING_STEPS = [
    { id: "PENDING", label: "Order Placed", icon: CheckCircle2, description: "Your order has been received" },
    { id: "CONFIRMED", label: "Confirmed", icon: Clock, description: "Restaurant has accepted your order" },
    { id: "PREPARING", label: "Preparing", icon: Utensils, description: "Chef is working on your meal" },
    { id: "OUT_FOR_DELIVERY", label: "Out for Delivery", icon: Truck, description: "Driver is on the way to you" },
    { id: "DELIVERED", label: "Delivered", icon: CheckCircle2, description: "Enjoy your delicious meal!" },
];

export default function OrderTracking() {
    const { id } = useParams();
    const { subscribeToOrder } = useSocket();
    const [currentStatus, setCurrentStatus] = useState("PENDING");

    useEffect(() => {
        const unsubscribe = subscribeToOrder(id as string, (data) => {
            setCurrentStatus(data.status);
        });
        return () => unsubscribe();
    }, [id, subscribeToOrder]);

    const currentStepIndex = TRACKING_STEPS.findIndex(s => s.id === currentStatus);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <Navbar />

            <div className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                        <div>
                            <p className="text-orange-500 font-black uppercase tracking-widest text-xs mb-1">Order #SB-{id}</p>
                            <h1 className="text-4xl font-black text-slate-900 dark:text-white">Live Tracking</h1>
                        </div>
                        <Badge variant="success" className="px-6 py-2 text-sm shadow-xl shadow-green-500/10 animate-pulse">
                            Order {currentStatus.replace(/_/g, ' ')}
                        </Badge>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Tracking Timeline */}
                        <div className="lg:col-span-2 space-y-8">
                            <div className="glass-card p-8">
                                <div className="relative">
                                    {/* Vertical Line */}
                                    <div className="absolute left-[21px] top-2 bottom-2 w-0.5 bg-slate-200 dark:bg-slate-800" />
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: `${(currentStepIndex / (TRACKING_STEPS.length - 1)) * 100}%` }}
                                        className="absolute left-[21px] top-2 w-0.5 bg-orange-500 z-10"
                                    />

                                    <div className="space-y-12">
                                        {TRACKING_STEPS.map((step, index) => {
                                            const isActive = index <= currentStepIndex;
                                            const isCurrent = index === currentStepIndex;
                                            const Icon = step.icon;

                                            return (
                                                <div key={step.id} className="relative flex items-start gap-8">
                                                    <div className={`relative z-20 w-11 h-11 rounded-full flex items-center justify-center border-4 transition-all duration-500 ${isActive ? 'bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/30' : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-400'}`}>
                                                        <Icon className={`w-5 h-5 ${isCurrent ? 'animate-bounce' : ''}`} />
                                                    </div>
                                                    <div className={`flex-1 pt-1 ${isActive ? 'opacity-100' : 'opacity-40'}`}>
                                                        <h4 className={`font-black text-lg ${isActive ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>{step.label}</h4>
                                                        <p className="text-sm text-slate-500 dark:text-slate-400">{step.description}</p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* Delivery Map Simulation */}
                            <div className="glass-card p-4 h-64 relative overflow-hidden group">
                                <div className="absolute inset-0 bg-slate-200 dark:bg-slate-900 animate-pulse" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center">
                                        <MapPin className="w-12 h-12 text-orange-500 mx-auto mb-4 animate-bounce" />
                                        <p className="font-bold text-slate-400 uppercase tracking-widest text-xs">Arriving in 15 mins</p>
                                    </div>
                                </div>
                                <div className="absolute bottom-4 left-4 right-4 p-4 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md rounded-xl border border-white/20 dark:border-white/10 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-orange-100 dark:bg-orange-950 rounded-full flex items-center justify-center font-bold text-orange-500">JD</div>
                                        <div>
                                            <p className="font-bold text-sm text-slate-900 dark:text-white">John Doe</p>
                                            <div className="flex items-center gap-1 text-[10px] text-slate-500">
                                                <Star className="w-3 h-3 fill-orange-500 text-orange-500" />
                                                <span className="font-bold">4.9</span>
                                                <span>•</span>
                                                <span>SwiftBite Partner</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="p-3 bg-orange-500 text-white rounded-xl shadow-lg shadow-orange-500/20 active:scale-95">
                                        <Phone className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Order Details Mini Segment */}
                        <aside className="space-y-6">
                            <div className="glass-card p-6 border-slate-100 dark:border-slate-800">
                                <h3 className="font-black text-xl text-slate-900 dark:text-white mb-6 uppercase tracking-tighter italic">Items</h3>
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
                                        <span>2x Pepperoni Passion</span>
                                        <span className="font-bold">₹998</span>
                                    </div>
                                    <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
                                        <span>1x Chocolate Lava Cake</span>
                                        <span className="font-bold">₹129</span>
                                    </div>
                                </div>
                                <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xl font-black text-slate-900 dark:text-white">
                                    <span>Total Paid</span>
                                    <span className="text-orange-500">₹1,127</span>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-8 rounded-2xl text-white shadow-2xl shadow-orange-500/20">
                                <h3 className="text-2xl font-black mb-4">Rate your experience</h3>
                                <p className="text-orange-100 text-sm mb-6">How was the food and the delivery service?</p>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map(s => (
                                        <button key={s} className="w-10 h-10 rounded-xl bg-white/20 hover:bg-white/40 flex items-center justify-center transition-all">
                                            <Star className="w-6 h-6 fill-white" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </div>
    );
}
