'use client';

import { motion } from 'framer-motion';
import { ShoppingBag, Truck, Utensils, Zap } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-900 via-slate-950 to-orange-900/20">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"></div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-black mb-6 tracking-tight"
          >
            Swift<span className="text-orange-500">Bite</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-300 mb-10 max-w-2xl mx-auto"
          >
            Real-time delivery orchestration for the modern era. Premium, fast, and reliable.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col md:flex-row gap-4 justify-center"
          >
            <Link
              href="/login"
              className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-2xl shadow-lg shadow-orange-500/20 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              Get Started <Zap size={20} />
            </Link>
            <button className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold rounded-2xl border border-white/20 transition-all hover:scale-105 active:scale-95">
              Explore Menu
            </button>
          </motion.div>
        </div>

        {/* Floating Decorative Elements */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 left-10 text-orange-400 hidden lg:block"
        >
          <Utensils size={100} strokeWidth={0.5} opacity={0.3} />
        </motion.div>
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-10 text-indigo-400 hidden lg:block"
        >
          <Truck size={120} strokeWidth={0.5} opacity={0.3} />
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-slate-950">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Zap className="text-orange-500" />}
              title="Real-Time Tracking"
              description="Monitor your order from the kitchen to your doorstep with live WebSocket updates."
            />
            <FeatureCard
              icon={<ShoppingBag className="text-indigo-500" />}
              title="Multiple Roles"
              description="Dedicated dashboards for Customers, Restaurants, and Drivers."
            />
            <FeatureCard
              icon={<Truck className="text-green-500" />}
              title="Fast Delivery"
              description="Optimized routing and driver assignment for the quickest experience."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 transition-colors group shadow-2xl"
    >
      <div className="mb-6 p-4 rounded-2xl bg-slate-800 w-fit group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-slate-400 leading-relaxed">{description}</p>
    </motion.div>
  );
}
