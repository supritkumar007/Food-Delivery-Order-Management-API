"use client";

import { motion } from "framer-motion";
import { Star, Clock, MapPin } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Image from "next/image";

interface RestaurantCardProps {
    restaurant: {
        id: string;
        name: string;
        address: string;
        rating: number;
        deliveryTime: string;
        image: string;
        categories: string[];
    };
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
    return (
        <motion.div
            whileHover={{ y: -8 }}
            className="glass-card overflow-hidden group border border-slate-200 dark:border-slate-800/50"
        >
            <div className="relative h-48 w-full overflow-hidden">
                <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800 animate-pulse" />
                {/* Placeholder for real image */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-orange-600/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <span className="text-orange-500 font-bold">{restaurant.name}</span>
                </div>
                <div className="absolute top-4 right-4">
                    <Badge variant="warning" className="backdrop-blur-md bg-white/90 dark:bg-slate-900/90 shadow-lg">
                        Best Seller
                    </Badge>
                </div>
            </div>

            <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-xl text-slate-900 dark:text-white group-hover:text-orange-500 transition-colors">
                        {restaurant.name}
                    </h3>
                    <div className="flex items-center gap-1 bg-green-500 text-white px-2 py-0.5 rounded-lg text-sm font-bold">
                        <Star className="w-3 h-3 fill-current" />
                        {restaurant.rating}
                    </div>
                </div>

                <p className="text-slate-500 dark:text-slate-400 text-sm flex items-center gap-1 mb-4">
                    <MapPin className="w-3 h-3" />
                    {restaurant.address}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 text-xs font-semibold">
                        <Clock className="w-4 h-4 text-orange-500" />
                        {restaurant.deliveryTime}
                    </div>
                    <div className="text-xs text-orange-600 dark:text-orange-400 font-bold">
                        {restaurant.categories.join(", ")}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
