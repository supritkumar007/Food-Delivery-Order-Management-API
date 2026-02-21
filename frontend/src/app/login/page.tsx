'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/store/useStore';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { setUser } = useAuthStore();
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            alert(error.message);
        } else if (data.user) {
            // In a real app, you'd fetch the user profile from the 'users' table here
            setUser({
                id: data.user.id,
                email: data.user.email!,
                full_name: data.user.user_metadata.full_name || 'User',
                role: data.user.user_metadata.role || 'CUSTOMER',
            });
            router.push('/dashboard');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 px-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl"
            >
                <h2 className="text-3xl font-bold mb-8 text-center">Welcome Back</h2>
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 focus:border-indigo-500 outline-none transition-all"
                            placeholder="name@example.com"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 focus:border-indigo-500 outline-none transition-all"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg transition-all active:scale-[0.98] disabled:opacity-50"
                    >
                        {loading ? 'Authenticating...' : 'Sign In'}
                    </button>
                </form>
            </motion.div>
        </div>
    );
}
