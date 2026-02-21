"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface SocketContextType {
    status: "connecting" | "connected" | "disconnected";
    subscribeToOrder: (orderId: string, onUpdate: (data: any) => void) => () => void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export function SocketProvider({ children }: { children: React.ReactNode }) {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [status, setStatus] = useState<"connecting" | "connected" | "disconnected">("disconnected");

    useEffect(() => {
        // Only connect if needed or on demand. 
        // Here we simulate a websocket connection for demo purposes since we don't have a live backend URL always accessible.
        // In production, this would be: new WebSocket("ws://localhost:8080/ws/orders")

        setStatus("connected");

        return () => {
            socket?.close();
        };
    }, []);

    const subscribeToOrder = (orderId: string, onUpdate: (data: any) => void) => {
        // Simulate incoming messages for order status changes
        console.log(`Subscribed to order: ${orderId}`);

        // For demo, let's simulate a status update sequence
        const statuses = ["CONFIRMED", "PREPARING", "OUT_FOR_DELIVERY", "DELIVERED"];
        let currentIndex = 0;

        const interval = setInterval(() => {
            if (currentIndex < statuses.length) {
                onUpdate({ status: statuses[currentIndex] });
                currentIndex++;
            } else {
                clearInterval(interval);
            }
        }, 5000);

        return () => {
            clearInterval(interval);
            console.log(`Unsubscribed from order: ${orderId}`);
        };
    };

    return (
        <SocketContext.Provider value={{ status, subscribeToOrder }}>
            {children}
        </SocketContext.Provider>
    );
}

export function useSocket() {
    const context = useContext(SocketContext);
    if (!context) throw new Error("useSocket must be used within SocketProvider");
    return context;
}
