"use client";

import { motion } from "framer-motion";
import { Plus, Minus, Info } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { useCartStore } from "@/store/cartStore";

interface FoodItemCardProps {
    item: {
        id: string;
        name: string;
        description: string;
        price: number;
        isVeg: boolean;
        image: string;
        category: string;
    };
}

export default function FoodItemCard({ item }: FoodItemCardProps) {
    const { addItem, updateQuantity, items } = useCartStore();
    const cartItem = items.find((i) => i.id === item.id);
    const quantity = cartItem?.quantity || 0;

    const handleAdd = () => {
        addItem({ id: item.id, name: item.name, price: item.price, quantity: 1 });
    };

    const handleUpdate = (newQty: number) => {
        updateQuantity(item.id, newQty);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card flex flex-col md:flex-row items-center p-4 gap-6 border-slate-100 dark:border-slate-800"
        >
            <div className="relative w-full md:w-40 h-40 shrink-0 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                <div className="absolute inset-0 bg-gradient-to-tr from-orange-100 to-orange-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center font-bold text-orange-500">
                    {item.name[0]}
                </div>
            </div>

            <div className="flex-1 w-full">
                <div className="flex items-center gap-2 mb-2">
                    <div className={`w-4 h-4 border-2 flex items-center justify-center rounded-sm ${item.isVeg ? 'border-green-600' : 'border-red-600'}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${item.isVeg ? 'bg-green-600' : 'bg-red-600'}`} />
                    </div>
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tighter">
                        {item.category}
                    </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{item.name}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                    {item.description}
                </p>

                <div className="flex items-center justify-between mt-auto">
                    <div className="text-xl font-black text-slate-900 dark:text-white">
                        ₹{item.price}
                    </div>

                    <div className="flex items-center gap-3">
                        {quantity > 0 ? (
                            <motion.div
                                initial={{ width: 0, opacity: 0 }}
                                animate={{ width: "auto", opacity: 1 }}
                                className="flex items-center bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900/50 rounded-xl p-1 shadow-inner"
                            >
                                <button
                                    onClick={() => handleUpdate(quantity - 1)}
                                    className="p-1 px-2 hover:bg-orange-100 dark:hover:bg-orange-900/50 rounded-lg text-orange-600 transition-colors"
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                <span className="w-8 text-center font-bold text-orange-600">{quantity}</span>
                                <button
                                    onClick={() => handleUpdate(quantity + 1)}
                                    className="p-1 px-2 hover:bg-orange-100 dark:hover:bg-orange-900/50 rounded-lg text-orange-600 transition-colors"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </motion.div>
                        ) : (
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={handleAdd}
                                className="btn-primary py-1.5 px-6"
                            >
                                Add
                            </motion.button>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
