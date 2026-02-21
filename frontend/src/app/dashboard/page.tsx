'use client';

import { useEffect, useState } from 'react';
import OrderStatusTracker from '@/components/OrderStatusTracker';
import { motion } from 'framer-motion';

const MOCK_ORDER = {
    id: 'order-123',
    restaurant: 'Spice Route',
    items: ['Butter Chicken x1', 'Garlic Naan x2'],
    total: '$24.50'
};

export default function DashboardPage() {
    const [status, setStatus] = useState('PENDING');

    // Simulation of order lifecycle
    useEffect(() => {
        const sequence = ['PENDING', 'CONFIRMED', 'PREPARING', 'READY', 'PICKED_UP', 'DELIVERED'];
        let i = 0;
        const interval = setInterval(() => {
            if (i < sequence.length - 1) {
                i++;
                setStatus(sequence[i]);
            } else {
                clearInterval(interval);
            }
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-slate-950 p-8">
            <div className="container mx-auto">
                <header className="mb-12">
                    <h1 className="text-4xl font-bold mb-2">Track Your Order</h1>
                    <p className="text-slate-400">Order #{MOCK_ORDER.id}</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <OrderStatusTracker currentStatus={status} />

                        <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
                            <h2 className="text-2xl font-bold mb-6">Order Details</h2>
                            <div className="space-y-4">
                                {MOCK_ORDER.items.map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-center py-2 border-b border-slate-800 last:border-0">
                                        <span className="text-slate-300">{item}</span>
                                        <span className="font-mono text-indigo-400">$12.25</span>
                                    </div>
                                ))}
                                <div className="pt-4 flex justify-between items-center text-xl font-bold">
                                    <span>Total</span>
                                    <span className="text-orange-500">{MOCK_ORDER.total}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-900/50 to-slate-900 border border-indigo-500/20 shadow-xl">
                            <h2 className="text-xl font-bold mb-4">Estimated Delivery</h2>
                            <p className="text-4xl font-black text-white mb-2">25-35 min</p>
                            <p className="text-slate-400 text-sm">Arriving at 10:45 PM</p>
                        </div>

                        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center">
                                    <span className="text-indigo-400 font-bold">JD</span>
                                </div>
                                <div>
                                    <p className="font-bold">John Doe</p>
                                    <p className="text-sm text-slate-500">Your Delivery Partner</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
