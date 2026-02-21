"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/home/Hero";
import CategoryFilter from "@/components/home/CategoryFilter";
import RestaurantCard from "@/components/home/RestaurantCard";
import FoodItemCard from "@/components/home/FoodItemCard";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showVegOnly, setShowVegOnly] = useState(false);
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [foodItems, setFoodItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch restaurants
      const { data: restaurantsData } = await supabase
        .from("restaurants")
        .select("*")
        .eq("is_active", true);

      // Fetch menu items with restaurant info
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

  // Filter restaurants by category
  const filteredRestaurants = restaurants.filter(restaurant => {
    if (selectedCategory === "all") return true;
    // Match restaurant name or check if they have items in this category
    return restaurant.name.toLowerCase().includes(selectedCategory.toLowerCase());
  });

  // Filter food items by category, search, and veg preference
  const filteredFood = foodItems.filter(food => {
    const matchesCategory = selectedCategory === "all" || 
      (food.category && food.category.toLowerCase() === selectedCategory.toLowerCase());
    const matchesSearch = food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (food.description && food.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesVeg = !showVegOnly || food.is_veg;
    
    return matchesCategory && matchesSearch && matchesVeg;
  });

  return (
    <main className="min-h-screen pb-20">
      <Navbar />
      <Hero onSearch={setSearchQuery} />

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
            {loading ? (
              <div className="col-span-full text-center py-12 text-slate-500">
                Loading restaurants...
              </div>
            ) : filteredRestaurants.length > 0 ? (
              filteredRestaurants.map((res) => (
                <RestaurantCard key={res.id} restaurant={{
                  id: res.id,
                  name: res.name,
                  address: res.address,
                  rating: res.rating,
                  deliveryTime: "25-35 mins",
                  image: "",
                  categories: []
                }} />
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-slate-500">
                No restaurants found for this category
              </div>
            )}
          </div>
        </section>

        <section>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
            <div>
              <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-2">
                Global <span className="text-orange-500 underline decoration-orange-500/30 underline-offset-8">Catalog</span>
              </h2>
              <p className="text-slate-500 dark:text-slate-400">Discover flavors from everywhere</p>
            </div>
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

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {loading ? (
              <div className="col-span-full text-center py-12 text-slate-500">
                Loading menu items...
              </div>
            ) : filteredFood.length > 0 ? (
              filteredFood.map((food) => (
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
                No items found matching your criteria
              </div>
            )}
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
