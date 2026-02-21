"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/home/Hero";
import CategoryFilter from "@/components/home/CategoryFilter";
import RestaurantCard from "@/components/home/RestaurantCard";
import FoodItemCard from "@/components/home/FoodItemCard";
import { motion } from "framer-motion";

const MOCK_RESTAURANTS = [
  {
    id: "1",
    name: "Pizza Palace",
    address: "Downtown, Metro City",
    rating: 4.5,
    deliveryTime: "25-30 mins",
    image: "",
    categories: ["Pizza", "Italian"]
  },
  {
    id: "2",
    name: "Royal Biryani",
    address: "Old Town, Metro City",
    rating: 4.8,
    deliveryTime: "30-40 mins",
    image: "",
    categories: ["Biryani", "North Indian"]
  },
  {
    id: "3",
    name: "Burger King",
    address: "Mall Road, Metro City",
    rating: 4.2,
    deliveryTime: "15-20 mins",
    image: "",
    categories: ["Burgers", "Fast Food"]
  }
];

const MOCK_FOOD = [
  {
    id: "101",
    name: "Pepperoni Passion",
    description: "Classic pepperoni with extra cheese and our signature sauce.",
    price: 499,
    isVeg: false,
    image: "",
    category: "Pizza"
  },
  {
    id: "102",
    name: "Paneer Tikka Pizza",
    description: "Spiced paneer, capsicum, onion and tomatoes.",
    price: 449,
    isVeg: true,
    image: "",
    category: "Pizza"
  },
  {
    id: "103",
    name: "Chocolate Lava Cake",
    description: "Goey chocolate centerpiece, perfectly baked.",
    price: 129,
    isVeg: true,
    image: "",
    category: "Dessert"
  }
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <main className="min-h-screen pb-20">
      <Navbar />
      <Hero />

      <div className="container mx-auto px-4 py-16">
        <section className="mb-24">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
            <div>
              <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-2">
                Popular <span className="text-orange-500 underline decoration-orange-500/30 underline-offset-8">Restaurants</span>
              </h2>
              <p className="text-slate-500 dark:text-slate-400">Handpicked favorites for your cravings</p>
            </div>
            <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {MOCK_RESTAURANTS.map((res) => (
              <RestaurantCard key={res.id} restaurant={res} />
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-2">
                Global <span className="text-orange-500 underline decoration-orange-500/30 underline-offset-8">Catalog</span>
              </h2>
              <p className="text-slate-500 dark:text-slate-400">Discover flavors from everywhere</p>
            </div>
            <button className="hidden md:flex items-center gap-2 text-orange-600 font-bold hover:gap-3 transition-all">
              View all items <span className="text-xl">→</span>
            </button>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {MOCK_FOOD.map((food) => (
              <FoodItemCard key={food.id} item={food} />
            ))}
          </div>
        </section>
      </div>

      <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="font-bold text-3xl mb-6">Swift<span className="text-orange-500">Bite</span></div>
              <p className="text-slate-500 dark:text-slate-400 max-w-sm mb-6">
                Redefining food delivery with real-time orchestration and premium experience.
                Your favorite meals, delivered with speed and care.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <nav className="flex flex-col space-y-2 text-slate-500 dark:text-slate-400">
                <a href="#" className="hover:text-orange-500 transition-colors">About Us</a>
                <a href="#" className="hover:text-orange-500 transition-colors">Contact</a>
                <a href="#" className="hover:text-orange-500 transition-colors">Careers</a>
              </nav>
            </div>
            <div>
              <h4 className="font-bold mb-4">Help</h4>
              <nav className="flex flex-col space-y-2 text-slate-500 dark:text-slate-400">
                <a href="#" className="hover:text-orange-500 transition-colors">FAQ</a>
                <a href="#" className="hover:text-orange-500 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-orange-500 transition-colors">Terms of Service</a>
              </nav>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-slate-500 text-sm">
            © 2026 SwiftBite Technologies. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
