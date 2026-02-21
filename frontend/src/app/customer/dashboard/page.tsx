"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, MapPin, Package, Clock, Star, ChevronRight, Plus, User as UserIcon, Trash2 } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/useStore";
import FoodItemCard from "@/components/home/FoodItemCard";
import RestaurantCard from "@/components/home/RestaurantCard";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function CustomerDashboard() {
    const { items, clearCart } = useCartStore();
    const { user } = useAuthStore();
    const [activeTab, setActiveTab] = useState<"browse" | "orders" | "addresses" | "profile">("browse");
    const [addresses, setAddresses] = useState<any[]>([]);
    const [orders, setOrders] = useState<any[]>([]);
    const [restaurants, setRestaurants] = useState<any[]>([]);
    const [foodItems, setFoodItems] = useState<any[]>([]);
    const [showVegOnly, setShowVegOnly] = useState(false);
    const [loading, setLoading] = useState(true);
    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    useEffect(() => {
        if (user) {
            fetchUserData();
        }
        fetchBrowseData();
    }, [user]);

    const fetchUserData = async () => {
        if (!user) return;

        // Fetch addresses
        const { data: addressData } = await supabase
            .from("addresses")
            .select("*")
            .eq("user_id", user.id);
        if (addressData) setAddresses(addressData);

        // Fetch orders
        const { data: orderData } = await supabase
            .from("orders")
            .select(`
                *,
                restaurant:restaurants(name)
            `)
            .eq("customer_id", user.id)
            .order("created_at", { ascending: false });
        if (orderData) setOrders(orderData);
    };

    const fetchBrowseData = async () => {
        try {
            // Fetch restaurants
            const { data: restaurantsData } = await supabase
                .from("restaurants")
                .select("*")
                .eq("is_active", true);

            // Fetch menu items
            const { data: menuItemsData } = await supabase
                .from("menu_items")
                .select(`
                    *,
                    menu:menus(
                        restaurant:restaurants(id, name)
                    )
                `)
                .eq("is_available", true);

            setRestaurants(restaurantsData || []);
            setFoodItems(menuItemsData || []);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredFood = foodItems.filter(food => {
        const matchesVeg = !showVegOnly || food.is_veg;
        return matchesVeg;
    });

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
                                <button
                                    onClick={() => setActiveTab("profile")}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === "profile" ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'}`}
                                >
                                    <UserIcon className="w-5 h-5" />
                                    <span>Profile</span>
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
                                        
                                        <div className="mt-6 flex items-center gap-4">
                                            <button
                                                onClick={() => setShowVegOnly(!showVegOnly)}
                                                className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all border-2 ${
                                                    showVegOnly
                                                        ? 'bg-green-500 text-white border-green-500 shadow-lg shadow-green-500/30'
                                                        : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-green-500'
                                                }`}
                                            >
                                                <div className={`w-4 h-4 border-2 flex items-center justify-center rounded-sm ${showVegOnly ? 'border-white' : 'border-green-600'}`}>
                                                    <div className={`w-1.5 h-1.5 rounded-full ${showVegOnly ? 'bg-white' : 'bg-green-600'}`} />
                                                </div>
                                                <span>Veg Only</span>
                                            </button>
                                        </div>
                                    </div>

                                    <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6">Restaurants Near You</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                                        {loading ? (
                                            <div className="col-span-full text-center py-12 text-slate-500">Loading restaurants...</div>
                                        ) : restaurants.length > 0 ? (
                                            restaurants.map(r => (
                                                <RestaurantCard key={r.id} restaurant={{
                                                    id: r.id,
                                                    name: r.name,
                                                    address: r.address,
                                                    rating: r.rating,
                                                    deliveryTime: "25-35 mins",
                                                    image: "",
                                                    categories: []
                                                }} />
                                            ))
                                        ) : (
                                            <div className="col-span-full text-center py-12 text-slate-500">No restaurants available</div>
                                        )}
                                    </div>

                                    <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6">Popular Items</h2>
                                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                                        {loading ? (
                                            <div className="col-span-full text-center py-12 text-slate-500">Loading items...</div>
                                        ) : filteredFood.length > 0 ? (
                                            filteredFood.map(food => (
                                                <FoodItemCard key={food.id} item={{
                                                    id: food.id,
                                                    name: food.name,
                                                    description: food.description || "",
                                                    price: parseFloat(food.price),
                                                    isVeg: food.is_veg,
                                                    image: food.image_url || "",
                                                    category: food.category || ""
                                                }} />
                                            ))
                                        ) : (
                                            <div className="col-span-full text-center py-12 text-slate-500">
                                                {showVegOnly ? "No vegetarian items available" : "No items available"}
                                            </div>
                                        )}
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
                                        {orders.length > 0 ? (
                                            orders.map((order) => (
                                                <div key={order.id} className="glass-card p-6 border-slate-100 dark:border-slate-800">
                                                    <div className="flex items-center justify-between mb-4">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center text-orange-500 font-bold">
                                                                #{order.id.slice(0, 4)}
                                                            </div>
                                                            <div>
                                                                <p className="font-bold text-slate-900 dark:text-white">{order.restaurant?.name || "Restaurant"}</p>
                                                                <p className="text-xs text-slate-500 italic">{new Date(order.created_at).toLocaleDateString()}</p>
                                                            </div>
                                                        </div>
                                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                                                            order.status === "DELIVERED" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                                                            order.status === "CANCELLED" ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" :
                                                            "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
                                                        }`}>
                                                            {order.status}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center justify-between text-sm">
                                                        <span className="text-slate-500 dark:text-slate-400">₹{order.total_amount} total</span>
                                                        <Link href={`/orders/tracking/${order.id}`} className="text-orange-500 font-bold hover:underline">View Details →</Link>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="glass-card p-12 text-center text-slate-500">
                                                <Package className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                                                <p>No orders yet. Start browsing to place your first order!</p>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === "addresses" && (
                                <motion.div
                                    key="addresses"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                >
                                    <div className="flex justify-between items-center mb-8">
                                        <h1 className="text-3xl font-black text-slate-900 dark:text-white">Saved Addresses</h1>
                                        <button className="btn-primary flex items-center gap-2">
                                            <Plus className="w-5 h-5" />
                                            Add New
                                        </button>
                                    </div>
                                    <div className="space-y-4">
                                        {addresses.length > 0 ? (
                                            addresses.map((address) => (
                                                <div key={address.id} className="glass-card p-6 border-slate-100 dark:border-slate-800">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <h3 className="font-bold text-slate-900 dark:text-white mb-2">{address.label || "Address"}</h3>
                                                            <p className="text-slate-500 dark:text-slate-400">{address.address_line}</p>
                                                        </div>
                                                        <button className="text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 p-2 rounded-lg">
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="glass-card p-12 text-center text-slate-500">
                                                <MapPin className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                                                <p>No saved addresses. Add one to make checkout faster!</p>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === "profile" && (
                                <motion.div
                                    key="profile"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                >
                                    <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-8">My Profile</h1>
                                    <div className="glass-card p-8">
                                        <div className="flex items-center gap-6 mb-8">
                                            <div className="w-24 h-24 bg-orange-500 rounded-full flex items-center justify-center text-white text-3xl font-black">
                                                {user?.full_name?.[0] || "U"}
                                            </div>
                                            <div>
                                                <h2 className="text-2xl font-black text-slate-900 dark:text-white">{user?.full_name || "User"}</h2>
                                                <p className="text-slate-500 dark:text-slate-400">{user?.email}</p>
                                                <p className="text-sm text-orange-500 font-bold mt-1">{user?.role}</p>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div>
                                                <label className="text-sm font-bold text-slate-600 dark:text-slate-400 mb-2 block">Full Name</label>
                                                <input
                                                    type="text"
                                                    value={user?.full_name || ""}
                                                    readOnly
                                                    className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-900 rounded-xl border-none text-slate-900 dark:text-white"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-sm font-bold text-slate-600 dark:text-slate-400 mb-2 block">Email</label>
                                                <input
                                                    type="email"
                                                    value={user?.email || ""}
                                                    readOnly
                                                    className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-900 rounded-xl border-none text-slate-900 dark:text-white"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-sm font-bold text-slate-600 dark:text-slate-400 mb-2 block">Phone</label>
                                                <input
                                                    type="tel"
                                                    value={user?.phone || ""}
                                                    readOnly
                                                    className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-900 rounded-xl border-none text-slate-900 dark:text-white"
                                                />
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
