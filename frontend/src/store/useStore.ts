import { create } from 'zustand';

interface User {
    id: string;
    email: string;
    full_name: string;
    role: 'CUSTOMER' | 'RESTAURANT' | 'DRIVER' | 'ADMIN';
}

interface AuthState {
    user: User | null;
    setUser: (user: User | null) => void;
    isAuthenticated: boolean;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    setUser: (user) => set({ user, isAuthenticated: !!user }),
}));

interface OrderState {
    activeOrders: any[];
    setActiveOrders: (orders: any[]) => void;
}

export const useOrderStore = create<OrderState>((set) => ({
    activeOrders: [],
    setActiveOrders: (activeOrders) => set({ activeOrders }),
}));
